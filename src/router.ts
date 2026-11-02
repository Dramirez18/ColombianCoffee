import { Language, Tab } from './types';
import { LANGUAGES } from './locale';

/**
 * Minimal path router — no library.
 *
 * English pages live at the root (`/green-coffee`); every other language under
 * its own prefix with a translated slug (`/es/cafe-verde`, `/de/rohkaffee`).
 * All of them are pre-rendered at build time (scripts/prerender.mjs) so
 * crawlers that do not run JavaScript still get the full page.
 */

export type PublicTab = Exclude<Tab, 'account' | 'admin'>;

export const SITE_URL = 'https://www.entrecafescolombianos.coffee';

export const PRERENDER_LANGS: Language[] = LANGUAGES;

export const ROUTES: ({ tab: PublicTab } & Record<Language, string>)[] = [
  { tab: 'home', en: '', es: '', nl: '', de: '', fr: '', sv: '' },
  { tab: 'green', en: 'green-coffee', es: 'cafe-verde', nl: 'groene-koffie', de: 'rohkaffee', fr: 'cafe-vert', sv: 'rakaffe' },
  { tab: 'profiles', en: 'cup-profiles', es: 'perfiles-de-taza', nl: 'smaakprofielen', de: 'geschmacksprofile', fr: 'profils-en-tasse', sv: 'smakprofiler' },
  { tab: 'products', en: 'products', es: 'productos', nl: 'producten', de: 'produkte', fr: 'produits', sv: 'produkter' },
  { tab: 'export', en: 'export', es: 'exportacion', nl: 'export', de: 'export', fr: 'exportation', sv: 'export' },
  { tab: 'shipping', en: 'shipping-estimate', es: 'cotizador-de-envio', nl: 'verzendcalculator', de: 'versandrechner', fr: 'devis-expedition', sv: 'fraktkalkylator' },
  { tab: 'faq', en: 'faq', es: 'preguntas-frecuentes', nl: 'veelgestelde-vragen', de: 'haeufige-fragen', fr: 'questions-frequentes', sv: 'vanliga-fragor' },
  { tab: 'about', en: 'about', es: 'nosotros', nl: 'over-ons', de: 'ueber-uns', fr: 'a-propos', sv: 'om-oss' },
  { tab: 'contact', en: 'contact', es: 'contacto', nl: 'contact', de: 'kontakt', fr: 'contact', sv: 'kontakt' },
  { tab: 'privacy', en: 'privacy', es: 'privacidad', nl: 'privacy', de: 'datenschutz', fr: 'confidentialite', sv: 'integritet' },
];

// Client-only views. /profile was the old (fake) account page: it now opens the real one.
const LEGACY_TABS: Record<string, Tab> = { account: 'account', admin: 'admin', profile: 'account' };

const prefixFor = (lang: Language) => (lang === 'en' ? '' : `/${lang}`);

export function pathFor(tab: Tab, lang: Language): string {
  const prefix = prefixFor(lang);
  const route = ROUTES.find((r) => r.tab === tab);
  if (!route) return `${prefix}/${tab}`; // account / admin
  const slug = route[lang];
  return slug ? `${prefix}/${slug}` : prefix || '/';
}

export function parsePath(pathname: string): { tab: Tab; lang: Language | null } {
  const clean = pathname.replace(/\/+$/, '').replace(/^\/+/, '');
  const parts = clean ? clean.split('/') : [];
  let lang: Language | null = null;
  const first = parts[0] as Language | undefined;
  if (first && first !== 'en' && LANGUAGES.includes(first)) {
    lang = first;
    parts.shift();
  }
  const slug = parts[0] ?? '';
  if (!slug) return { tab: 'home', lang };
  // The slug of the URL's own language first; any other language's slug still finds the page.
  const route = (lang && ROUTES.find((r) => r[lang] === slug)) || ROUTES.find((r) => LANGUAGES.some((l) => r[l] === slug));
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
