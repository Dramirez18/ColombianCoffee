import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Clerk } from '@clerk/clerk-js';
import { Language, Tab } from './types';

/**
 * Customer accounts: Clerk sign-in with a one-time email code + our own API.
 *
 * Clerk is heavy, so it is loaded from Clerk's own CDN and only when needed:
 * the visitor already has a session (Clerk's `__client_uat` cookie), opens
 * My account / Admin, or presses "Sign in". Anonymous visitors never load it.
 * Every decision about what a user may see is taken by the server (/api/*).
 */

declare global {
  interface Window {
    Clerk?: Clerk;
  }
}

export interface Customer {
  name: string;
  company: string;
  country: string;
  phone: string;
  consentVersion: string;
  consentAt: string;
  policyCurrent: boolean;
}

type Status = 'loading' | 'disabled' | 'signedOut' | 'signedIn';

interface AuthState {
  status: Status;
  email: string | null;
  isAdmin: boolean;
  customer: Customer | null;
}

interface AuthApi extends AuthState {
  openSignIn: () => void;
  signOut: () => Promise<void>;
  authFetch: (input: string, init?: RequestInit) => Promise<Response>;
  refresh: () => Promise<void>;
}

const SIGNED_OUT: AuthState = { status: 'signedOut', email: null, isAdmin: false, customer: null };

const AuthContext = createContext<AuthApi>({
  ...SIGNED_OUT,
  status: 'loading',
  openSignIn: () => {},
  signOut: async () => {},
  authFetch: (input, init) => fetch(input, init),
  refresh: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

/** Clerk's Frontend API host is encoded in the publishable key: pk_(test|live)_<base64("host$")>. */
function frontendApi(publishableKey: string): string | null {
  try {
    const host = atob(publishableKey.split('_')[2] ?? '').replace(/\$$/, '');
    return /^[a-z0-9.-]+$/i.test(host) ? host : null;
  } catch {
    return null;
  }
}

/** Clerk sets `__client_uat` (or `__client_uat_<suffix>`) to a non-zero timestamp while a session exists. */
function hasSessionHint(): boolean {
  return document.cookie.split(';').some((c) => {
    const [name, value] = c.trim().split('=');
    return /^__client_uat(_.+)?$/.test(name) && value && value !== '0';
  });
}

let scriptPromise: Promise<Clerk> | null = null;
function loadClerkScript(publishableKey: string): Promise<Clerk> {
  if (window.Clerk) return Promise.resolve(window.Clerk);
  const host = frontendApi(publishableKey);
  if (!host) return Promise.reject(new Error('invalid_publishable_key'));
  scriptPromise ??= new Promise<Clerk>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://${host}/npm/@clerk/clerk-js@6/dist/clerk.browser.js`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.clerkPublishableKey = publishableKey;
    script.onload = () => (window.Clerk ? resolve(window.Clerk) : reject(new Error('clerk_missing')));
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('clerk_script'));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export function AuthProvider({ lang, activeTab, children }: { lang: Language; activeTab: Tab; children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ ...SIGNED_OUT, status: 'loading' });
  const keyRef = useRef<string | null>(null);
  const clerkRef = useRef<Clerk | null>(null);
  const loading = useRef<Promise<Clerk | null> | null>(null);

  const authFetch = useCallback(async (input: string, init: RequestInit = {}) => {
    const token = await clerkRef.current?.session?.getToken();
    const headers = new Headers(init.headers);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    return fetch(input, { ...init, headers });
  }, []);

  const loadMe = useCallback(async () => {
    try {
      const res = await authFetch('/api/me');
      if (res.status === 401) return setState(SIGNED_OUT);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setState({ status: 'signedIn', email: data.email, isAdmin: Boolean(data.isAdmin), customer: data.customer });
    } catch {
      setState({ status: 'signedIn', email: clerkRef.current?.user?.primaryEmailAddress?.emailAddress ?? null, isAdmin: false, customer: null });
    }
  }, [authFetch]);

  /** Loads and initialises Clerk once; resolves with the instance (or null if it fails). */
  const ensureClerk = useCallback((): Promise<Clerk | null> => {
    if (clerkRef.current) return Promise.resolve(clerkRef.current);
    if (!keyRef.current) return Promise.resolve(null);
    loading.current ??= (async () => {
      try {
        const [clerk, localization] = await Promise.all([
          loadClerkScript(keyRef.current!),
          lang === 'es' ? import('clerk-localization-es').then((m) => m.esES) : Promise.resolve(undefined),
        ]);
        await clerk.load({
          localization: localization as never,
          appearance: { variables: { colorPrimary: '#3E2415', fontFamily: 'Inter, sans-serif', borderRadius: '0.75rem' } },
        });
        clerkRef.current = clerk;
        let lastUserId: string | null | undefined;
        clerk.addListener(({ user }) => {
          const id = user?.id ?? null;
          if (id === lastUserId) return;
          lastUserId = id;
          if (id) void loadMe();
          else setState(SIGNED_OUT);
        });
        if (!clerk.user) setState(SIGNED_OUT);
        return clerk;
      } catch (e) {
        console.error('[auth]', e);
        loading.current = null;
        setState({ ...SIGNED_OUT, status: 'disabled' });
        return null;
      }
    })();
    return loading.current;
    // The UI language of Clerk is the one active when it first loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMe]);

  useEffect(() => {
    // The old fake login kept visitors' details in this browser; erase them.
    localStorage.removeItem('huila-user');
    localStorage.removeItem('huila-clients');
    let cancelled = false;
    fetch('/api/auth-config')
      .then((r) => r.json())
      .then((cfg) => {
        if (cancelled) return;
        if (!cfg?.enabled || !cfg.publishableKey) return setState({ ...SIGNED_OUT, status: 'disabled' });
        keyRef.current = cfg.publishableKey;
        if (hasSessionHint() || activeTab === 'account' || activeTab === 'admin') void ensureClerk();
        else setState(SIGNED_OUT);
      })
      .catch(() => !cancelled && setState({ ...SIGNED_OUT, status: 'disabled' }));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigating to My account / Admin needs Clerk to know who is signed in.
  useEffect(() => {
    if ((activeTab === 'account' || activeTab === 'admin') && keyRef.current && !clerkRef.current) void ensureClerk();
  }, [activeTab, ensureClerk]);

  const openSignIn = useCallback(() => {
    void ensureClerk().then((clerk) => {
      if (clerk && !clerk.user) clerk.openSignIn({});
    });
  }, [ensureClerk]);

  const signOut = useCallback(async () => {
    await clerkRef.current?.signOut();
    setState(SIGNED_OUT);
  }, []);

  const value = useMemo<AuthApi>(
    () => ({ ...state, openSignIn, signOut, authFetch, refresh: loadMe }),
    [state, openSignIn, signOut, authFetch, loadMe],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
