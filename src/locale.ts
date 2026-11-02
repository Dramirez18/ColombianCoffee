import { Language } from './types';

/**
 * Every language of the site. English lives at the root, the others under
 * /<lang>/; all of them are fully translated and pre-rendered.
 */
export const LANGUAGES: Language[] = ['en', 'es', 'nl', 'de', 'fr', 'sv'];

/** Locale for numbers, money and dates (Spanish follows Colombian usage). */
export const LOCALES: Record<Language, string> = {
  en: 'en-US',
  es: 'es-CO',
  nl: 'nl-NL',
  de: 'de-DE',
  fr: 'fr-FR',
  sv: 'sv-SE',
};

/** Open Graph locale of each language. */
export const OG_LOCALES: Record<Language, string> = {
  en: 'en_US',
  es: 'es_CO',
  nl: 'nl_NL',
  de: 'de_DE',
  fr: 'fr_FR',
  sv: 'sv_SE',
};

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (LANGUAGES as string[]).includes(value);
}
