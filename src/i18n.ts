import { Language } from './types';

type TranslationKeys = {
  // Navigation
  nav_home: string;
  nav_products: string;
  nav_about: string;
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

const translations: Record<Language, TranslationKeys> = {
  en: {
    nav_home: 'Home',
    nav_products: 'Products',
    nav_about: 'About',
    nav_profile: 'Profile',
    nav_admin: 'Admin',
    nav_cart: 'Cart',
    nav_login: 'Login',
    nav_logout: 'Logout',
    nav_search: 'Search coffee...',

    hero_title: 'Wholesale Colombian Coffee Exporters',
    hero_subtitle: 'Specialty green coffee sourced from the Colombian Andes — Huila, Pereira and Santa Marta. SCA 84+, washed process, caramel · chocolate · red fruits. Direct supply for roasters and importers worldwide.',
    hero_cta: 'Explore Our Coffee',
    hero_badge: 'Direct from Colombia',

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

    about_title: 'Our Story',
    about_story: 'Born in the highlands of Colombia, our coffee represents generations of knowledge passed down through families of dedicated coffee farmers across Huila, Pereira and Santa Marta. Every bean tells a story of volcanic soil, ideal altitude, and meticulous care — culminating in a profile of caramel, chocolate and red fruits.',
    about_origin: 'Huila · Pereira · Santa Marta — Colombia',
    about_delivery: 'Worldwide Export from Colombia',
    about_delivery_text: 'We export specialty Colombian coffee directly to roasters and importers worldwide. Active markets: Belgium, Sweden, Netherlands, Germany, United Arab Emirates and South Africa. DHL air freight for samples, CIF for container shipments.',

    footer_tagline: 'Specialty Colombian coffee from Huila, Pereira and Santa Marta — exported worldwide.',
    footer_contact: 'Contact',
    footer_links: 'Quick Links',
    footer_follow: 'Follow Us',
    footer_rights: 'All rights reserved.',
    footer_export_markets: 'Export Markets',
    footer_export_markets_text: 'Direct export to Belgium, Sweden, Netherlands, Germany, UAE and South Africa.',

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

  nl: {
    nav_home: 'Home',
    nav_products: 'Producten',
    nav_about: 'Over Ons',
    nav_profile: 'Profiel',
    nav_admin: 'Beheer',
    nav_cart: 'Winkelwagen',
    nav_login: 'Inloggen',
    nav_logout: 'Uitloggen',
    nav_search: 'Zoek koffie...',

    hero_title: 'Groothandel Colombiaanse Koffie Exporteurs',
    hero_subtitle: 'Specialty groene koffie uit de Colombiaanse Andes — Huila, Pereira en Santa Marta. SCA 84+, gewassen proces, karamel · chocolade · rood fruit. Directe levering aan branders en importeurs wereldwijd.',
    hero_cta: 'Ontdek Onze Koffie',
    hero_badge: 'Direct uit Colombia',

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
    about_story: 'Geboren in de weelderige bergen van Huila, Colombia, vertegenwoordigt onze koffie generaties kennis doorgegeven door families van toegewijde koffieboeren. Elke boon vertelt een verhaal van vulkanische grond, perfecte hoogte en zorgvuldige verzorging.',
    about_origin: 'Huila, Colombia',
    about_delivery: 'Wereldwijde export vanuit Colombia',
    about_delivery_text: 'Wij exporteren specialty Colombiaanse koffie rechtstreeks naar branders en importeurs wereldwijd. Actieve markten: België, Zweden, Nederland, Duitsland, Verenigde Arabische Emiraten en Zuid-Afrika.',

    footer_tagline: 'Specialty Colombiaanse koffie uit Huila, Pereira en Santa Marta — wereldwijd geëxporteerd.',
    footer_contact: 'Contact',
    footer_links: 'Snelle Links',
    footer_follow: 'Volg Ons',
    footer_rights: 'Alle rechten voorbehouden.',
    footer_export_markets: 'Exportmarkten',
    footer_export_markets_text: 'Directe export naar België, Zweden, Nederland, Duitsland, VAE en Zuid-Afrika.',

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
    nav_products: 'Produkte',
    nav_about: 'Über Uns',
    nav_profile: 'Profil',
    nav_admin: 'Admin',
    nav_cart: 'Warenkorb',
    nav_login: 'Anmelden',
    nav_logout: 'Abmelden',
    nav_search: 'Kaffee suchen...',

    hero_title: 'Großhandels-Exporteur für kolumbianischen Kaffee',
    hero_subtitle: 'Specialty-Rohkaffee aus den kolumbianischen Anden — Huila, Pereira und Santa Marta. SCA 84+, gewaschener Prozess, Karamell · Schokolade · rote Früchte. Direkte Belieferung von Röstereien und Importeuren weltweit.',
    hero_cta: 'Unseren Kaffee Entdecken',
    hero_badge: 'Direkt aus Kolumbien',

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
    about_story: 'Geboren in den üppigen Bergen von Huila, Kolumbien, repräsentiert unser Kaffee Generationen von Wissen, das durch Familien engagierter Kaffeebauern weitergegeben wurde. Jede Bohne erzählt eine Geschichte von vulkanischem Boden, perfekter Höhe und sorgfältiger Pflege.',
    about_origin: 'Huila, Kolumbien',
    about_delivery: 'Weltweiter Export aus Kolumbien',
    about_delivery_text: 'Wir exportieren Specialty-Kaffee aus Kolumbien direkt an Röstereien und Importeure weltweit. Aktive Märkte: Belgien, Schweden, Niederlande, Deutschland, Vereinigte Arabische Emirate und Südafrika.',

    footer_tagline: 'Specialty-Kaffee aus Kolumbien — Huila, Pereira und Santa Marta, weltweit exportiert.',
    footer_contact: 'Kontakt',
    footer_links: 'Schnelllinks',
    footer_follow: 'Folgen Sie Uns',
    footer_rights: 'Alle Rechte vorbehalten.',
    footer_export_markets: 'Exportmärkte',
    footer_export_markets_text: 'Direktexport nach Belgien, Schweden, Niederlande, Deutschland, VAE und Südafrika.',

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
    nav_products: 'Produits',
    nav_about: 'À Propos',
    nav_profile: 'Profil',
    nav_admin: 'Admin',
    nav_cart: 'Panier',
    nav_login: 'Connexion',
    nav_logout: 'Déconnexion',
    nav_search: 'Rechercher du café...',

    hero_title: 'Exportateur en gros de café colombien',
    hero_subtitle: 'Café vert de spécialité des Andes colombiennes — Huila, Pereira et Santa Marta. SCA 84+, processus lavé, caramel · chocolat · fruits rouges. Approvisionnement direct des torréfacteurs et importateurs dans le monde entier.',
    hero_cta: 'Découvrir Notre Café',
    hero_badge: 'Direct de Colombie',

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
    auth_no_account: "Pas encore de compte ?",
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
    admin_revenue: 'Chiffre d\'Affaires',

    about_title: 'Notre Histoire',
    about_story: 'Né dans les montagnes luxuriantes de Huila, en Colombie, notre café représente des générations de savoir-faire transmis par des familles de caféiculteurs dévoués. Chaque grain raconte une histoire de sol volcanique, d\'altitude parfaite et de soins méticuleux.',
    about_origin: 'Huila, Colombie',
    about_delivery: 'Export mondial depuis la Colombie',
    about_delivery_text: 'Nous exportons du café de spécialité colombien directement aux torréfacteurs et importateurs dans le monde entier. Marchés actifs : Belgique, Suède, Pays-Bas, Allemagne, Émirats Arabes Unis et Afrique du Sud.',

    footer_tagline: 'Café colombien de spécialité de Huila, Pereira et Santa Marta — exporté dans le monde entier.',
    footer_contact: 'Contact',
    footer_links: 'Liens Rapides',
    footer_follow: 'Suivez-Nous',
    footer_rights: 'Tous droits réservés.',
    footer_export_markets: 'Marchés d\'exportation',
    footer_export_markets_text: 'Export direct vers la Belgique, la Suède, les Pays-Bas, l\'Allemagne, les EAU et l\'Afrique du Sud.',

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
    nav_products: 'Produkter',
    nav_about: 'Om Oss',
    nav_profile: 'Profil',
    nav_admin: 'Admin',
    nav_cart: 'Varukorg',
    nav_login: 'Logga In',
    nav_logout: 'Logga Ut',
    nav_search: 'Sök kaffe...',

    hero_title: 'Colombiansk Specialkaffe – Grossistexportör',
    hero_subtitle: 'Specialty råkaffe från de colombianska Anderna — Huila, Pereira och Santa Marta. SCA 84+, tvättad process, karamell · choklad · röda bär. Direkt leverans till rosterier och importörer världen över.',
    hero_cta: 'Utforska Vårt Kaffe',
    hero_badge: 'Direkt från Colombia',

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
    about_story: 'Född i de frodiga bergen i Huila, Colombia, representerar vårt kaffe generationers kunskap som förts vidare genom familjer av hängivna kaffebönder. Varje böna berättar en historia om vulkanjord, perfekt höjd och noggrann omsorg.',
    about_origin: 'Huila, Colombia',
    about_delivery: 'Världsomspännande export från Colombia',
    about_delivery_text: 'Vi exporterar specialkaffe från Colombia direkt till rosterier och importörer världen över. Aktiva marknader: Belgien, Sverige, Nederländerna, Tyskland, Förenade Arabemiraten och Sydafrika.',

    footer_tagline: 'Specialkaffe från Colombia — Huila, Pereira och Santa Marta, exporterat världen över.',
    footer_contact: 'Kontakt',
    footer_links: 'Snabblänkar',
    footer_follow: 'Följ Oss',
    footer_rights: 'Alla rättigheter förbehållna.',
    footer_export_markets: 'Exportmarknader',
    footer_export_markets_text: 'Direktexport till Belgien, Sverige, Nederländerna, Tyskland, FAE och Sydafrika.',

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
  nl: 'Nederlands',
  de: 'Deutsch',
  fr: 'Français',
  sv: 'Svenska',
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  en: '🇬🇧',
  nl: '🇳🇱',
  de: '🇩🇪',
  fr: '🇫🇷',
  sv: '🇸🇪',
};

export function t(lang: Language, key: keyof TranslationKeys): string {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

export default translations;
