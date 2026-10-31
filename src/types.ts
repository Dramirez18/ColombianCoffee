export type UserType = 'retail' | 'wholesale';

// 'en' and 'es' are fully translated and pre-rendered as static pages.
// nl/de/fr/sv keep the original UI strings and fall back to English elsewhere.
export type Language = 'en' | 'es' | 'nl' | 'de' | 'fr' | 'sv';

export type RoastLevel = 'green' | 'medium' | 'medium-high' | 'decaf';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

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

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  userType: UserType;
  role: 'user' | 'admin';
  companyName?: string;
  kvkNumber?: string; // Dutch Chamber of Commerce number
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userType: UserType;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  status: OrderStatus;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  weight: string;
}

// Public pages get their own URL and are pre-rendered (see router.ts).
// 'profile' and 'admin' are client-only legacy views.
export type Tab = 'home' | 'green' | 'profiles' | 'products' | 'export' | 'shipping' | 'faq' | 'about' | 'contact' | 'profile' | 'admin';
