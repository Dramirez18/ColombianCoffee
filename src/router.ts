import { Language, Tab } from './types';

/**
 * Minimal path router — no library.
 *
 * English pages live at the root (`/green-coffee`), Spanish pages under `/es/`
 * with a Spanish slug (`/es/cafe-verde`). Both are pre-rendered at build time
 * (scripts/prerender.mjs) so crawlers that do not run JavaScript still get the
 * full page. nl/de/fr/sv are client-side only and share the English URLs.
 */

export type PublicTab = Exclude<Tab, 'profile' | 'admin'>;

export const SITE_URL = 'https://www.entrecafescolombianos.coffee';

export const PRERENDER_LANGS: Language[] = ['en', 'es'];

export const ROUTES: { tab: PublicTab; en: string; es: string }[] = [
  { tab: 'home', en: '', es: '' },
  { tab: 'green', en: 'green-coffee', es: 'cafe-verde' },
  { tab: 'products', en: 'products', es: 'productos' },
  { tab: 'export', en: 'export', es: 'exportacion' },
  { tab: 'shipping', en: 'shipping-estimate', es: 'cotizador-de-envio' },
  { tab: 'faq', en: 'faq', es: 'preguntas-frecuentes' },
  { tab: 'about', en: 'about', es: 'nosotros' },
  { tab: 'contact', en: 'contact', es: 'contacto' },
];

const LEGACY_TABS: Record<string, Tab> = { profile: 'profile', admin: 'admin' };

export function pathFor(tab: Tab, lang: Language): string {
  const prefix = lang === 'es' ? '/es' : '';
  const route = ROUTES.find((r) => r.tab === tab);
  if (!route) return `${prefix}/${tab}`; // profile / admin
  const slug = lang === 'es' ? route.es : route.en;
  return slug ? `${prefix}/${slug}` : prefix || '/';
}

export function parsePath(pathname: string): { tab: Tab; lang: Language | null } {
  const clean = pathname.replace(/\/+$/, '').replace(/^\/+/, '');
  const parts = clean ? clean.split('/') : [];
  let lang: Language | null = null;
  if (parts[0] === 'es') {
    lang = 'es';
    parts.shift();
  }
  const slug = parts[0] ?? '';
  if (!slug) return { tab: 'home', lang };
  const route = ROUTES.find((r) => r.en === slug || r.es === slug);
  if (route) return { tab: route.tab, lang };
  if (LEGACY_TABS[slug]) return { tab: LEGACY_TABS[slug], lang };
  return { tab: 'home', lang };
}

export function absoluteUrl(tab: Tab, lang: Language): string {
  return `${SITE_URL}${pathFor(tab, lang)}`;
}

/** Every pre-rendered page: tab × language. */
export function prerenderPages(): { tab: PublicTab; lang: Language; path: string }[] {
  return PRERENDER_LANGS.flatMap((lang) =>
    ROUTES.map((r) => ({ tab: r.tab, lang, path: pathFor(r.tab, lang) })),
  );
}
