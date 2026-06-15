import { Product } from './types';

export const WHOLESALE_DISCOUNT = 0.18; // 18% discount for wholesale

// Company info
export const COMPANY = {
  name: 'Entre Cafés Colombianos',
  legalName: 'Entre Cafés Colombianos SAS',
  tagline: 'Specialty Colombian Coffee Exporters',
  slogan: 'From Colombian highlands to your cup',
  regions: 'Huila · Pereira · Santa Marta (seasonal)',
  altitude: '1,500+ MASL',
  scaScore: '84+ SCA',
  flavorProfile: 'Caramel · Chocolate · Red fruits',
  process: 'Fully washed',
  certification: 'INVIMA Certified',
  registroSanitario: 'NSA – 0006451-2019',
  contact: {
    name: 'David Leonardo Ramírez Contreras',
    role: 'Export Manager · Founder',
    email: 'cafecolombiano888@proton.com',
    whatsapp: '+57 312 438 0879',
    whatsappLink: 'https://wa.me/573124380879',
    country: 'Colombia',
    city: 'Bogotá D.C.',
    timezone: 'GMT-5 (Bogotá)',
    languages: 'EN · ES',
  },
};

export const PRODUCTS: Product[] = [
  {
    id: 'green-excelso',
    name: 'Green Coffee — Excelso UGQ',
    description: 'Unroasted Colombian green coffee, Excelso grade, screen size 14+. Sourced from specialty farms in Huila, Pereira and Santa Marta at 1,500+ MASL. Washed process, moisture 11–12%, density 790–800 g/L, score 84+ SCA. Sample lot photographed: lot #84, ready for cupping and roast trials. Available for roasters and importers worldwide.',
    origin: 'Huila · Pereira · Santa Marta (seasonal)',
    roastLevel: 'green',
    price: 9.50,
    wholesaleDiscount: WHOLESALE_DISCOUNT,
    image: '/products/grano-verde.jpg',
    stock: 500,
    weight: 'Sample 250g — 500g',
    active: true,
    flavorNotes: ['Caramel', 'Chocolate', 'Red Fruits'],
    altitude: '1,500+ MASL',
    process: 'Washed',
  },
  {
    id: 'roasted-medium',
    name: 'Medium Roast — Whole Bean',
    description: 'Whole bean specialty Colombian coffee, medium roast level (Agtron 55–65). Sourced from our network of specialty farms in Huila, Pereira and Santa Marta at 1,500+ MASL, washed process and roasted to highlight a balanced sweetness. Caramel and milk chocolate forward with a soft red fruit acidity. Sample photographed: actual roast batch from our authorized roastery.',
    origin: 'Huila · Pereira · Santa Marta (seasonal)',
    roastLevel: 'medium',
    price: 13.50,
    wholesaleDiscount: WHOLESALE_DISCOUNT,
    image: '/products/grano-tostado-medio.jpg',
    stock: 200,
    weight: 'Sample 250g — 500g',
    active: true,
    flavorNotes: ['Caramel', 'Milk Chocolate', 'Red Fruits'],
    altitude: '1,500+ MASL',
    process: 'Washed',
  },
  {
    id: 'wholesale-green-bulk',
    name: 'Green Coffee — Bulk (Wholesale)',
    description: 'Bulk green coffee for roasters and importers. Excelso UGQ minimum, washed process, score 84+ SCA. Standard packaging: 70 kg jute bags or 30 kg GrainPro liners. Available FOB Cartagena / CIF Europe ports. Sample lots from 250 g; commercial orders from 1,000 kg. Pricing on request based on origin lot, volume and Incoterm.',
    origin: 'Huila · Pereira · Santa Marta (seasonal)',
    roastLevel: 'green',
    price: 0,
    wholesaleDiscount: 0,
    image: '/products/grano-verde.jpg',
    stock: 10000,
    weight: 'From 250g (sample) — From 1,000kg (bulk)',
    active: true,
    flavorNotes: ['Caramel', 'Chocolate', 'Red Fruits'],
    altitude: '1,500+ MASL',
    process: 'Washed',
  },
];

// Target export markets
export const EXPORT_MARKETS = [
  { code: 'BE', name: 'Belgium' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'DE', name: 'Germany' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'ZA', name: 'South Africa' },
];

// Kept for legacy AuthModal compatibility (Dutch retail clients).
export const DUTCH_PROVINCES = [
  'Drenthe',
  'Flevoland',
  'Friesland',
  'Gelderland',
  'Groningen',
  'Limburg',
  'Noord-Brabant',
  'Noord-Holland',
  'Overijssel',
  'Utrecht',
  'Zeeland',
  'Zuid-Holland',
];

export const ROAST_LABELS: Record<string, string> = {
  green: 'Green (Unroasted)',
  medium: 'Medium Roast',
  'medium-high': 'Medium-High Roast',
  decaf: 'Decaffeinated',
};
