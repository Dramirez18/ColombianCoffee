import { Language } from './types';
import { CONTENT } from './content';

/**
 * Short UI strings (navigation, buttons, labels), complete in every language.
 * Long-form page content lives in content.ts (en + es) and src/content/<lang>.ts.
 */

type TranslationKeys = {
  // Navigation
  nav_home: string;
  nav_green: string;
  nav_profiles: string;
  nav_products: string;
  nav_export: string;
  nav_shipping: string;
  nav_faq: string;
  nav_about: string;
  nav_contact: string;
  nav_admin: string;
  nav_account: string;
  nav_privacy: string;
  nav_login: string;
  nav_logout: string;

  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_cta: string;
  hero_badge: string;

  // Products

  // Roast levels
  roast_green: string;
  roast_medium: string;
  roast_medium_high: string;
  roast_decaf: string;

  // Cart

  // Auth

  // Profile

  // Admin

  // About

  // Footer
  footer_tagline: string;
  footer_contact: string;
  footer_links: string;
  footer_rights: string;
  footer_export_markets: string;
  footer_export_markets_text: string;

  // General
};

type Translations = Record<Language, TranslationKeys>;

const REGIONS_EN = 'Huila, Cauca, Valle del Cauca, Nariño and Quindío';

const translations: Translations = {
  en: {
    nav_home: 'Home',
    nav_green: 'Green Coffee',
    nav_profiles: 'Cup Profiles',
    nav_products: 'Products',
    nav_export: 'Export & Logistics',
    nav_shipping: 'Shipping Estimate',
    nav_faq: 'FAQ',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_admin: 'Admin',
    nav_account: 'My account',
    nav_privacy: 'Privacy policy',
    nav_login: 'Login',
    nav_logout: 'Logout',

    hero_title: CONTENT.en.hero.title,
    hero_subtitle: CONTENT.en.hero.subtitle,
    hero_cta: CONTENT.en.hero.cta,
    hero_badge: CONTENT.en.hero.badge,

    roast_green: 'Green (Unroasted)',
    roast_medium: 'Medium Roast',
    roast_medium_high: 'Medium-High Roast',
    roast_decaf: 'Decaffeinated',

    footer_tagline: `Colombian green and roasted coffee from ${REGIONS_EN} — exported directly from Bogotá.`,
    footer_contact: 'Contact',
    footer_links: 'Quick Links',
    footer_rights: 'All rights reserved.',
    footer_export_markets: 'Export Markets',
    footer_export_markets_text: 'Shipped to Sweden; quoting Europe, the Middle East, Africa and the Americas — from courier lots to containers.',
  },

  es: {
    nav_home: 'Inicio',
    nav_green: 'Café verde',
    nav_profiles: 'Perfiles de taza',
    nav_products: 'Productos',
    nav_export: 'Exportación y logística',
    nav_shipping: 'Cotizar envío',
    nav_faq: 'Preguntas frecuentes',
    nav_about: 'Nosotros',
    nav_contact: 'Contacto',
    nav_admin: 'Admin',
    nav_account: 'Mi cuenta',
    nav_privacy: 'Política de datos',
    nav_login: 'Ingresar',
    nav_logout: 'Salir',

    hero_title: CONTENT.es.hero.title,
    hero_subtitle: CONTENT.es.hero.subtitle,
    hero_cta: CONTENT.es.hero.cta,
    hero_badge: CONTENT.es.hero.badge,

    roast_green: 'Verde (sin tostar)',
    roast_medium: 'Tostión media',
    roast_medium_high: 'Tostión media-alta',
    roast_decaf: 'Descafeinado',

    footer_tagline: 'Café verde y tostado colombiano de Huila, Cauca, Valle del Cauca, Nariño y Quindío — exportado directamente desde Bogotá.',
    footer_contact: 'Contacto',
    footer_links: 'Enlaces',
    footer_rights: 'Todos los derechos reservados.',
    footer_export_markets: 'Mercados de exportación',
    footer_export_markets_text: 'Despachos a Suecia; cotizaciones en Europa, Medio Oriente, África y América — desde lotes courier hasta contenedores.',
  },

  nl: {
    nav_home: 'Home',
    nav_green: 'Groene koffie',
    nav_profiles: 'Smaakprofielen',
    nav_products: 'Producten',
    nav_export: 'Export & logistiek',
    nav_shipping: 'Verzendcalculator',
    nav_faq: 'FAQ',
    nav_about: 'Over ons',
    nav_contact: 'Contact',
    nav_admin: 'Beheer',
    nav_account: 'Mijn account',
    nav_privacy: 'Privacybeleid',
    nav_login: 'Inloggen',
    nav_logout: 'Uitloggen',

    hero_title: CONTENT.nl.hero.title,
    hero_subtitle: CONTENT.nl.hero.subtitle,
    hero_cta: CONTENT.nl.hero.cta,
    hero_badge: CONTENT.nl.hero.badge,

    roast_green: 'Groen (ongebrand)',
    roast_medium: 'Medium branding',
    roast_medium_high: 'Medium-donkere branding',
    roast_decaf: 'Cafeïnevrij',

    footer_tagline: 'Colombiaanse groene en gebrande koffie uit Huila, Cauca, Valle del Cauca, Nariño en Quindío — rechtstreeks geëxporteerd vanuit Bogotá.',
    footer_contact: 'Contact',
    footer_links: 'Snelle links',
    footer_rights: 'Alle rechten voorbehouden.',
    footer_export_markets: 'Exportmarkten',
    footer_export_markets_text: 'Geleverd aan Zweden; offertes in Europa, het Midden-Oosten, Afrika en Amerika — van koerierszendingen tot containers.',
  },

  de: {
    nav_home: 'Startseite',
    nav_green: 'Rohkaffee',
    nav_profiles: 'Geschmacksprofile',
    nav_products: 'Produkte',
    nav_export: 'Export & Logistik',
    nav_shipping: 'Versandrechner',
    nav_faq: 'FAQ',
    nav_about: 'Über uns',
    nav_contact: 'Kontakt',
    nav_admin: 'Admin',
    nav_account: 'Mein Konto',
    nav_privacy: 'Datenschutz',
    nav_login: 'Anmelden',
    nav_logout: 'Abmelden',

    hero_title: CONTENT.de.hero.title,
    hero_subtitle: CONTENT.de.hero.subtitle,
    hero_cta: CONTENT.de.hero.cta,
    hero_badge: CONTENT.de.hero.badge,

    roast_green: 'Grün (ungeröstet)',
    roast_medium: 'Mittlere Röstung',
    roast_medium_high: 'Mittelkräftige Röstung',
    roast_decaf: 'Entkoffeiniert',

    footer_tagline: 'Kolumbianischer Roh- und Röstkaffee aus Huila, Cauca, Valle del Cauca, Nariño und Quindío — direkt aus Bogotá exportiert.',
    footer_contact: 'Kontakt',
    footer_links: 'Schnelllinks',
    footer_rights: 'Alle Rechte vorbehalten.',
    footer_export_markets: 'Exportmärkte',
    footer_export_markets_text: 'Geliefert nach Schweden; Angebote in Europa, dem Nahen Osten, Afrika und Amerika — von Kuriersendungen bis Containern.',
  },

  fr: {
    nav_home: 'Accueil',
    nav_green: 'Café vert',
    nav_profiles: 'Profils en tasse',
    nav_products: 'Produits',
    nav_export: 'Export & logistique',
    nav_shipping: 'Devis d’expédition',
    nav_faq: 'FAQ',
    nav_about: 'À propos',
    nav_contact: 'Contact',
    nav_admin: 'Admin',
    nav_account: 'Mon compte',
    nav_privacy: 'Confidentialité',
    nav_login: 'Connexion',
    nav_logout: 'Déconnexion',

    hero_title: CONTENT.fr.hero.title,
    hero_subtitle: CONTENT.fr.hero.subtitle,
    hero_cta: CONTENT.fr.hero.cta,
    hero_badge: CONTENT.fr.hero.badge,

    roast_green: 'Vert (non torréfié)',
    roast_medium: 'Torréfaction moyenne',
    roast_medium_high: 'Torréfaction moyenne-forte',
    roast_decaf: 'Décaféiné',

    footer_tagline: 'Café vert et torréfié colombien de Huila, Cauca, Valle del Cauca, Nariño et Quindío — exporté directement depuis Bogotá.',
    footer_contact: 'Contact',
    footer_links: 'Liens rapides',
    footer_rights: 'Tous droits réservés.',
    footer_export_markets: "Marchés d'exportation",
    footer_export_markets_text: 'Livré en Suède ; devis en Europe, au Moyen-Orient, en Afrique et en Amérique — du colis coursier au conteneur.',
  },

  sv: {
    nav_home: 'Hem',
    nav_green: 'Råkaffe',
    nav_profiles: 'Smakprofiler',
    nav_products: 'Produkter',
    nav_export: 'Export & logistik',
    nav_shipping: 'Fraktkalkylator',
    nav_faq: 'FAQ',
    nav_about: 'Om oss',
    nav_contact: 'Kontakt',
    nav_admin: 'Admin',
    nav_account: 'Mitt konto',
    nav_privacy: 'Integritetspolicy',
    nav_login: 'Logga in',
    nav_logout: 'Logga ut',

    hero_title: CONTENT.sv.hero.title,
    hero_subtitle: CONTENT.sv.hero.subtitle,
    hero_cta: CONTENT.sv.hero.cta,
    hero_badge: CONTENT.sv.hero.badge,

    roast_green: 'Grön (orostad)',
    roast_medium: 'Mediumrostning',
    roast_medium_high: 'Medium–mörk rostning',
    roast_decaf: 'Koffeinfritt',

    footer_tagline: 'Colombianskt rå- och rostat kaffe från Huila, Cauca, Valle del Cauca, Nariño och Quindío — exporterat direkt från Bogotá.',
    footer_contact: 'Kontakt',
    footer_links: 'Snabblänkar',
    footer_rights: 'Alla rättigheter förbehållna.',
    footer_export_markets: 'Exportmarknader',
    footer_export_markets_text: 'Levererat till Sverige; offerter i Europa, Mellanöstern, Afrika och Amerika — från kurirpaket till containrar.',
  },
};

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  nl: 'Nederlands',
  de: 'Deutsch',
  fr: 'Français',
  sv: 'Svenska',
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  en: '🇬🇧',
  es: '🇨🇴',
  nl: '🇳🇱',
  de: '🇩🇪',
  fr: '🇫🇷',
  sv: '🇸🇪',
};

export function t(lang: Language, key: keyof TranslationKeys): string {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

export default translations;
