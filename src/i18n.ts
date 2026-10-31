import { Language } from './types';
import { CONTENT } from './content';

/**
 * Short UI strings (navigation, buttons, labels).
 * English is the source of truth; Spanish is complete; nl/de/fr/sv keep the
 * original translations and fall back to English for anything new.
 * Long-form page content lives in content.ts (en + es).
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

type Translations = { en: TranslationKeys } & Record<Exclude<Language, 'en'>, Partial<TranslationKeys>>;

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
    nav_shipping: 'Verzendkosten',
    nav_faq: 'FAQ',
    nav_about: 'Over Ons',
    nav_contact: 'Contact',
    nav_admin: 'Beheer',
    nav_login: 'Inloggen',
    nav_logout: 'Uitloggen',

    hero_title: 'Colombiaanse groene koffie, rechtstreeks geëxporteerd vanuit de oorsprong',
    hero_subtitle: 'Excelso EP, zeef 14+, SCA 84+ gecupt door een Q-Grader. Gewassen Castillo, Colombia en Caturra uit Huila, Cauca, Valle del Cauca, Nariño en Quindío. Monsters per koerier, luchtvracht tot 60 kg en 20\'-containers FOB Cartagena of CIF uw haven.',
    hero_cta: 'Bekijk de specificaties',
    hero_badge: 'Direct uit Colombia · Geregistreerd exporteur',

    roast_green: 'Groen (Ongebrand)',
    roast_medium: 'Medium Branding',
    roast_medium_high: 'Medium-Hoge Branding',
    roast_decaf: 'Cafeïnevrij',

    footer_tagline: 'Colombiaanse groene en gebrande koffie uit Huila, Cauca, Valle del Cauca, Nariño en Quindío — rechtstreeks geëxporteerd vanuit Bogotá.',
    footer_contact: 'Contact',
    footer_links: 'Snelle Links',
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
    nav_shipping: 'Versandkosten',
    nav_faq: 'FAQ',
    nav_about: 'Über Uns',
    nav_contact: 'Kontakt',
    nav_admin: 'Admin',
    nav_login: 'Anmelden',
    nav_logout: 'Abmelden',

    hero_title: 'Kolumbianischer Rohkaffee, direkt vom Ursprung exportiert',
    hero_subtitle: 'Excelso EP, Sieb 14+, SCA 84+ von einem Q-Grader verkostet. Gewaschener Castillo, Colombia und Caturra aus Huila, Cauca, Valle del Cauca, Nariño und Quindío. Muster per Kurier, Luftfracht bis 60 kg und 20\'-Container FOB Cartagena oder CIF Ihr Hafen.',
    hero_cta: 'Spezifikationen ansehen',
    hero_badge: 'Direkt aus Kolumbien · Registrierter Exporteur',

    roast_green: 'Grün (Ungeröstet)',
    roast_medium: 'Mittlere Röstung',
    roast_medium_high: 'Mittel-Kräftige Röstung',
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
    nav_profiles: 'Profils de tasse',
    nav_products: 'Produits',
    nav_export: 'Export & logistique',
    nav_shipping: 'Frais d’envoi',
    nav_faq: 'FAQ',
    nav_about: 'À Propos',
    nav_contact: 'Contact',
    nav_admin: 'Admin',
    nav_login: 'Connexion',
    nav_logout: 'Déconnexion',

    hero_title: 'Café vert colombien, exporté directement depuis l\'origine',
    hero_subtitle: 'Excelso EP, tamis 14+, SCA 84+ noté par un Q-Grader. Castillo, Colombia et Caturra lavés de Huila, Cauca, Valle del Cauca, Nariño et Quindío. Échantillons par coursier, lots aériens jusqu\'à 60 kg et conteneurs 20\' FOB Cartagena ou CIF votre port.',
    hero_cta: 'Voir les spécifications',
    hero_badge: 'Direct de Colombie · Exportateur enregistré',

    roast_green: 'Vert (Non Torréfié)',
    roast_medium: 'Torréfaction Moyenne',
    roast_medium_high: 'Torréfaction Moyenne-Forte',
    roast_decaf: 'Décaféiné',

    footer_tagline: 'Café vert et torréfié colombien de Huila, Cauca, Valle del Cauca, Nariño et Quindío — exporté directement depuis Bogotá.',
    footer_contact: 'Contact',
    footer_links: 'Liens Rapides',
    footer_rights: 'Tous droits réservés.',
    footer_export_markets: "Marchés d'exportation",
    footer_export_markets_text: 'Livré en Suède ; devis en Europe, au Moyen-Orient, en Afrique et en Amérique — du colis coursier au conteneur.',
  },

  sv: {
    nav_home: 'Hem',
    nav_green: 'Råkaffe',
    nav_profiles: 'Koppprofiler',
    nav_products: 'Produkter',
    nav_export: 'Export & logistik',
    nav_shipping: 'Fraktkostnad',
    nav_faq: 'FAQ',
    nav_about: 'Om Oss',
    nav_contact: 'Kontakt',
    nav_admin: 'Admin',
    nav_login: 'Logga In',
    nav_logout: 'Logga Ut',

    hero_title: 'Colombianskt råkaffe, exporterat direkt från ursprunget',
    hero_subtitle: 'Excelso EP, sikt 14+, SCA 84+ provsmakat av Q-Grader. Tvättad Castillo, Colombia och Caturra från Huila, Cauca, Valle del Cauca, Nariño och Quindío. Prover med kurir, flygfrakt upp till 60 kg och 20\'-containrar FOB Cartagena eller CIF din hamn.',
    hero_cta: 'Se specifikationerna',
    hero_badge: 'Direkt från Colombia · Registrerad exportör',

    roast_green: 'Grön (Orostad)',
    roast_medium: 'Mediumrostning',
    roast_medium_high: 'Medium-Hög Rostning',
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
