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
  nav_products: string;
  nav_export: string;
  nav_faq: string;
  nav_about: string;
  nav_contact: string;
  nav_profile: string;
  nav_admin: string;
  nav_cart: string;
  nav_login: string;
  nav_logout: string;
  nav_search: string;

  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_cta: string;
  hero_badge: string;

  // Products
  products_title: string;
  products_all: string;
  products_origin: string;
  products_altitude: string;
  products_process: string;
  products_roast: string;
  products_flavor_notes: string;
  products_add_to_cart: string;
  products_out_of_stock: string;
  products_in_stock: string;
  products_weight: string;
  products_wholesale_price: string;
  products_retail_price: string;
  products_you_save: string;

  // Roast levels
  roast_green: string;
  roast_medium: string;
  roast_medium_high: string;
  roast_decaf: string;

  // Cart
  cart_title: string;
  cart_empty: string;
  cart_subtotal: string;
  cart_discount: string;
  cart_total: string;
  cart_checkout: string;
  cart_remove: string;
  cart_clear: string;

  // Auth
  auth_login: string;
  auth_register: string;
  auth_email: string;
  auth_password: string;
  auth_name: string;
  auth_phone: string;
  auth_address: string;
  auth_city: string;
  auth_postal_code: string;
  auth_province: string;
  auth_user_type: string;
  auth_retail: string;
  auth_wholesale: string;
  auth_company_name: string;
  auth_kvk_number: string;
  auth_login_btn: string;
  auth_register_btn: string;
  auth_no_account: string;
  auth_have_account: string;

  // Profile
  profile_title: string;
  profile_orders: string;
  profile_settings: string;
  profile_order_history: string;
  profile_no_orders: string;

  // Admin
  admin_title: string;
  admin_dashboard: string;
  admin_products: string;
  admin_orders: string;
  admin_clients: string;
  admin_total_products: string;
  admin_total_orders: string;
  admin_total_clients: string;
  admin_revenue: string;

  // About
  about_title: string;
  about_story: string;
  about_origin: string;
  about_delivery: string;
  about_delivery_text: string;

  // Footer
  footer_tagline: string;
  footer_contact: string;
  footer_links: string;
  footer_follow: string;
  footer_rights: string;
  footer_export_markets: string;
  footer_export_markets_text: string;

  // General
  general_loading: string;
  general_close: string;
  general_save: string;
  general_cancel: string;
  general_delete: string;
  general_edit: string;
  general_confirm: string;
  general_back: string;
  general_currency: string;
};

type Translations = { en: TranslationKeys } & Record<Exclude<Language, 'en'>, Partial<TranslationKeys>>;

const REGIONS_EN = 'Huila, Cauca, Valle del Cauca, Nariño and Quindío';

