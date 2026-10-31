import { Product } from './types';
import { CONTENT } from './content';

// Company facts shared by every page. Keep these consistent with content.ts,
// llms.txt and the JSON-LD in entry-server.tsx: crawlers compare them.
export const COMPANY = {
  name: 'Entre Cafés Colombianos',
  legalName: 'Entre Cafés Colombianos',
  url: 'https://www.entrecafescolombianos.coffee',
  tagline: 'Colombian Green Coffee Exporter',
  slogan: 'From the Colombian highlands to your roastery',
  regions: 'Huila · Cauca · Valle del Cauca · Nariño · Quindío',
  altitude: '1,500–1,900+ masl',
  scaScore: 'SCA 84+',
  grade: 'Excelso EP · screen 14+',
  flavorProfile: 'Panela · Mandarin · Caramel · Milk chocolate · Red fruits',
  process: 'Fully washed',
  certification: 'INVIMA registered',
  registroSanitario: 'NSA – 0006451-2019',
  founded: '2026',
  contact: {
    name: 'David Leonardo Ramírez Contreras',
    role: 'Export Manager · Founder',
    email: 'cafecolombiano889@proton.me',
    whatsapp: '+57 315 067 0591',
    whatsappE164: '+573150670591',
    whatsappLink: 'https://wa.me/573150670591',
    country: 'Colombia',
    city: 'Bogotá D.C.',
    timezone: 'GMT-5 (Bogotá)',
    languages: 'EN · ES',
  },
};

// English catalogue — the admin panel and lightbox default to it.
export const PRODUCTS: Product[] = CONTENT.en.products.items;

// Target export markets (ISO codes drive the flag icons)
export const EXPORT_MARKETS = [
  { code: 'SE', name: 'Sweden' },
  { code: 'BE', name: 'Belgium' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'DE', name: 'Germany' },
  { code: 'US', name: 'United States' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'NA', name: 'Namibia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'IL', name: 'Israel' },
  { code: 'SA', name: 'Saudi Arabia' },
];
