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

type ClerkUIConstructor = Exclude<NonNullable<NonNullable<Parameters<Clerk['load']>[0]>['ui']>['ClerkUI'], Promise<unknown> | undefined>;

declare global {
  interface Window {
    Clerk?: Clerk;
    /** Set by Clerk's UI script (@clerk/ui): since clerk-js v6 the sign-in modal lives in that separate bundle. */
    __internal_ClerkUICtor?: ClerkUIConstructor;
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
  /** A Clerk session cookie exists and is still being checked: show a spinner, not the sign-up invitation. */
  restoring: boolean;
  openSignIn: () => void;
  openSignUp: () => void;
  signOut: () => Promise<void>;
  authFetch: (input: string, init?: RequestInit) => Promise<Response>;
  refresh: () => Promise<void>;
}

const SIGNED_OUT: AuthState = { status: 'signedOut', email: null, isAdmin: false, customer: null };

const AuthContext = createContext<AuthApi>({
  ...SIGNED_OUT,
  status: 'loading',
  restoring: false,
  openSignIn: () => {},
  openSignUp: () => {},
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

type Tree = { [key: string]: string | Tree };

/** Clerk's Spanish mixes "tú" and "usted"; the site speaks "usted". Only the screens a customer sees. */
const ES_OVERRIDES: Tree = {
  signIn: {
    start: {
      title: 'Ingrese',
      titleCombined: 'Ingrese o cree su cuenta',
      subtitle: 'para continuar en {{applicationName}}',
      subtitleCombined: 'para continuar en {{applicationName}}',
      actionText: '¿No tiene cuenta?',
      actionLink: 'Regístrese',
    },
    emailCode: { subtitle: 'para continuar en {{applicationName}}' },
  },
  signUp: {
    start: {
      title: 'Cree su cuenta',
      titleCombined: 'Cree su cuenta',
      actionText: '¿Ya tiene una cuenta?',
      actionLink: 'Ingrese',
    },
    emailCode: {
      subtitle: 'para continuar en {{applicationName}}',
      formSubtitle: 'Escriba el código que le enviamos a su correo electrónico',
      resendButton: 'Reenviar código',
    },
  },
};

/** Clerk's own translation of each site language (English is built in). */
const CLERK_LOCALIZATION: Record<Language, () => Promise<Tree | undefined>> = {
  en: async () => undefined,
  es: () => import('clerk-localization-es').then((m) => merge(m.esES as unknown as Tree, ES_OVERRIDES)),
  nl: () => import('clerk-localization-nl').then((m) => m.nlNL as unknown as Tree),
  de: () => import('clerk-localization-de').then((m) => m.deDE as unknown as Tree),
  fr: () => import('clerk-localization-fr').then((m) => m.frFR as unknown as Tree),
  sv: () => import('clerk-localization-sv').then((m) => m.svSE as unknown as Tree),
};

function merge(base: Tree, extra: Tree): Tree {
  const out: Tree = { ...base };
  for (const [k, v] of Object.entries(extra)) {
    const b = out[k];
    out[k] = typeof v === 'object' && b && typeof b === 'object' ? merge(b, v) : v;
  }
  return out;
}

/**
 * Clerk navigates after signing in or out; by default to the page the visitor is on. Staying on
 * the same URL needs no reload: the auth listener already updates the page.
 */
function clerkNavigate(to: string) {
  const url = new URL(to, window.location.href);
  if (url.href !== window.location.href) window.location.assign(url.href);
}

const scripts = new Map<string, Promise<void>>();
function loadScript(src: string, publishableKey: string): Promise<void> {
  let promise = scripts.get(src);
  if (!promise) {
    promise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.dataset.clerkPublishableKey = publishableKey;
      script.onload = () => resolve();
      script.onerror = () => {
        scripts.delete(src);
        script.remove();
        reject(new Error(`clerk_script ${src}`));
      };
      document.head.appendChild(script);
    });
    scripts.set(src, promise);
  }
  return promise;
}

/** Loads clerk-js (session logic) and @clerk/ui (the sign-in modal) side by side from the instance's CDN. */
async function loadClerkScripts(publishableKey: string): Promise<{ clerk: Clerk; ClerkUI: ClerkUIConstructor }> {
  const host = frontendApi(publishableKey);
  if (!host) throw new Error('invalid_publishable_key');
  await Promise.all([
    window.Clerk ? null : loadScript(`https://${host}/npm/@clerk/clerk-js@6/dist/clerk.browser.js`, publishableKey),
    window.__internal_ClerkUICtor ? null : loadScript(`https://${host}/npm/@clerk/ui@1/dist/ui.browser.js`, publishableKey),
  ]);
  if (!window.Clerk || !window.__internal_ClerkUICtor) throw new Error('clerk_missing');
  return { clerk: window.Clerk, ClerkUI: window.__internal_ClerkUICtor };
}

export function AuthProvider({ lang, activeTab, children }: { lang: Language; activeTab: Tab; children: ReactNode }) {
  // Login not published in this build: "disabled" from the first render, so the pre-rendered pages
  // already show the open estimator and no sign-in button.
  const [state, setState] = useState<AuthState>({ ...SIGNED_OUT, status: __LOGIN_PUBLIC__ ? 'loading' : 'disabled' });
  const [sessionHint, setSessionHint] = useState(false);
  const keyRef = useRef<string | null>(null);
  const clerkRef = useRef<Clerk | null>(null);
  const loading = useRef<Promise<Clerk | null> | null>(null);
  const langRef = useRef(lang);
  const loadedLang = useRef<Language | null>(null);

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
        const [{ clerk, ClerkUI }, localization] = await Promise.all([
          loadClerkScripts(keyRef.current!),
          CLERK_LOCALIZATION[langRef.current](),
        ]);
        loadedLang.current = langRef.current;
        await clerk.load({
          ui: { ClerkUI },
          routerPush: clerkNavigate,
          routerReplace: clerkNavigate,
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
  }, [loadMe]);

  // Clerk follows the site's language selector, also after it has loaded.
  useEffect(() => {
    langRef.current = lang;
    const clerk = clerkRef.current;
    if (!clerk || loadedLang.current === lang) return;
    loadedLang.current = lang;
    void CLERK_LOCALIZATION[lang]().then((localization) => {
      // Internal API: if a Clerk update removes it, the modal simply keeps its first language.
      const update = (clerk as unknown as { __internal_updateProps?: (p: { options: Record<string, unknown> }) => void }).__internal_updateProps;
      update?.call(clerk, { options: { localization } });
    });
  }, [lang]);

  useEffect(() => {
    // The old fake login kept visitors' details in this browser; erase them.
    localStorage.removeItem('huila-user');
    localStorage.removeItem('huila-clients');
    if (!__LOGIN_PUBLIC__) return;
    setSessionHint(hasSessionHint());
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

  // withSignUp: an email without an account continues straight into sign-up instead of failing.
  const openSignIn = useCallback(() => {
    void ensureClerk().then((clerk) => {
      if (clerk && !clerk.user) clerk.openSignIn({ withSignUp: true });
    });
  }, [ensureClerk]);

  const openSignUp = useCallback(() => {
    void ensureClerk().then((clerk) => {
      if (clerk && !clerk.user) clerk.openSignUp({});
    });
  }, [ensureClerk]);

  const signOut = useCallback(async () => {
    await clerkRef.current?.signOut({ redirectUrl: window.location.href });
    setState(SIGNED_OUT);
  }, []);

  const restoring = state.status === 'loading' && sessionHint;
  const value = useMemo<AuthApi>(
    () => ({ ...state, restoring, openSignIn, openSignUp, signOut, authFetch, refresh: loadMe }),
    [state, restoring, openSignIn, openSignUp, signOut, authFetch, loadMe],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