const translations: Translations = {
  en: {
    nav_home: 'Home',
    nav_green: 'Green Coffee',
    nav_products: 'Products',
    nav_export: 'Export & Logistics',
    nav_faq: 'FAQ',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_profile: 'Profile',
    nav_admin: 'Admin',
    nav_cart: 'Cart',
    nav_login: 'Login',
    nav_logout: 'Logout',
    nav_search: 'Search coffee...',

    hero_title: CONTENT.en.hero.title,
    hero_subtitle: CONTENT.en.hero.subtitle,
    hero_cta: CONTENT.en.hero.cta,
    hero_badge: CONTENT.en.hero.badge,

    products_title: 'Our Coffee Selection',
    products_all: 'All Coffee',
    products_origin: 'Origin',
    products_altitude: 'Altitude',
    products_process: 'Process',
    products_roast: 'Roast Level',
    products_flavor_notes: 'Flavor Notes',
    products_add_to_cart: 'Add to Cart',
    products_out_of_stock: 'Out of Stock',
    products_in_stock: 'In Stock',
    products_weight: 'Weight',
    products_wholesale_price: 'Wholesale Price',
    products_retail_price: 'Retail Price',
    products_you_save: 'You save',

    roast_green: 'Green (Unroasted)',
    roast_medium: 'Medium Roast',
    roast_medium_high: 'Medium-High Roast',
    roast_decaf: 'Decaffeinated',

    cart_title: 'Shopping Cart',
    cart_empty: 'Your cart is empty',
    cart_subtotal: 'Subtotal',
    cart_discount: 'Wholesale Discount',
    cart_total: 'Total',
    cart_checkout: 'Proceed to Checkout',
    cart_remove: 'Remove',
    cart_clear: 'Clear Cart',

    auth_login: 'Login',
    auth_register: 'Create Account',
    auth_email: 'Email',
    auth_password: 'Password',
    auth_name: 'Full Name',
    auth_phone: 'Phone Number',
    auth_address: 'Street Address',
    auth_city: 'City',
    auth_postal_code: 'Postal Code',
    auth_province: 'Province',
    auth_user_type: 'Account Type',
    auth_retail: 'Retail Customer',
    auth_wholesale: 'Wholesale Buyer',
    auth_company_name: 'Company Name',
    auth_kvk_number: 'KVK Number',
    auth_login_btn: 'Sign In',
    auth_register_btn: 'Create Account',
    auth_no_account: "Don't have an account?",
    auth_have_account: 'Already have an account?',

    profile_title: 'My Profile',
    profile_orders: 'My Orders',
    profile_settings: 'Account Settings',
    profile_order_history: 'Order History',
    profile_no_orders: 'No orders yet',

    admin_title: 'Admin Dashboard',
    admin_dashboard: 'Dashboard',
    admin_products: 'Products',
    admin_orders: 'Orders',
    admin_clients: 'Clients',
    admin_total_products: 'Total Products',
    admin_total_orders: 'Total Orders',
    admin_total_clients: 'Total Clients',
    admin_revenue: 'Revenue',

    about_title: 'About Entre Cafés Colombianos',
    about_story: CONTENT.en.about.story[0],
    about_origin: `${REGIONS_EN} — Colombia`,
    about_delivery: 'Where we ship and quote',
    about_delivery_text: CONTENT.en.about.marketsText,

    footer_tagline: `Colombian green and roasted coffee from ${REGIONS_EN} — exported directly from Bogotá.`,
    footer_contact: 'Contact',
    footer_links: 'Quick Links',
    footer_follow: 'Follow Us',
    footer_rights: 'All rights reserved.',
    footer_export_markets: 'Export Markets',
    footer_export_markets_text: 'Shipped to Sweden; quoting Europe, the Middle East, Africa and the Americas — from courier lots to containers.',

    general_loading: 'Loading...',
    general_close: 'Close',
    general_save: 'Save',
    general_cancel: 'Cancel',
    general_delete: 'Delete',
    general_edit: 'Edit',
    general_confirm: 'Confirm',
    general_back: 'Back',
    general_currency: '€',
  },

  es: {
    nav_home: 'Inicio',
    nav_green: 'Café verde',
    nav_products: 'Productos',
    nav_export: 'Exportación y logística',
    nav_faq: 'Preguntas frecuentes',
    nav_about: 'Nosotros',
    nav_contact: 'Contacto',
    nav_profile: 'Perfil',
    nav_admin: 'Admin',
    nav_cart: 'Carrito',
    nav_login: 'Ingresar',
    nav_logout: 'Salir',
    nav_search: 'Buscar café...',

    hero_title: CONTENT.es.hero.title,
    hero_subtitle: CONTENT.es.hero.subtitle,
    hero_cta: CONTENT.es.hero.cta,
    hero_badge: CONTENT.es.hero.badge,

    products_title: 'Nuestra selección de café',
    products_all: 'Todo el café',
    products_origin: 'Origen',
    products_altitude: 'Altura',
    products_process: 'Proceso',
    products_roast: 'Nivel de tostión',
    products_flavor_notes: 'Notas de sabor',
    products_add_to_cart: 'Agregar al carrito',
    products_out_of_stock: 'Agotado',
    products_in_stock: 'Disponible',
    products_weight: 'Peso',
    products_wholesale_price: 'Precio mayorista',
    products_retail_price: 'Precio al detal',
    products_you_save: 'Ahorra',

    roast_green: 'Verde (sin tostar)',
    roast_medium: 'Tostión media',
    roast_medium_high: 'Tostión media-alta',
    roast_decaf: 'Descafeinado',

    cart_title: 'Carrito de compras',
    cart_empty: 'Su carrito está vacío',
    cart_subtotal: 'Subtotal',
    cart_discount: 'Descuento mayorista',
    cart_total: 'Total',
    cart_checkout: 'Pagar',
    cart_remove: 'Quitar',
    cart_clear: 'Vaciar carrito',

    auth_login: 'Ingresar',
    auth_register: 'Crear cuenta',
    auth_email: 'Correo',
    auth_password: 'Contraseña',
    auth_name: 'Nombre completo',
    auth_phone: 'Teléfono',
    auth_address: 'Dirección',
    auth_city: 'Ciudad',
    auth_postal_code: 'Código postal',
    auth_province: 'Provincia / departamento',
    auth_user_type: 'Tipo de cuenta',
    auth_retail: 'Cliente al detal',
    auth_wholesale: 'Comprador mayorista',
    auth_company_name: 'Nombre de la empresa',
    auth_kvk_number: 'Número de registro',
    auth_login_btn: 'Ingresar',
    auth_register_btn: 'Crear cuenta',
    auth_no_account: '¿No tiene cuenta?',
    auth_have_account: '¿Ya tiene cuenta?',

    profile_title: 'Mi perfil',
    profile_orders: 'Mis pedidos',
    profile_settings: 'Configuración',
    profile_order_history: 'Historial de pedidos',
    profile_no_orders: 'Aún no hay pedidos',

    admin_title: 'Panel de administración',
    admin_dashboard: 'Resumen',
    admin_products: 'Productos',
    admin_orders: 'Pedidos',
    admin_clients: 'Clientes',
    admin_total_products: 'Total productos',
    admin_total_orders: 'Total pedidos',
    admin_total_clients: 'Total clientes',
    admin_revenue: 'Ingresos',

    about_title: 'Sobre Entre Cafés Colombianos',
    about_story: CONTENT.es.about.story[0],
    about_origin: 'Huila, Cauca, Valle del Cauca, Nariño y Quindío — Colombia',
    about_delivery: 'Dónde despachamos y cotizamos',
    about_delivery_text: CONTENT.es.about.marketsText,

    footer_tagline: 'Café verde y tostado colombiano de Huila, Cauca, Valle del Cauca, Nariño y Quindío — exportado directamente desde Bogotá.',
    footer_contact: 'Contacto',
    footer_links: 'Enlaces',
    footer_follow: 'Síganos',
    footer_rights: 'Todos los derechos reservados.',
    footer_export_markets: 'Mercados de exportación',
    footer_export_markets_text: 'Despachos a Suecia; cotizaciones en Europa, Medio Oriente, África y América — desde lotes courier hasta contenedores.',

    general_loading: 'Cargando...',
    general_close: 'Cerrar',
    general_save: 'Guardar',
    general_cancel: 'Cancelar',
    general_delete: 'Eliminar',
    general_edit: 'Editar',
    general_confirm: 'Confirmar',
    general_back: 'Volver',
    general_currency: '€',
  },

  nl: {
    nav_home: 'Home',
    nav_green: 'Groene koffie',
    nav_products: 'Producten',
    nav_export: 'Export & logistiek',
    nav_faq: 'FAQ',
    nav_about: 'Over Ons',
    nav_contact: 'Contact',
    nav_profile: 'Profiel',
    nav_admin: 'Beheer',
    nav_cart: 'Winkelwagen',
    nav_login: 'Inloggen',
    nav_logout: 'Uitloggen',
    nav_search: 'Zoek koffie...',

    hero_title: 'Colombiaanse groene koffie, rechtstreeks geëxporteerd vanuit de oorsprong',
    hero_subtitle: 'Excelso EP, zeef 14+, SCA 84+ gecupt door een Q-Grader. Gewassen Castillo, Colombia en Caturra uit Huila, Cauca, Valle del Cauca, Nariño en Quindío. Monsters per koerier, luchtvracht tot 60 kg en 20\'-containers FOB Cartagena of CIF uw haven.',
    hero_cta: 'Bekijk de specificaties',
    hero_badge: 'Direct uit Colombia · Geregistreerd exporteur',

    products_title: 'Ons Koffie Assortiment',
    products_all: 'Alle Koffie',
    products_origin: 'Herkomst',
    products_altitude: 'Hoogte',
    products_process: 'Proces',
    products_roast: 'Brandingsgraad',
    products_flavor_notes: 'Smaaknotities',
    products_add_to_cart: 'In Winkelwagen',
    products_out_of_stock: 'Niet op Voorraad',
    products_in_stock: 'Op Voorraad',
    products_weight: 'Gewicht',
    products_wholesale_price: 'Groothandelsprijs',
    products_retail_price: 'Winkelprijs',
    products_you_save: 'U bespaart',

    roast_green: 'Groen (Ongebrand)',
    roast_medium: 'Medium Branding',
    roast_medium_high: 'Medium-Hoge Branding',
    roast_decaf: 'Cafeïnevrij',

    cart_title: 'Winkelwagen',
    cart_empty: 'Uw winkelwagen is leeg',
    cart_subtotal: 'Subtotaal',
    cart_discount: 'Groothandelskorting',
    cart_total: 'Totaal',
    cart_checkout: 'Afrekenen',
    cart_remove: 'Verwijderen',
    cart_clear: 'Wagen Legen',

    auth_login: 'Inloggen',
    auth_register: 'Account Aanmaken',
    auth_email: 'E-mail',
    auth_password: 'Wachtwoord',
    auth_name: 'Volledige Naam',
    auth_phone: 'Telefoonnummer',
    auth_address: 'Straatnaam',
    auth_city: 'Stad',
    auth_postal_code: 'Postcode',
    auth_province: 'Provincie',
    auth_user_type: 'Accounttype',
    auth_retail: 'Particuliere Klant',
    auth_wholesale: 'Groothandel',
    auth_company_name: 'Bedrijfsnaam',
    auth_kvk_number: 'KVK-nummer',
    auth_login_btn: 'Inloggen',
    auth_register_btn: 'Account Aanmaken',
    auth_no_account: 'Nog geen account?',
    auth_have_account: 'Heeft u al een account?',

    profile_title: 'Mijn Profiel',
    profile_orders: 'Mijn Bestellingen',
    profile_settings: 'Accountinstellingen',
    profile_order_history: 'Bestelgeschiedenis',
    profile_no_orders: 'Nog geen bestellingen',

    admin_title: 'Beheerderspaneel',
    admin_dashboard: 'Dashboard',
    admin_products: 'Producten',
    admin_orders: 'Bestellingen',
    admin_clients: 'Klanten',
    admin_total_products: 'Totaal Producten',
    admin_total_orders: 'Totaal Bestellingen',
    admin_total_clients: 'Totaal Klanten',
    admin_revenue: 'Omzet',

    about_title: 'Ons Verhaal',
    about_origin: 'Huila, Cauca, Valle del Cauca, Nariño en Quindío — Colombia',
    about_delivery: 'Wereldwijde export vanuit Colombia',
    about_delivery_text: 'Wij exporteren Colombiaanse groene en gebrande koffie rechtstreeks naar branders en importeurs. Geleverd aan Zweden; offertes in Europa, het Midden-Oosten, Afrika en Amerika.',

    footer_tagline: 'Colombiaanse groene en gebrande koffie uit Huila, Cauca, Valle del Cauca, Nariño en Quindío — rechtstreeks geëxporteerd vanuit Bogotá.',
    footer_contact: 'Contact',
    footer_links: 'Snelle Links',
    footer_follow: 'Volg Ons',
    footer_rights: 'Alle rechten voorbehouden.',
    footer_export_markets: 'Exportmarkten',
    footer_export_markets_text: 'Geleverd aan Zweden; offertes in Europa, het Midden-Oosten, Afrika en Amerika — van koerierszendingen tot containers.',

    general_loading: 'Laden...',
    general_close: 'Sluiten',
    general_save: 'Opslaan',
    general_cancel: 'Annuleren',
    general_delete: 'Verwijderen',
    general_edit: 'Bewerken',
    general_confirm: 'Bevestigen',
    general_back: 'Terug',
    general_currency: '€',
  },

  de: {
    nav_home: 'Startseite',
    nav_green: 'Rohkaffee',
    nav_products: 'Produkte',
    nav_export: 'Export & Logistik',
    nav_faq: 'FAQ',
    nav_about: 'Über Uns',
    nav_contact: 'Kontakt',
    nav_profile: 'Profil',
    nav_admin: 'Admin',
    nav_cart: 'Warenkorb',
    nav_login: 'Anmelden',
    nav_logout: 'Abmelden',
    nav_search: 'Kaffee suchen...',

    hero_title: 'Kolumbianischer Rohkaffee, direkt vom Ursprung exportiert',
    hero_subtitle: 'Excelso EP, Sieb 14+, SCA 84+ von einem Q-Grader verkostet. Gewaschener Castillo, Colombia und Caturra aus Huila, Cauca, Valle del Cauca, Nariño und Quindío. Muster per Kurier, Luftfracht bis 60 kg und 20\'-Container FOB Cartagena oder CIF Ihr Hafen.',
    hero_cta: 'Spezifikationen ansehen',
    hero_badge: 'Direkt aus Kolumbien · Registrierter Exporteur',

    products_title: 'Unsere Kaffeeauswahl',
    products_all: 'Alle Kaffees',
    products_origin: 'Herkunft',
    products_altitude: 'Höhe',
    products_process: 'Verarbeitung',
    products_roast: 'Röstgrad',
    products_flavor_notes: 'Geschmacksnoten',
    products_add_to_cart: 'In den Warenkorb',
    products_out_of_stock: 'Nicht Vorrätig',
    products_in_stock: 'Auf Lager',
    products_weight: 'Gewicht',
    products_wholesale_price: 'Großhandelspreis',
    products_retail_price: 'Einzelhandelspreis',
    products_you_save: 'Sie sparen',

    roast_green: 'Grün (Ungeröstet)',
    roast_medium: 'Mittlere Röstung',
    roast_medium_high: 'Mittel-Kräftige Röstung',
    roast_decaf: 'Entkoffeiniert',

    cart_title: 'Warenkorb',
    cart_empty: 'Ihr Warenkorb ist leer',
    cart_subtotal: 'Zwischensumme',
    cart_discount: 'Großhandelsrabatt',
    cart_total: 'Gesamt',
    cart_checkout: 'Zur Kasse',
    cart_remove: 'Entfernen',
    cart_clear: 'Warenkorb Leeren',

    auth_login: 'Anmelden',
    auth_register: 'Konto Erstellen',
    auth_email: 'E-Mail',
    auth_password: 'Passwort',
    auth_name: 'Vollständiger Name',
    auth_phone: 'Telefonnummer',
    auth_address: 'Straße',
    auth_city: 'Stadt',
    auth_postal_code: 'Postleitzahl',
    auth_province: 'Provinz',
    auth_user_type: 'Kontotyp',
    auth_retail: 'Privatkunde',
    auth_wholesale: 'Großhändler',
    auth_company_name: 'Firmenname',
    auth_kvk_number: 'KVK-Nummer',
    auth_login_btn: 'Anmelden',
    auth_register_btn: 'Konto Erstellen',
    auth_no_account: 'Noch kein Konto?',
    auth_have_account: 'Haben Sie bereits ein Konto?',

    profile_title: 'Mein Profil',
    profile_orders: 'Meine Bestellungen',
    profile_settings: 'Kontoeinstellungen',
    profile_order_history: 'Bestellverlauf',
    profile_no_orders: 'Noch keine Bestellungen',

    admin_title: 'Admin-Dashboard',
    admin_dashboard: 'Dashboard',
    admin_products: 'Produkte',
    admin_orders: 'Bestellungen',
    admin_clients: 'Kunden',
    admin_total_products: 'Produkte Gesamt',
    admin_total_orders: 'Bestellungen Gesamt',
    admin_total_clients: 'Kunden Gesamt',
    admin_revenue: 'Umsatz',

    about_title: 'Unsere Geschichte',
    about_origin: 'Huila, Cauca, Valle del Cauca, Nariño und Quindío — Kolumbien',
    about_delivery: 'Weltweiter Export aus Kolumbien',
    about_delivery_text: 'Wir exportieren kolumbianischen Roh- und Röstkaffee direkt an Röstereien und Importeure. Geliefert nach Schweden; Angebote in Europa, dem Nahen Osten, Afrika und Amerika.',

    footer_tagline: 'Kolumbianischer Roh- und Röstkaffee aus Huila, Cauca, Valle del Cauca, Nariño und Quindío — direkt aus Bogotá exportiert.',
    footer_contact: 'Kontakt',
    footer_links: 'Schnelllinks',
    footer_follow: 'Folgen Sie Uns',
    footer_rights: 'Alle Rechte vorbehalten.',
    footer_export_markets: 'Exportmärkte',
    footer_export_markets_text: 'Geliefert nach Schweden; Angebote in Europa, dem Nahen Osten, Afrika und Amerika — von Kuriersendungen bis Containern.',

    general_loading: 'Laden...',
    general_close: 'Schließen',
    general_save: 'Speichern',
    general_cancel: 'Abbrechen',
    general_delete: 'Löschen',
    general_edit: 'Bearbeiten',
    general_confirm: 'Bestätigen',
    general_back: 'Zurück',
    general_currency: '€',
  },

  fr: {
    nav_home: 'Accueil',
    nav_green: 'Café vert',
    nav_products: 'Produits',
    nav_export: 'Export & logistique',
    nav_faq: 'FAQ',
    nav_about: 'À Propos',
    nav_contact: 'Contact',
    nav_profile: 'Profil',
    nav_admin: 'Admin',
    nav_cart: 'Panier',
    nav_login: 'Connexion',
    nav_logout: 'Déconnexion',
    nav_search: 'Rechercher du café...',

    hero_title: 'Café vert colombien, exporté directement depuis l\'origine',
    hero_subtitle: 'Excelso EP, tamis 14+, SCA 84+ noté par un Q-Grader. Castillo, Colombia et Caturra lavés de Huila, Cauca, Valle del Cauca, Nariño et Quindío. Échantillons par coursier, lots aériens jusqu\'à 60 kg et conteneurs 20\' FOB Cartagena ou CIF votre port.',
    hero_cta: 'Voir les spécifications',
    hero_badge: 'Direct de Colombie · Exportateur enregistré',

    products_title: 'Notre Sélection de Café',
    products_all: 'Tous les Cafés',
    products_origin: 'Origine',
    products_altitude: 'Altitude',
    products_process: 'Procédé',
    products_roast: 'Niveau de Torréfaction',
    products_flavor_notes: 'Notes de Dégustation',
    products_add_to_cart: 'Ajouter au Panier',
    products_out_of_stock: 'Rupture de Stock',
    products_in_stock: 'En Stock',
    products_weight: 'Poids',
    products_wholesale_price: 'Prix de Gros',
    products_retail_price: 'Prix de Détail',
    products_you_save: 'Vous économisez',

    roast_green: 'Vert (Non Torréfié)',
    roast_medium: 'Torréfaction Moyenne',
    roast_medium_high: 'Torréfaction Moyenne-Forte',
    roast_decaf: 'Décaféiné',

    cart_title: 'Panier',
    cart_empty: 'Votre panier est vide',
    cart_subtotal: 'Sous-total',
    cart_discount: 'Remise Grossiste',
    cart_total: 'Total',
    cart_checkout: 'Passer la Commande',
    cart_remove: 'Supprimer',
    cart_clear: 'Vider le Panier',

    auth_login: 'Connexion',
    auth_register: 'Créer un Compte',
    auth_email: 'E-mail',
    auth_password: 'Mot de passe',
    auth_name: 'Nom Complet',
    auth_phone: 'Téléphone',
    auth_address: 'Adresse',
    auth_city: 'Ville',
    auth_postal_code: 'Code Postal',
    auth_province: 'Province',
    auth_user_type: 'Type de Compte',
    auth_retail: 'Client Particulier',
    auth_wholesale: 'Grossiste',
    auth_company_name: "Nom de l'Entreprise",
    auth_kvk_number: 'Numéro KVK',
    auth_login_btn: 'Se Connecter',
    auth_register_btn: 'Créer le Compte',
    auth_no_account: 'Pas encore de compte ?',
    auth_have_account: 'Déjà un compte ?',

    profile_title: 'Mon Profil',
    profile_orders: 'Mes Commandes',
    profile_settings: 'Paramètres du Compte',
    profile_order_history: 'Historique des Commandes',
    profile_no_orders: 'Aucune commande pour le moment',

    admin_title: 'Tableau de Bord Admin',
    admin_dashboard: 'Tableau de Bord',
    admin_products: 'Produits',
    admin_orders: 'Commandes',
    admin_clients: 'Clients',
    admin_total_products: 'Total Produits',
    admin_total_orders: 'Total Commandes',
    admin_total_clients: 'Total Clients',
    admin_revenue: "Chiffre d'Affaires",

    about_title: 'Notre Histoire',
    about_origin: 'Huila, Cauca, Valle del Cauca, Nariño et Quindío — Colombie',
    about_delivery: 'Export mondial depuis la Colombie',
    about_delivery_text: 'Nous exportons du café vert et torréfié colombien directement aux torréfacteurs et importateurs. Livré en Suède ; devis en Europe, au Moyen-Orient, en Afrique et en Amérique.',

    footer_tagline: 'Café vert et torréfié colombien de Huila, Cauca, Valle del Cauca, Nariño et Quindío — exporté directement depuis Bogotá.',
    footer_contact: 'Contact',
    footer_links: 'Liens Rapides',
    footer_follow: 'Suivez-Nous',
    footer_rights: 'Tous droits réservés.',
    footer_export_markets: "Marchés d'exportation",
    footer_export_markets_text: 'Livré en Suède ; devis en Europe, au Moyen-Orient, en Afrique et en Amérique — du colis coursier au conteneur.',

    general_loading: 'Chargement...',
    general_close: 'Fermer',
    general_save: 'Enregistrer',
    general_cancel: 'Annuler',
    general_delete: 'Supprimer',
    general_edit: 'Modifier',
    general_confirm: 'Confirmer',
    general_back: 'Retour',
    general_currency: '€',
  },

  sv: {
    nav_home: 'Hem',
    nav_green: 'Råkaffe',
    nav_products: 'Produkter',
    nav_export: 'Export & logistik',
    nav_faq: 'FAQ',
    nav_about: 'Om Oss',
    nav_contact: 'Kontakt',
    nav_profile: 'Profil',
    nav_admin: 'Admin',
    nav_cart: 'Varukorg',
    nav_login: 'Logga In',
    nav_logout: 'Logga Ut',
    nav_search: 'Sök kaffe...',

    hero_title: 'Colombianskt råkaffe, exporterat direkt från ursprunget',
    hero_subtitle: 'Excelso EP, sikt 14+, SCA 84+ provsmakat av Q-Grader. Tvättad Castillo, Colombia och Caturra från Huila, Cauca, Valle del Cauca, Nariño och Quindío. Prover med kurir, flygfrakt upp till 60 kg och 20\'-containrar FOB Cartagena eller CIF din hamn.',
    hero_cta: 'Se specifikationerna',
    hero_badge: 'Direkt från Colombia · Registrerad exportör',

    products_title: 'Vårt Kaffeurval',
    products_all: 'Alla Kaffen',
    products_origin: 'Ursprung',
    products_altitude: 'Höjd',
    products_process: 'Process',
    products_roast: 'Rostningsgrad',
    products_flavor_notes: 'Smaknoter',
    products_add_to_cart: 'Lägg i Varukorgen',
    products_out_of_stock: 'Slut i Lager',
    products_in_stock: 'I Lager',
    products_weight: 'Vikt',
    products_wholesale_price: 'Grossistpris',
    products_retail_price: 'Detaljpris',
    products_you_save: 'Du sparar',

    roast_green: 'Grön (Orostad)',
    roast_medium: 'Mediumrostning',
    roast_medium_high: 'Medium-Hög Rostning',
    roast_decaf: 'Koffeinfritt',

    cart_title: 'Varukorg',
    cart_empty: 'Din varukorg är tom',
    cart_subtotal: 'Delsumma',
    cart_discount: 'Grossistrabatt',
    cart_total: 'Totalt',
    cart_checkout: 'Till Kassan',
    cart_remove: 'Ta Bort',
    cart_clear: 'Töm Varukorgen',

    auth_login: 'Logga In',
    auth_register: 'Skapa Konto',
    auth_email: 'E-post',
    auth_password: 'Lösenord',
    auth_name: 'Fullständigt Namn',
    auth_phone: 'Telefonnummer',
    auth_address: 'Gatuadress',
    auth_city: 'Stad',
    auth_postal_code: 'Postnummer',
    auth_province: 'Provins',
    auth_user_type: 'Kontotyp',
    auth_retail: 'Privatkund',
    auth_wholesale: 'Grossist',
    auth_company_name: 'Företagsnamn',
    auth_kvk_number: 'KVK-nummer',
    auth_login_btn: 'Logga In',
    auth_register_btn: 'Skapa Konto',
    auth_no_account: 'Har du inget konto?',
    auth_have_account: 'Har du redan ett konto?',

    profile_title: 'Min Profil',
    profile_orders: 'Mina Beställningar',
    profile_settings: 'Kontoinställningar',
    profile_order_history: 'Beställningshistorik',
    profile_no_orders: 'Inga beställningar ännu',

    admin_title: 'Admin-panel',
    admin_dashboard: 'Översikt',
    admin_products: 'Produkter',
    admin_orders: 'Beställningar',
    admin_clients: 'Kunder',
    admin_total_products: 'Totalt Produkter',
    admin_total_orders: 'Totalt Beställningar',
    admin_total_clients: 'Totalt Kunder',
    admin_revenue: 'Intäkter',

    about_title: 'Vår Historia',
    about_origin: 'Huila, Cauca, Valle del Cauca, Nariño och Quindío — Colombia',
    about_delivery: 'Världsomspännande export från Colombia',
    about_delivery_text: 'Vi exporterar colombianskt rå- och rostat kaffe direkt till rosterier och importörer. Levererat till Sverige; offerter i Europa, Mellanöstern, Afrika och Amerika.',

    footer_tagline: 'Colombianskt rå- och rostat kaffe från Huila, Cauca, Valle del Cauca, Nariño och Quindío — exporterat direkt från Bogotá.',
    footer_contact: 'Kontakt',
    footer_links: 'Snabblänkar',
    footer_follow: 'Följ Oss',
    footer_rights: 'Alla rättigheter förbehållna.',
    footer_export_markets: 'Exportmarknader',
    footer_export_markets_text: 'Levererat till Sverige; offerter i Europa, Mellanöstern, Afrika och Amerika — från kurirpaket till containrar.',

    general_loading: 'Laddar...',
    general_close: 'Stäng',
    general_save: 'Spara',
    general_cancel: 'Avbryt',
    general_delete: 'Ta Bort',
    general_edit: 'Redigera',
    general_confirm: 'Bekräfta',
    general_back: 'Tillbaka',
    general_currency: '€',
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
