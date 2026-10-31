// 'en' and 'es' are fully translated and pre-rendered as static pages.
// nl/de/fr/sv keep the original UI strings and fall back to English elsewhere.
export type Language = 'en' | 'es' | 'nl' | 'de' | 'fr' | 'sv';

export type RoastLevel = 'green' | 'medium' | 'medium-high' | 'decaf';

export interface Product {
  id: string;
  name: string;
  description: string;
  origin: string;
  roastLevel: RoastLevel;
  price: number; // EUR - retail price
  wholesaleDiscount: number; // percentage discount for wholesale (0.15 = 15%)
  image: string;
  stock: number;
  weight: string; // e.g., "250g", "1kg"
  active: boolean;
  flavorNotes: string[];
  altitude: string;
  process: string;
}

// Public pages get their own URL and are pre-rendered (see router.ts).
// 'account' and 'admin' are client-only views (customer accounts), never pre-rendered.
export type Tab = 'home' | 'green' | 'profiles' | 'products' | 'export' | 'shipping' | 'faq' | 'about' | 'contact' | 'privacy' | 'account' | 'admin';
