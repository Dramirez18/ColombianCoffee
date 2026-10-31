import { Language, Product } from './types';
import { PublicTab } from './router';
import type { ContainerProductGroup, ContainerProductId, ShippingProductGroup, ShippingProductId } from './shipping';

/**
 * Everything a buyer (or a crawler) needs to know, as plain facts.
 * English and Spanish are maintained side by side; the other UI languages
 * fall back to English for this content.
 *
 * Keep it factual: every line here may be quoted back to a customer by a
 * search engine or an AI assistant.
 */

export interface PageMeta { title: string; description: string }
export interface SpecRow { label: string; value: string }
export interface Region {
  name: string;
  altitude: string;
  harvest: string;
  varieties: string;
  cup: string;
  use: string;
}
export interface Faq { q: string; a: string }
export interface TitledText { title: string; text: string }
export interface CupProfile {
  id: 'huila' | 'selecto' | 'tolima' | 'basico';
  name: string;
  grade: string;
  subtitle: string;
  score: string;
  notes: string[];
  summary: string;
  facts: string[];
  origin: string;
  acidity: string;
  process: string;
  specsTitle: string;
  specs: SpecRow[];
  /** Nombre del mismo café en el cotizador de envío (si está ahí). */
  estimator?: string;
  /** Hoja de cata por atributo, cuando existe. */
  attributes?: { label: string; score: string; note: string }[];
}

export interface SiteContent {
  meta: Record<PublicTab, PageMeta>;
  hero: { badge: string; title: string; subtitle: string; cta: string };
  home: {
    productsEyebrow: string;
    productsTitle: string;
    productsLead: string;
    allProducts: string;
    quality: { badge: string; title: string; text: string; certLabel: string };
    why: { title: string; items: TitledText[] };
    contact: { eyebrow: string; title: string; text: string };
  };
  green: {
    eyebrow: string;
    title: string;
    lead: string;
    specsTitle: string;
    specs: SpecRow[];
    regionsTitle: string;
    regionsLead: string;
    regions: Region[];
    regionLabels: { altitude: string; harvest: string; varieties: string; cup: string; use: string };
    alsoTitle: string;
    alsoText: string;
    gradesTitle: string;
    grades: TitledText[];
    pricingTitle: string;
    pricingText: string;
  };
  products: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Product[];
    roastedTitle: string;
    roastedLead: string;
    roasted: SpecRow[];
    privateLabel: TitledText;
    domestic: TitledText;
  };
  export: {
    eyebrow: string;
    title: string;
    lead: string;
    sections: { title: string; rows: SpecRow[] }[];
    docsTitle: string;
    docs: string[];
    complianceTitle: string;
    compliance: TitledText[];
  };
  shipping: {
    eyebrow: string;
    title: string;
    lead: string;
    formTitle: string;
    modeLabel: string;
    modes: Record<'courier' | 'container', { title: string; detail: string }>;
    container: {
      coffeeLabel: string;
      groups: Record<ContainerProductGroup, string>;
      products: Record<ContainerProductId, string>;
      bagsLabel: string;
      bagsHint: string; // {min} {minKg} {full} {fullKg}
      idle: string;
      belowMin: string; // {min} {minKg}
      overLimit: string; // {full}
      perKgLine: string;
      perLbLine: string;
      totalLine: string; // {bags} {kg}
      fullNote: string;
      partialNote: string; // {full}
      disclaimer: string;
      included: string[];
      notIncluded: string[];
      paymentNote: string;
      whatsappQuote: string; // {bags} {kg} {product} {total} {perKg}
      whatsappNoPrice: string; // {bags} {product}
      emailSubject: string; // {bags} {product}
    };
    countryLabel: string;
    countryPlaceholder: string;
    otherCountry: string;
    productLabel: string;
    groups: Record<ShippingProductGroup, string>;
    products: Record<ShippingProductId, { name: string; detail: string; inText: string }>; // inText: dentro de una frase
    kgLabel: string;
    kgHint: string; // {min} {max}
    resultTitle: string;
    idle: string;
    loading: string;
    error: string;
    belowMin: string; // {min}
    overLimit: string; // {max}
    otherCountryText: string;
    coffeeLine: string; // {kg} {price}
    prepLine: string;
    freightLine: string;
    totalLine: string;
    perKgLine: string;
    boxesLine: string; // {n} {kg}
    disclaimer: string;
    includedTitle: string;
    packing: Record<ShippingProductGroup, string>;
    included: string[];
    notIncludedTitle: string;
    notIncluded: string[];
    paymentNote: string;
    notesTitle: string;
    notesLead: string;
    countryNotes: Record<string, string>;
    ctaTitle: string;
    ctaText: string;
    whatsappQuote: string; // {kg} {product} {country} {total}
    whatsappNoPrice: string; // {kg} {product} {country}
    whatsappOther: string; // {kg} {product}
    whatsappGeneric: string;
    emailSubject: string; // {kg} {product}
  };
  profiles: {
    eyebrow: string;
    title: string;
    lead: string;
    updated: string;
    compareTitle: string;
    compareLabels: { origin: string; score: string; acidity: string; process: string; presentation: string; estimator: string };
    presentation: string;
    scoreLabel: string;
    viewProfile: string;
    radarTitle: string;
    radarShapeNote: string;
    axes: string[];
    attributesTitle: string;
    attributeCols: [string, string, string];
    totalLabel: string;
    totalNote: string;
    inEstimator: string; // {name}
    onRequest: string;
    estimatorCta: string;
    quoteCta: string;
    ctaTitle: string;
    ctaText: string;
    whatsappMessage: string;
    whatsappProfile: string; // {name}
    emailSubject: string;
    greenCallout: { title: string; text: string; cta: string };
    items: CupProfile[];
  };
  faq: { eyebrow: string; title: string; lead: string; items: Faq[] };
  about: {
    title: string;
    story: string[];
    factsTitle: string;
    facts: SpecRow[];
    marketsTitle: string;
    marketsText: string;
    shippedLabel: string;
    shipped: string[];
    quotingLabel: string;
    quoting: string[];
  };
  contact: {
    title: string;
    lead: string;
    whatsapp: string;
    email: string;
    responseNote: string;
    askTitle: string;
    askItems: string[];
  };
  common: {
    pricingNote: string;
    sampleSize: string;
    altitude: string;
    process: string;
    requestQuote: string;
    requestSamples: string;
    whatsapp: string;
    email: string;
    readMore: string;
  };
}

const IMG_GREEN = '/products/grano-verde.jpg';
const IMG_ROASTED = '/products/grano-tostado-medio.jpg';

// ---------------------------------------------------------------------------
// ENGLISH
// ---------------------------------------------------------------------------
const en: SiteContent = {
  meta: {
    home: {
      title: 'Entre Cafés Colombianos | Colombian Green Coffee Exporter — Excelso EP, SCA 84+',
      description:
        'Colombian green and roasted coffee exporter in Bogotá. Excelso EP screen 14+, SCA 84+ cupped by Q-Grader, fully washed, from Huila, Cauca, Valle del Cauca, Nariño and Quindío. Samples by DHL, pallets and 20\' containers FOB Cartagena / CIF. English & Spanish.',
    },
    green: {
      title: 'Colombian Green Coffee — Excelso EP, Screen 14+, SCA 84+ | Entre Cafés Colombianos',
      description:
        'Specifications of our Colombian green coffee: Excelso European Preparation, screen 14+, Castillo/Colombia/Caturra, fully washed, 10–12% moisture, 750–800 g/L, 70 kg bags with GrainPro liner. Regions: Huila, Cauca, Valle del Cauca, Nariño, Quindío.',
    },
    products: {
      title: 'Products — Green, Roasted & Ground Colombian Coffee | Entre Cafés Colombianos',
      description:
        'Specialty green coffee (SCA 84+), commercial-grade green coffee for blends, medium-roast whole bean and ground coffee, private label. Samples from 250 g, air lots up to 60 kg, containers from 10 t.',
    },
    export: {
      title: 'Export & Logistics — Samples, Pallets, Containers, Incoterms, EUDR | Entre Cafés Colombianos',
      description:
        'How we ship Colombian coffee: DHL Express for samples and lots up to 60 kg, air cargo pallets, 20\' containers (275 × 70 kg) FOB Cartagena or CIF. Documents, FNC/Almacafé quality control, EU tariffs and EUDR traceability explained.',
    },
    shipping: {
      title: 'Shipping Estimate — Colombian Coffee Delivered by DHL Express | Entre Cafés Colombianos',
      description:
        'Estimate the delivered price of Colombian green coffee (10–60 kg) or roasted coffee (10–50 kg) by DHL Express to the US, Spain, Germany, France, the Netherlands, Belgium, Sweden, Poland or the UAE: coffee, packing and freight in one USD total. Also 20\' containers of green coffee, FOB Cartagena.',
    },
    profiles: {
      title: 'Cup Profiles — Colombian Green Coffee: Huila 86+, Selecto 84+, Tolima, Nariño | Entre Cafés Colombianos',
      description:
        'Cup profiles of the Colombian green coffees we offer: Huila (Acevedo) 86+, Selecto 84+ from Huila, Cauca, Valle del Cauca and Quindío, Tolima Castillo 81.82 and a Nariño lot at 77.0. Flavour notes, cupping scores, origin and process.',
    },
    faq: {
      title: 'FAQ — Buying Green Coffee from Colombia | Entre Cafés Colombianos',
      description:
        'Minimum order, sample policy, pricing against the NY "C" plus differential, Incoterms, transit times, documents, phytosanitary and EUDR requirements, roasting and private label. Answers from a Colombian coffee exporter.',
    },
    about: {
      title: 'About Us — Colombian Coffee Exporter in Bogotá | Entre Cafés Colombianos',
      description:
        'Entre Cafés Colombianos is a registered Colombian coffee exporter based in Bogotá, founded in 2026. We source from farming families and quality-focused suppliers in Huila, Cauca, Valle del Cauca, Nariño and Quindío and export to Europe, the Middle East, Africa and the Americas.',
    },
    contact: {
      title: 'Contact — Request Samples or a Quote | Entre Cafés Colombianos',
      description:
        'Talk to David Ramírez, export manager at Entre Cafés Colombianos, Bogotá. WhatsApp +57 315 067 0591 · cafecolombiano889@proton.me. English and Spanish. Replies within 24 hours on business days.',
    },
  },

  hero: {
    badge: 'Direct from Colombia · Registered exporter',
    title: 'Colombian green coffee, exported directly from origin',
    subtitle:
      'Excelso EP, screen 14+, SCA 84+ cupped by Q-Grader. Fully washed Castillo, Colombia and Caturra from Huila, Cauca, Valle del Cauca, Nariño and Quindío. Samples by courier, air lots up to 60 kg, and 20\' containers FOB Cartagena or CIF your port.',
    cta: 'See green coffee specs',
  },

  home: {
    productsEyebrow: 'Green · Roasted · Ground',
    productsTitle: 'What we supply',
    productsLead:
      'Specialty green coffee for roasters and importers, commercial-grade green coffee for blends, and roasted coffee for distributors and private label. Click any photo to inspect the beans.',
    allProducts: 'Full catalogue',
    quality: {
      badge: 'Quality control at origin',
      title: 'Every lot measured. Every shipment documented.',
      text:
        'Moisture, density and screen size are checked on every sample before it leaves Colombia, and every container is re-checked by Almacafé, the quality arm of the Colombian Coffee Growers Federation (FNC), before loading. Pictured: an actual reading from a recent green lot — 10.9% moisture and 797 g/L density, within Excelso specification. A signed Q-Grader cupping sheet travels with every specialty lot.',
      certLabel: 'Sanitary registration',
    },
    why: {
      title: 'Why buy from Entre Cafés Colombianos',
      items: [
        {
          title: 'Registered exporter, not a broker',
          text:
            'We are registered with the Colombian Coffee Growers Federation (FNC) and the tax authority (DIAN) and handle the whole export file ourselves: sale announcement, transit guide, Almacafé inspection, coffee contribution and customs clearance.',
        },
        {
          title: 'Specialty grade, verified',
          text:
            'Our export standard is Excelso EP, screen 14+, 84+ SCA points cupped by a certified Q-Grader. Commercial grade (SCA 80–83) is available for blends when the price matters more than the score.',
        },
        {
          title: 'Right-sized logistics',
          text:
            'From a 250 g sample by DHL to a 20\' container of 275 bags. Half containers (10 t) and mixed green/roasted loads are possible — the sizes the large trading houses do not bother with.',
        },
        {
          title: 'Straight answers on EU compliance',
          text:
            'Green coffee enters the EU at 0% duty and needs no phytosanitary certificate. For EUDR we tell you plainly which lots carry farm geolocation today and which do not.',
        },
      ],
    },
    contact: {
      eyebrow: 'B2B · Wholesale only',
      title: 'Tell us your destination, volume and timeline',
      text:
        'We work with roasters, importers, distributors and traders. Send us the port, the quantity and when you need it, and we come back with an offer sheet and samples — in English or Spanish, within 24 hours on business days.',
    },
  },

  green: {
    eyebrow: 'Green coffee · Export specification',
    title: 'Colombian green coffee — Excelso EP, screen 14+, SCA 84+',
    lead:
      'This is our standard export specification. Each lot ships with its own data sheet (variety, process, altitude, cup score, moisture, screen) and a signed cupping sheet. Anything below is confirmed per lot before you commit.',
    specsTitle: 'Standard specification',
    specs: [
      { label: 'Product', value: 'Green Arabica coffee beans, unroasted, non-decaffeinated. HS 0901.11 (Colombia 0901.11.10.00 · EU CN 0901 11 00).' },
      { label: 'Grade / preparation', value: 'Excelso, European Preparation (EP). Hulled, parchment removed. UGQ preparation available for commercial lots.' },
      { label: 'Screen size', value: 'Screen 14+ (5.5 mm), mechanically sized and electronically colour-sorted for defects. Screen 15+ or Supremo 17+ quoted on request, subject to availability.' },
      { label: 'Species / variety', value: '100% Arabica. Predominantly Castillo; Colombia, Caturra, Bourbon and Tabi appear depending on the lot and region.' },
      { label: 'Process', value: 'Fully washed (de-pulped, fermented 12–24 h, washed, sun or mechanically dried). Honey and natural microlots on request, by pre-order.' },
      { label: 'Cup score', value: '84+ points SCA, verified by a certified Q-Grader. Signed cupping sheet travels with the lot.' },
      { label: 'Cup profile', value: 'Sugarcane and panela sweetness, citric acidity (mandarin / orange), creamy body, floral aromatics; caramel, milk chocolate and red fruits in the roast. Clean, balanced cup.' },
      { label: 'Moisture', value: '10–12%. Declared per lot and re-checked by Almacafé before shipment.' },
      { label: 'Water activity', value: 'Measured per lot on request; target below 0.70 aw as the practical control against ochratoxin.' },
      { label: 'Density', value: '750–800 g/L.' },
      { label: 'Defects', value: 'Specialty preparation: maximum 5 full defects per 350 g (SCA green grading). Pre-shipment sample and type approval before loading.' },
      { label: 'Altitude', value: '1,500–1,900+ metres above sea level (lot-dependent).' },
      { label: 'Crop', value: 'Current crop. Main harvest September–December; secondary (mitaca) April–June. Cauca peaks April–July.' },
      { label: 'Packaging', value: '70 kg fique / jute bags with GrainPro-type hermetic liner. 35 kg bags and 1,000 kg big bags on request. Samples 250 g – 1 kg vacuum-sealed.' },
      { label: 'Bag marking', value: 'Lot number, origin, net weight, crop year and the ICO marks stencilled on every bag.' },
      { label: 'Shelf life', value: '12 months from shipment in hermetic liner, stored dry and cool.' },
    ],
    regionsTitle: 'Where the coffee comes from',
    regionsLead:
      'We source through farming families and quality-focused suppliers in the south and west of Colombia. Three regions anchor the offer; the others are added by harvest window and availability.',
    regions: [
      {
        name: 'Huila',
        altitude: '1,200–1,900 masl (our lots 1,500+)',
        harvest: 'Main Sep–Dec · mitaca Apr–Jun',
        varieties: 'Castillo, Colombia, Caturra',
        cup: 'Panela and sugarcane sweetness, mandarin / orange acidity, creamy body, floral finish.',
        use: 'The reference profile of the offer — the safe centre for a filter roast.',
      },
      {
        name: 'Cauca',
        altitude: '1,500–2,100 masl',
        harvest: 'Main Apr–Jul · mitaca Oct–Dec',
        varieties: 'Castillo, Colombia, Caturra, Typica',
        cup: 'Bright and high-toned: citric and floral, tea-like clarity, lighter body, long sweet aftertaste.',
        use: 'A lighter, more aromatic filter lot where acidity is the selling point.',
      },
      {
        name: 'Valle del Cauca',
        altitude: '1,300–1,900 masl',
        harvest: 'Main Sep–Dec · mitaca Apr–Jun',
        varieties: 'Castillo, Colombia, Caturra, Bourbon',
        cup: 'Rounder and sweeter: caramel and cocoa, soft acidity, medium-high body, nutty finish.',
        use: 'Espresso and blend base, where body and sweetness matter more than acidity.',
      },
    ],
    regionLabels: { altitude: 'Altitude', harvest: 'Harvest', varieties: 'Varieties', cup: 'Cup', use: 'Best for' },
    alsoTitle: 'Also sourced',
    alsoText:
      'Nariño (1,650–1,800 masl, limited lots), Quindío, Tolima, Risaralda (Pereira) and the Sierra Nevada de Santa Marta (seasonal). Single-region lots are offered when the harvest allows; otherwise we offer a departmental blend and say so on the offer sheet.',
    gradesTitle: 'Grades we quote',
    grades: [
      {
        title: 'Specialty — SCA 84+',
        text: 'Excelso EP, screen 14+, Q-Grader cupped. For specialty roasters and importers who need a documented score and a consistent profile.',
      },
      {
        title: 'Commercial — SCA 80–83',
        text: 'Excelso / UGQ preparation, screen 14+, clean cup without a specialty claim. For blends, private label and roasters buying on price, priced against the market differential.',
      },
      {
        title: 'Microlots — on request',
        text: 'Single-farm lots, Bourbon, honey or natural process, in small quantities and by pre-order. Availability depends on the harvest.',
      },
    ],
    pricingTitle: 'How we price',
    pricingText:
      'Container business is priced against the New York "C" contract plus a differential agreed on the contract date, FOB Cartagena or CIF your port — the way Colombian coffee is traded. Courier lots of 10–60 kg are priced per kilogram, with freight as its own line, and our online shipping estimator gives you the delivered price instantly. For a 20\' container the estimator gives an indicative FOB Cartagena price; because the market moves daily, the firm price goes in a dated offer sheet.',
  },

  products: {
    eyebrow: 'Wholesale catalogue',
    title: 'Products',
    lead:
      'Green coffee is our core business; roasted and ground coffee are supplied for distributors, private label and the Colombian market. Courier lots have an instant delivered estimate; containers are priced on request by origin lot, volume and Incoterm.',
    items: [
      {
        id: 'green-specialty',
        name: 'Specialty green coffee — Excelso EP, SCA 84+',
        description:
          'Unroasted Colombian Arabica, Excelso European Preparation, screen 14+, fully washed, 84+ SCA points cupped by Q-Grader. Castillo, Colombia and Caturra from Huila, Cauca, Valle del Cauca, Nariño and Quindío. Moisture 10–12%, density 750–800 g/L. 70 kg bags with GrainPro liner. Samples 250 g – 1 kg; air lots up to 60 kg; containers from 10 t.',
        origin: 'Huila · Cauca · Valle del Cauca · Nariño · Quindío',
        roastLevel: 'green',
        price: 0,
        wholesaleDiscount: 0,
        image: IMG_GREEN,
        stock: 10000,
        weight: 'Samples 250 g – 1 kg · lots from 10 kg · containers 10–19.25 t',
        active: true,
        flavorNotes: ['Panela', 'Mandarin', 'Caramel', 'Milk chocolate', 'Red fruits'],
        altitude: '1,500–1,900+ masl',
        process: 'Fully washed',
      },
      {
        id: 'green-commercial',
        name: 'Commercial green coffee — Excelso / UGQ, SCA 80–83',
        description:
          'Clean, sound Colombian green coffee for blends, private label and volume roasting. Excelso or UGQ preparation, screen 14+, fully washed, moisture 10–12%. Containers are priced against the market differential, FOB Cartagena or CIF; courier lots on request. By sea, from a half container (10 t, 143 bags) to full 20\' containers (275 bags × 70 kg).',
        origin: 'Departmental blend — Huila, Cauca, Valle del Cauca, Quindío',
        roastLevel: 'green',
        price: 0,
        wholesaleDiscount: 0,
        image: IMG_GREEN,
        stock: 10000,
        weight: 'Courier lots on request · by sea from 10 t (half 20\') · 19.25 t per full 20\' container',
        active: true,
        flavorNotes: ['Caramel', 'Chocolate', 'Mild citrus'],
        altitude: '1,300–1,900 masl',
        process: 'Fully washed',
      },
      {
        id: 'roasted-medium',
        name: 'Roasted coffee — whole bean or ground, medium roast',
        description:
          'Specialty Colombian coffee roasted to order in Bogotá by our partner roastery. Medium (Agtron 55–65) or medium-high (45–55) profile; caramel and milk chocolate with soft red-fruit acidity. Whole bean or ground for filter / espresso. Vacuum bags with one-way valve, 250 g, 500 g and 1 kg; wholesale 5–25 kg. Shipped 1–5 days after roasting. Private label available.',
        origin: 'Huila · Cauca · Valle del Cauca',
        roastLevel: 'medium',
        price: 0,
        wholesaleDiscount: 0,
        image: IMG_ROASTED,
        stock: 500,
        weight: '250 g · 500 g · 1 kg · wholesale 5–25 kg',
        active: true,
        flavorNotes: ['Caramel', 'Milk chocolate', 'Red fruits'],
        altitude: '1,500+ masl',
        process: 'Washed · roasted to order',
      },
    ],
    roastedTitle: 'Roasted coffee — specification',
    roastedLead: 'Roasted in Bogotá on demand, so it leaves Colombia fresh. Profiles can be set to your brief.',
    roasted: [
      { label: 'Roast level', value: 'Medium (Agtron 55–65) as standard · medium-high (Agtron 45–55) or lighter on request.' },
      { label: 'Format', value: 'Whole bean or ground (filter, espresso, French press).' },
      { label: 'Packaging', value: 'Vacuum-sealed multilayer bags with one-way valve: 250 g, 500 g, 1 kg. Wholesale 5–25 kg. Unbranded bags for your own label.' },
      { label: 'Freshness', value: 'Roasted per order, shipped 1–5 days after roasting. Best within 60 days of roast; 12 months sealed shelf life.' },
      { label: 'Export size', value: 'Up to 50 kg roasted per courier shipment under the FNC small-quantity regime; larger volumes as ordinary export by air or sea.' },
      { label: 'EU duty', value: 'Roasted coffee pays 7.5% MFN in the EU; 0% with the EU–Colombia origin declaration, which we provide.' },
    ],
    privateLabel: {
      title: 'Private label and custom profiles',
      text:
        'We roast and pack to your brief — profile, grind, bag size, printed or unprinted — and ship under your brand. Minimums depend on bag format; ask for the current schedule.',
    },
    domestic: {
      title: 'Sales within Colombia',
      text:
        'We also supply roasted and ground coffee to cafés, offices and companies in Colombia (250 g, 500 g, 1 kg and bulk), invoiced electronically in pesos. Contact us from Bogotá by WhatsApp.',
    },
  },

  export: {
    eyebrow: 'Export & logistics',
    title: 'From a sample to a container — how we ship',
    lead:
      'We handle the Colombian side end to end: purchase, milling and quality control, the coffee export file with the FNC, customs and freight booking. You tell us the port and the Incoterm.',
    sections: [
      {
        title: 'Shipment sizes',
        rows: [
          { label: 'Offer samples', value: '250 g – 1 kg per profile, vacuum-sealed, by DHL Express. For qualified buyers the offer sample is on us; you cover the courier.' },
          { label: 'Small lots by courier', value: 'Up to 60 kg of green or 50 kg of roasted coffee per shipment under the FNC small-quantity regime. DHL Express door to door, 5–8 business days worldwide, tracked.' },
          { label: 'Pallets', value: '100–1,000 kg by consolidated air cargo (DHL Global Forwarding) or LCL sea freight. Export file, transit guide and coffee contribution handled by us.' },
          { label: 'Containers', value: '20\' FCL: 275 bags × 70 kg ≈ 19.25 t. Half container: 10 t = 143 bags. Mixed green / roasted loads possible. Multi-container on forward contract.' },
        ],
      },
      {
        title: 'Terms and routing',
        rows: [
          { label: 'Incoterms 2020', value: 'DAP your address (courier lots, DHL Express) · EXW / FCA Bogotá (courier and air) · FOB Cartagena or Santa Marta · CFR / CIF destination port.' },
          { label: 'Ports of loading', value: 'Cartagena (Contecar) or Santa Marta on the Caribbean — direct services to northern Europe and the Mediterranean.' },
          { label: 'Destinations quoted', value: 'Gothenburg, Hamburg, Antwerp, Rotterdam, Valencia, Cape Town, Walvis Bay, Ashdod, Jebel Ali and US East Coast, among others.' },
          { label: 'Transit', value: 'Courier 5–8 business days. Sea freight 18–35 days depending on route and transhipment.' },
          { label: 'Lead time', value: 'Courier lots: 1–2 weeks from payment. Containers: typically 4–6 weeks from contract to loading (milling, Almacafé inspection and booking).' },
          { label: 'Payment', value: 'Samples and courier lots: in advance by bank transfer. Containers: deposit on contract with the balance against documents, or a confirmed letter of credit. Invoiced in USD.' },
          { label: 'Pricing', value: 'Containers: NY "C" plus an agreed differential, fixed at contract, with an indicative FOB Cartagena price for a 20\' container in the online estimator. Courier lots: per kilogram, freight as its own line; the online shipping estimator gives the delivered price instantly. Every offer carries its own validity period.' },
        ],
      },
    ],
    docsTitle: 'Documents with every shipment',
    docs: [
      'Commercial invoice (electronic, DIAN-authorised) and packing / weight list',
      'Bill of lading or air waybill',
      'ICO certificate of origin; EU–Colombia origin declaration for roasted coffee (0% duty)',
      'Lot data sheet and signed Q-Grader cupping sheet (specialty lots)',
      'Almacafé quality certificate and FNC transit guide (container shipments)',
      'Phytosanitary certificate (ICA) when the destination requires it — the EU does not for green beans',
      'Insurance certificate under CIF',
    ],
    complianceTitle: 'Compliance, plainly',
    compliance: [
      {
        title: 'Colombian export file',
        text:
          'Registered coffee exporter with the Colombian Coffee Growers Federation (FNC) and DIAN. Each export carries a sale announcement on the Portal Cafetero, an FNC transit guide, Almacafé weight and quality inspection, payment of the coffee contribution and the customs export declaration (SAE). We do all of it; no forwarder can.',
      },
      {
        title: 'EU import: tariffs and plant health',
        text:
          'Green coffee enters the European Union at 0% duty for all origins, with no certificate of origin required. Roasted coffee pays 7.5% unless covered by the EU–Colombia trade agreement, so we issue the origin declaration. No phytosanitary certificate is required for green beans (they fall outside Annex XI of Regulation (EU) 2019/2072); we issue one through ICA where another destination asks for it.',
      },
      {
        title: 'EUDR deforestation regulation',
        text:
          'The EU Deforestation Regulation requires geolocation of every plot (polygons above 4 ha), production dates and a no-deforestation-after-31-Dec-2020 statement, with the importer filing the due-diligence statement in TRACES. We are building plot-level data with our suppliers for EU-bound lots and state on every offer sheet whether a lot carries farm geolocation today. We will not sell you a lot as EUDR-ready unless the data exists.',
      },
      {
        title: 'Food safety',
        text:
          'INVIMA sanitary registration NSA-0006451-2019 for roasted products. Moisture controlled at 10–12% and water activity measured on request to keep ochratoxin risk down. Coffee is never fumigated.',
      },
    ],
  },

  shipping: {
    eyebrow: 'Shipping estimate',
    title: 'What will it cost to get Colombian coffee to your door?',
    lead:
      'Pick your country, the coffee and the quantity. You get the delivered price — coffee, packing and DHL Express freight — in US dollars, instantly. For courier lots of 10 to 60 kg of green or 10 to 50 kg of roasted coffee, and for 20\' containers of green coffee FOB Cartagena.',
    formTitle: 'Your shipment',
    modeLabel: 'Shipment type',
    modes: {
      courier: { title: 'Courier lot', detail: '10–60 kg green or 10–50 kg roasted · DHL Express to your door (DAP)' },
      container: { title: '20\' container', detail: '100–275 bags of 70 kg · green coffee · FOB Cartagena' },
    },
    container: {
      coffeeLabel: 'Green coffee',
      groups: { standard: 'Washed and decaf', process: 'Honey, natural and fermented', variety: 'Rare varieties' },
      products: {
        'washed-79': 'Commercial washed · SCA 79',
        'washed-81-antioquia': 'Washed · SCA 81 · Antioquia',
        'washed-82': 'Washed · SCA 82',
        'washed-84-antioquia': 'Washed · SCA 84 · Antioquia',
        'decaf-84': 'Decaf (washed) · SCA 84',
        'honey-yellow-85': 'Yellow honey · SCA 85.5',
        'fermented-85': 'Extended fermentation · SCA 85.5',
        'honey-red-86': 'Red honey · SCA 86',
        'fermented-86': 'Extended fermentation · SCA 86+',
        'honey-black-86': 'Black honey · SCA 86.5',
        'natural-86': 'Natural · SCA 86.5',
        'natural-87': 'Natural · SCA 87',
        'chiroso-87': 'Chiroso variety, washed · SCA 87',
        'pink-bourbon-87': 'Pink Bourbon, washed · SCA 87.5',
        'geisha-88': 'Geisha, honey · SCA 88.5',
        'wush-wush-89': 'Wush Wush, natural · SCA 89',
      },
      bagsLabel: 'Quantity (70 kg bags)',
      bagsHint: 'From {min} bags ({minKg} kg) to {full} bags ({fullKg} kg), a full 20\' container. The fuller the container, the lower the price per kilogram.',
      idle: 'Choose a coffee and the number of bags to see the FOB price.',
      belowMin: 'Container prices start at {min} bags ({minKg} kg). For smaller lots, use the courier option or write to us.',
      overLimit: 'Above {full} bags you need more than one 20\' container — write to us for a multi-container quote.',
      perKgLine: 'Price per kilogram, FOB Cartagena',
      perLbLine: 'Price per pound',
      totalLine: 'Total FOB Cartagena · {bags} bags ({kg} kg)',
      fullNote: 'Full 20\' container: the best price per kilogram.',
      partialNote: 'Partial container. Fill it to {full} bags for the best price per kilogram — you can mix coffees to complete it.',
      disclaimer:
        'Indicative estimate in US dollars, not a binding offer. Green coffee prices move with the market every day; we confirm the price and its validity in a dated offer sheet.',
      included: [
        'Green coffee in 70 kg export bags (hermetic liner on request)',
        'Colombian export file: FNC coffee contribution, Almacafé quality certificate, customs export declaration and certificate of origin',
        'Inland transport to Cartagena, container stuffing, port handling and bill of lading',
        'FOB Cartagena (Incoterms 2020): the coffee is delivered on board at Cartagena',
      ],
      notIncluded: [
        'Ocean freight and insurance — we quote CFR / CIF to your port on request',
        'Destination port charges, import duties and taxes',
        'Any registration your country requires from the importer — see the import notes below',
      ],
      paymentNote:
        'Deposit on contract and balance against documents, or a confirmed letter of credit. Typically 4–6 weeks from contract to loading. For EU-bound lots, EUDR farm geolocation is confirmed lot by lot in the offer.',
      whatsappQuote: 'Hi, I would like a quote for {bags} bags ({kg} kg) of green coffee, {product}, FOB Cartagena. Website estimate: {total} ({perKg}/kg).',
      whatsappNoPrice: 'Hi, I would like a quote for {bags} bags of green coffee, {product}, FOB Cartagena.',
      emailSubject: 'Container quote — {bags} bags, {product}',
    },
    countryLabel: 'Destination country',
    countryPlaceholder: 'Select a country…',
    otherCountry: 'Another country',
    productLabel: 'Coffee',
    groups: { green: 'Green coffee', roasted: 'Roasted coffee' },
    products: {
      'green-basic': { name: 'Basic green coffee', detail: 'Nariño · washed · cup score 77.0 · see its cup profile', inText: 'basic green coffee' },
      'green-excelso': { name: 'Excelso green coffee', detail: 'Selecto: Huila, Cauca, Valle, Quindío · Excelso EP · SCA 84+', inText: 'Excelso green coffee' },
      'green-supremo': { name: 'Supremo green coffee', detail: 'Huila · Acevedo, 1,580 masl · washed · SCA 86+', inText: 'Supremo green coffee' },
      'roasted-castillo': { name: 'Castillo roasted coffee', detail: 'Whole bean · medium roast · 1 kg valve bags, unbranded', inText: 'Castillo roasted coffee' },
      'roasted-bourbon': { name: 'Bourbon roasted coffee', detail: 'Bourbon varieties · whole bean · 1 kg valve bags, unbranded', inText: 'Bourbon roasted coffee' },
      'roasted-fermented': { name: 'Special-fermentation roasted coffee', detail: 'Coconut, strawberry, tobacco and other fermentations · whole bean · 1 kg valve bags', inText: 'special-fermentation roasted coffee' },
    },
    kgLabel: 'Quantity (kg, net)',
    kgHint: 'From {min} to {max} kg for this coffee. For samples of 250 g – 1 kg, write to us.',
    resultTitle: 'Your estimate',
    idle: 'Select a destination and a quantity to see the delivered price.',
    loading: 'Calculating…',
    error: 'We could not calculate the estimate right now. Write to us and we will quote it by hand.',
    belowMin: 'The minimum per shipment is {min} kg. For samples of 250 g – 1 kg, write to us on WhatsApp.',
    overLimit:
      'Above {max} kg this coffee no longer ships as a courier lot. Pallets by air cargo and containers by sea are quoted case by case — write to us.',
    otherCountryText:
      'We ship worldwide with DHL Express. Tell us your country and quantity and we will send you an exact quote.',
    coffeeLine: 'Coffee · {kg} kg × {price}/kg',
    prepLine: 'Packing and export preparation',
    freightLine: 'DHL Express freight, door to door',
    totalLine: 'Total delivered (DAP)',
    perKgLine: 'Per kilogram, delivered',
    boxesLine: 'Ships in {n} box(es), about {kg} kg gross.',
    disclaimer:
      'Indicative estimate in US dollars, not a binding offer. Our prices are set in Colombian pesos and converted at the official exchange rate of the day, and the DHL fuel surcharge changes every week; we confirm the final price in a written proforma.',
    includedTitle: 'What the price includes',
    packing: {
      green: 'The coffee packed for export: GrainPro-type hermetic liners inside boxes of up to 24 kg',
      roasted: 'The coffee packed for export: 1 kg bags with a one-way degassing valve inside boxes of up to 24 kg',
    },
    included: [
      'Colombian export paperwork under the FNC small-quantity regime, commercial invoice and packing list',
      'DHL Express Worldwide freight, door to door and tracked — 5–8 business days',
      'Delivered at place (DAP): the coffee arrives at your address',
    ],
    notIncludedTitle: 'What it does not include',
    notIncluded: [
      'Import duties, VAT and customs-clearance fees at destination — the importer pays them',
      'The DHL remote-area surcharge, if your postcode has one — we check it before the proforma',
      'Any registration your country requires from the importer — see the import notes below',
      'Bank fees on your transfer',
    ],
    paymentNote:
      'Payment in advance by bank transfer, invoiced in USD. Lead time 1–2 weeks from payment (for the United States, once the FDA registration is confirmed).',
    notesTitle: 'Import notes by country',
    notesLead: 'What the importer needs on arrival. Selecting a country above opens its note.',
    countryNotes: {
      US: 'Coffee for the United States must be roasted and packed — or, for green coffee, milled and stored — in a facility registered with the FDA. We ship to the US only once that registration is confirmed for your lot, and we give you the date in the proforma. Every shipment needs FDA Prior Notice, which we arrange with you or your customs broker. As importer you must comply with the Foreign Supplier Verification Program (FSVP) and have a DUNS number. Roasted coffee in retail bags needs English labels with the net weight in ounces and grams. US import duty on green and roasted coffee is 0%.',
      DE: 'Green coffee enters the EU at 0% duty; roasted coffee pays 7.5% unless the EU–Colombia origin declaration applies, which we issue. Import VAT is charged at the German rate and paid by the importer. To import commercially you need an EORI number and, to resell, registration as a food business with the local authority.',
      BE: 'Green coffee enters the EU at 0% duty; roasted coffee pays 7.5% unless the EU–Colombia origin declaration applies, which we issue. Import VAT is charged at the Belgian rate and paid by the importer. To import commercially you need an EORI number and, to resell, registration as a food business with the national food authority.',
      ES: 'Green coffee enters the EU at 0% duty; roasted coffee pays 7.5% unless the EU–Colombia origin declaration applies, which we issue. Spain charges import VAT of about 10% on coffee and applies an official food-import control (AGRIM) that DHL handles. To resell you need an EORI number and a food-business registration (RGSEAA).',
      FR: 'Green coffee enters the EU at 0% duty; roasted coffee pays 7.5% unless the EU–Colombia origin declaration applies, which we issue. Import VAT is charged at the French rate and paid by the importer. To import commercially you need an EORI number and, to resell, registration as a food business with the local authority.',
      NL: 'Green coffee enters the EU at 0% duty; roasted coffee pays 7.5% unless the EU–Colombia origin declaration applies, which we issue. Import VAT is charged at the Dutch rate and paid by the importer. To import commercially you need an EORI number and, to resell, registration as a food business with the national food authority.',
      PL: 'Green coffee enters the EU at 0% duty; roasted coffee pays 7.5% unless the EU–Colombia origin declaration applies, which we issue. Import VAT is charged at the Polish rate and paid by the importer. To import commercially you need an EORI number and, to resell, registration as a food business with the sanitary authority.',
      SE: 'Green coffee enters the EU at 0% duty; roasted coffee pays 7.5% unless the EU–Colombia origin declaration applies, which we issue. Import VAT is charged at the Swedish rate and paid by the importer. To import commercially you need an EORI number and, to resell, registration as a food business with the local authority.',
      AE: 'In the UAE the importer normally needs a food-trade licence and has to register each product and label with the local food authority (in Abu Dhabi, ADAFSA), with Arabic labelling. Check this before you order.',
    },
    ctaTitle: 'Ready to order, or need an exact quote?',
    ctaText:
      'Send this estimate to David on WhatsApp or by email and we will reply with a written proforma within 24 hours on business days.',
    whatsappQuote: 'Hi, I would like a quote for {kg} kg of {product} delivered to {country}. Website estimate: {total} (DAP).',
    whatsappNoPrice: 'Hi, I would like a quote for {kg} kg of {product} delivered to {country}.',
    whatsappOther: 'Hi, I would like a shipping quote for {kg} kg of {product} to my country: ',
    whatsappGeneric: 'Hi, I would like a shipping quote for Colombian coffee.',
    emailSubject: 'Shipping quote — {kg} kg of {product}',
  },

  profiles: {
    eyebrow: 'Green coffee · cup profiles',
    title: 'Cup profiles of the coffees we offer',
    lead:
      'Four Colombian green coffees, each with its cup profile, cupping score, origin and process. All of them are green coffee — unroasted beans, ready for your roaster.',
    updated: 'Updated 31 October 2026',
    compareTitle: 'At a glance',
    compareLabels: { origin: 'Origin', score: 'Cup score', acidity: 'Acidity', process: 'Process', presentation: 'Presentation', estimator: 'In the shipping estimate' },
    presentation: 'Green coffee (unroasted)',
    scoreLabel: 'cup score',
    viewProfile: 'See the full profile',
    radarTitle: 'Cupping attributes',
    radarShapeNote: 'Profile shape from the lot’s technical sheet; attribute scores are not published.',
    axes: ['Fragrance & aroma', 'Flavour', 'Aftertaste', 'Acidity', 'Body', 'Uniformity', 'Balance', 'Clean cup', 'Sweetness', 'Overall'],
    attributesTitle: 'Cupping sheet',
    attributeCols: ['Attribute', 'Score', 'Cupper’s notes'],
    totalLabel: 'Cupping score',
    totalNote: 'Sum of the ten attributes',
    inEstimator: 'In the shipping estimate as “{name}”',
    onRequest: 'Quoted on request',
    estimatorCta: 'Estimate a shipment',
    quoteCta: 'Ask for a quote',
    ctaTitle: 'Cup them yourself',
    ctaText:
      'We send offer samples of 250–500 g per profile by DHL Express. Tell us which coffees you would like to cup and where to send them.',
    whatsappMessage: 'Hi, I would like samples of your green coffees. These profiles interest me: ',
    whatsappProfile: 'Hi, I would like a quote for your {name} green coffee.',
    emailSubject: 'Green coffee samples — cup profiles',
    greenCallout: {
      title: 'Cup profiles of our current coffees',
      text: 'Huila 86+, Selecto 84+, Tolima and a Nariño lot: flavour notes, cupping scores, origin and process, side by side.',
      cta: 'See the cup profiles',
    },
    items: [
      {
        id: 'huila',
        name: 'Huila',
        grade: 'Supremo',
        subtitle: 'Acevedo, Huila · 1,580 masl',
        score: '86+',
        notes: ['Citrus', 'Panela', 'Floral', 'Aromatic'],
        summary:
          'A citrus, aromatic cup with panela sweetness and floral notes. Clean, uniform, balanced and sweet — those four attributes reach the top of the scale.',
        facts: ['Green coffee · washed', '48 h fermentation in the cherry and 48 h after pulping', 'Dried for 10 to 12 days'],
        origin: 'Acevedo, Huila',
        acidity: 'Citrus',
        process: 'Washed',
        specsTitle: 'Origin and process',
        specs: [
          { label: 'Department', value: 'Huila' },
          { label: 'Municipality', value: 'Acevedo' },
          { label: 'Altitude', value: '1,580 masl' },
          { label: 'Presentation', value: 'Green coffee (unroasted)' },
          { label: 'Process', value: 'Washed' },
          { label: 'Fermentation in the cherry', value: '48 hours' },
          { label: 'Fermentation after pulping', value: '48 hours' },
          { label: 'Drying', value: '10 to 12 days' },
        ],
        estimator: 'Supremo green coffee',
      },
      {
        id: 'selecto',
        name: 'Selecto',
        grade: 'Excelso EP',
        subtitle: 'Huila · Cauca · Valle del Cauca · Quindío',
        score: '84+',
        notes: ['Sugarcane', 'Panela', 'Mandarin', 'Orange', 'Creamy body', 'Aromatic', 'Floral'],
        summary:
          'A sweet, aromatic cup: sugarcane and panela, citrus acidity with mandarin or orange notes, creamy body and floral notes. Clean, balanced and long-lasting. Scored by a Q-Grader cupper.',
        facts: ['Green coffee · mainly Castillo', 'Beans above screen 14', 'Electronic defect sorting'],
        origin: 'Huila, Cauca, Valle del Cauca and Quindío',
        acidity: 'Citrus, with mandarin or orange notes',
        process: 'Washed',
        specsTitle: 'Origin and specification',
        specs: [
          { label: 'Origin', value: 'Huila, Cauca, Valle del Cauca and Quindío, blended according to the harvest' },
          { label: 'Variety', value: 'Mainly Castillo' },
          { label: 'Presentation', value: 'Green coffee (unroasted), 100% Arabica' },
          { label: 'Bean size', value: 'Above screen 14' },
          { label: 'Sorting', value: 'Mechanical screening and electronic defect sorting' },
          { label: 'Moisture', value: 'Checked before every lot' },
          { label: 'Evaluation', value: 'Above 84 SCA points, scored by a Q-Grader cupper' },
        ],
        estimator: 'Excelso green coffee',
      },
      {
        id: 'tolima',
        name: 'Tolima',
        grade: 'UGQ export grade',
        subtitle: 'Tolima · washed Castillo',
        score: '81.82',
        notes: ['Cocoa', 'Panela', 'Sugarcane', 'Chocolate', 'Caramel', 'Medium citrus acidity'],
        summary:
          'A straightforward, sweet cup: cocoa, panela, sugarcane, chocolate and caramel, with medium citrus acidity. Simple rather than complex — made for blends or an everyday espresso.',
        facts: ['Green coffee · UGQ export grade', 'Moisture 10 to 12%'],
        origin: 'Tolima',
        acidity: 'Medium citrus',
        process: 'Washed',
        specsTitle: 'Origin and process',
        specs: [
          { label: 'Department', value: 'Tolima' },
          { label: 'Variety', value: 'Castillo' },
          { label: 'Process', value: 'Washed' },
          { label: 'Presentation', value: 'Green coffee (unroasted), dry-milled and ready for export' },
          { label: 'Grade', value: 'UGQ export grade' },
          { label: 'Moisture', value: '10 to 12%' },
        ],
      },
      {
        id: 'basico',
        name: 'Basic',
        grade: 'Nariño lot',
        subtitle: 'Nariño · 1,650–1,800 masl',
        score: '77.0',
        notes: ['Mandarin', 'Rose honey', 'Jasmine', 'Sugarcane', 'Red fruits', 'Figs', 'Lemongrass', 'Green grape', 'Caramel'],
        summary:
          'Mandarin, rose honey and jasmine in the aroma; sugarcane, subtle red fruits, figs and lemongrass in the cup. Juicy acidity like green grape; a round, light body with a honey-like texture and a caramel finish.',
        facts: ['Green coffee · Castillo, Colombia and Caturra · washed', 'Cupped on 10 September 2026'],
        origin: 'Nariño',
        acidity: 'Juicy, like green grape',
        process: 'Washed',
        specsTitle: 'Origin and process',
        specs: [
          { label: 'Altitude', value: '1,650 to 1,800 masl' },
          { label: 'Varieties', value: 'Castillo, Colombia and Caturra' },
          { label: 'Presentation', value: 'Green coffee (unroasted)' },
          { label: 'Process', value: 'Washed' },
          { label: 'Cupping date', value: '10 September 2026' },
        ],
        attributes: [
          { label: 'Fragrance & aroma', score: '6.5', note: 'mandarin, low-intensity rose honey, subtle jasmine floral, sugarcane' },
          { label: 'Flavour', score: '7.0', note: 'sugarcane, pleasant and subtle red fruits, figs, lemongrass' },
          { label: 'Aftertaste', score: '7.0', note: 'pleasant, caramel' },
          { label: 'Acidity', score: '6.5', note: 'juicy, like green grape' },
          { label: 'Body', score: '7.0', note: 'round and light, with a slight honey-like feel' },
          { label: 'Uniformity', score: '10', note: 'OK' },
          { label: 'Balance', score: '10', note: 'OK' },
          { label: 'Clean cup', score: '10', note: 'OK' },
          { label: 'Sweetness', score: '6.0', note: 'sugarcane' },
          { label: 'Overall', score: '7.0', note: 'balanced coffee with very good body, sweet and a very stable acidity' },
        ],
        estimator: 'Basic green coffee',
      },
    ],
  },

  faq: {
    eyebrow: 'Buyer questions',
    title: 'Frequently asked questions',
    lead: 'Short, factual answers. If yours is not here, write to us — we answer in English or Spanish within 24 hours on business days.',
    items: [
      {
        q: 'What coffee do you export?',
        a: 'Colombian Arabica green coffee: specialty grade (Excelso EP, screen 14+, 84+ SCA points cupped by Q-Grader) and commercial grade (SCA 80–83) for blends. We also supply roasted whole bean and ground coffee, including private label, roasted to order in Bogotá.',
      },
      {
        q: 'What is the minimum order?',
        a: 'There is no minimum for samples (250 g – 1 kg). Courier lots run from 10 kg up to 60 kg of green or 50 kg of roasted coffee. For sea freight we work from a half container (10 t, 143 bags of 70 kg) up to a full 20\' (275 bags, about 19.25 t) and multi-container contracts.',
      },
      {
        q: 'Do you send samples, and what do they cost?',
        a: 'Yes. Offer samples of 250–500 g per profile go by DHL Express. For qualified buyers the coffee is on us and you cover the courier; larger sample lots are invoiced per kilogram with freight as its own line. A pre-shipment sample from the actual lot is sent before any container is loaded.',
      },
      {
        q: 'How do you set your prices?',
        a: 'Containers are priced against the New York "C" contract plus a differential agreed on the contract date, FOB Cartagena or CIF your port. Our online estimator shows an indicative FOB Cartagena price for a 20\' container; because the market moves daily, the firm price goes in a dated offer sheet with its own validity. Courier lots (10–60 kg of green or 10–50 kg of roasted coffee) are priced per kilogram, and you can see an instant delivered (DAP) estimate at https://www.entrecafescolombianos.coffee/shipping-estimate.',
      },
      {
        q: 'Which Incoterms do you work with?',
        a: 'DAP your address for courier lots (DHL Express, door to door), EXW and FCA Bogotá for courier and air on request, FOB Cartagena or Santa Marta for sea, and CFR or CIF to your port when you want us to carry freight and insurance.',
      },
      {
        q: 'Which ports do you ship from and to?',
        a: 'We load at Cartagena or Santa Marta on the Caribbean coast. We have quoted Gothenburg, Hamburg, Antwerp, Rotterdam, Valencia, Cape Town, Walvis Bay, Ashdod, Jebel Ali and the US East Coast; any port with a service from Cartagena can be quoted.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Courier shipments arrive in 5–8 business days worldwide. Sea freight takes 18–35 days depending on the route. Allow 4–6 weeks from contract to loading for a container: milling, Almacafé inspection and vessel booking.',
      },
      {
        q: 'Which documents come with the shipment?',
        a: 'Commercial invoice, packing list, bill of lading or air waybill, ICO certificate of origin, the lot data sheet and Q-Grader cupping sheet, the Almacafé quality certificate for containers, an insurance certificate under CIF, and a phytosanitary certificate where the destination requires one.',
      },
      {
        q: 'Do I need a phytosanitary certificate to import green coffee into the EU?',
        a: 'No. Green coffee beans are outside Annex XI of Regulation (EU) 2019/2072, so the EU asks for no phytosanitary certificate and no TRACES entry. Other destinations may ask for one, and we obtain it from ICA when they do.',
      },
      {
        q: 'Is your coffee EUDR-compliant?',
        a: 'EUDR requires plot geolocation, production dates and a no-deforestation statement, filed by the importer in TRACES. We are building plot-level data with our suppliers and state on every offer sheet whether a lot has farm geolocation. We do not describe a lot as EUDR-ready unless the data exists.',
      },
      {
        q: 'What duty does Colombian coffee pay in the EU?',
        a: 'Green coffee: 0%, for every origin, no proof of origin needed. Roasted coffee: 7.5% MFN, or 0% with the EU–Colombia origin declaration, which we issue.',
      },
      {
        q: 'Can you roast and pack under my brand?',
        a: 'Yes. Our partner roastery in Bogotá roasts to your profile and packs in 250 g, 500 g, 1 kg or wholesale bags, printed or unprinted. Roasted coffee ships 1–5 days after roasting.',
      },
      {
        q: 'Do you sell inside Colombia?',
        a: 'Yes. Roasted and ground coffee for cafés, offices and companies, in 250 g, 500 g, 1 kg and bulk, invoiced electronically in Colombian pesos. We are in Bogotá.',
      },
      {
        q: 'What are the payment terms?',
        a: 'Samples and courier lots are paid in advance by bank transfer. For containers we agree a deposit on contract with the balance against documents, or a confirmed letter of credit. Invoices are issued in US dollars.',
      },
      {
        q: 'Who are you, legally?',
        a: 'Entre Cafés Colombianos is a coffee export business registered at the Bogotá Chamber of Commerce in 2026, a registered exporter with the Colombian Coffee Growers Federation and an authorised electronic invoicer with DIAN. It is run by its founder, David Leonardo Ramírez Contreras.',
      },
    ],
  },

  about: {
    title: 'About Entre Cafés Colombianos',
    story: [
      'Entre Cafés Colombianos is a Colombian coffee exporter based in Bogotá, founded in 2026 by David Leonardo Ramírez Contreras. We buy from farming families and quality-focused suppliers in the south and west of the country — Huila, Cauca, Valle del Cauca, Nariño and Quindío — and export green and roasted coffee directly to roasters, importers and distributors.',
      'We started small and on purpose: the first shipments were roasted coffee to Sweden by courier, which taught us the full Colombian export file — FNC sale announcement, transit guide, coffee contribution, Almacafé inspection, customs — on our own account rather than through a third-party licence. That is the file we now run for every lot, from a 45 kg courier box to a container.',
      'What we offer the market is honest sizing and honest paperwork: half containers and mixed loads that the large trading houses do not bother with, a documented cup score, and a clear answer on EU rules — tariffs, plant health and EUDR — before you commit.',
    ],
    factsTitle: 'Company facts',
    facts: [
      { label: 'Legal form', value: 'Sole proprietorship (persona natural) registered at the Bogotá Chamber of Commerce, June 2026. Activity: wholesale of food products (CIIU 4631).' },
      { label: 'Exporter registration', value: 'Colombian Coffee Growers Federation (FNC). DIAN electronic invoicing authorised.' },
      { label: 'Sanitary registration', value: 'INVIMA NSA-0006451-2019 (roasted products).' },
      { label: 'Location', value: 'Bogotá D.C., Colombia · GMT-5.' },
      { label: 'Languages', value: 'English and Spanish.' },
      { label: 'Founder', value: 'David Leonardo Ramírez Contreras — export manager.' },
    ],
    marketsTitle: 'Where we ship and quote',
    marketsText:
      'Our first export market was Sweden. Since then we have quoted green and roasted coffee to buyers across Europe, the Middle East, Africa and the Americas, from courier lots to containers.',
    shippedLabel: 'Shipped',
    shipped: ['Sweden', 'Colombia (domestic)'],
    quotingLabel: 'Quoted / active enquiries',
    quoting: ['Belgium', 'Spain', 'Netherlands', 'Germany', 'United States', 'South Africa', 'Namibia', 'United Arab Emirates', 'Israel', 'Saudi Arabia'],
  },

  contact: {
    title: 'Contact',
    lead: 'One person answers: David Ramírez, export manager and founder. Write in English or Spanish.',
    whatsapp: 'WhatsApp',
    email: 'Email',
    responseNote: 'We reply within 24 hours on business days (Bogotá, GMT-5).',
    askTitle: 'To get a quote quickly, tell us',
    askItems: [
      'Destination country and port (or airport for courier lots)',
      'Quantity — kilograms, bags or containers',
      'Grade: specialty 84+, commercial, or roasted / private label',
      'Preferred Incoterm (FOB, CIF, FCA…)',
      'When you need it',
    ],
  },

  common: {
    pricingNote: 'Courier lots: instant online shipping estimate · containers: pricing on request.',
    sampleSize: 'Sizes',
    altitude: 'Altitude',
    process: 'Process',
    requestQuote: 'Request a quote',
    requestSamples: 'Request samples',
    whatsapp: 'WhatsApp',
    email: 'Email',
    readMore: 'Read more',
  },
};

// ---------------------------------------------------------------------------
// ESPAÑOL
// ---------------------------------------------------------------------------
const es: SiteContent = {
  meta: {
    home: {
      title: 'Entre Cafés Colombianos | Exportador de café verde colombiano — Excelso EP, SCA 84+',
      description:
        'Exportador de café verde y tostado en Bogotá. Excelso EP malla 14+, SCA 84+ catado por Q-Grader, lavado, de Huila, Cauca, Valle del Cauca, Nariño y Quindío. Muestras por DHL, pallets y contenedores de 20\' FOB Cartagena / CIF. Español e inglés.',
    },
    green: {
      title: 'Café verde colombiano — Excelso EP, malla 14+, SCA 84+ | Entre Cafés Colombianos',
      description:
        'Especificaciones de nuestro café verde: Excelso preparación europea, malla 14+, Castillo/Colombia/Caturra, lavado, humedad 10–12 %, 750–800 g/L, sacos de 70 kg con GrainPro. Regiones: Huila, Cauca, Valle del Cauca, Nariño, Quindío.',
    },
    products: {
      title: 'Productos — Café verde, tostado y molido | Entre Cafés Colombianos',
      description:
        'Café verde de especialidad (SCA 84+), café verde comercial para mezclas, café tostado en grano y molido, marca propia. Muestras desde 250 g, lotes aéreos hasta 60 kg, contenedores desde 10 t.',
    },
    export: {
      title: 'Exportación y logística — Muestras, pallets, contenedores, Incoterms, EUDR | Entre Cafés Colombianos',
      description:
        'Cómo despachamos café colombiano: DHL Express para muestras y lotes hasta 60 kg, pallets por carga aérea, contenedores de 20\' (275 × 70 kg) FOB Cartagena o CIF. Documentos, control de calidad FNC/Almacafé, aranceles UE y trazabilidad EUDR.',
    },
    shipping: {
      title: 'Cotizador de envío — Café colombiano entregado por DHL Express | Entre Cafés Colombianos',
      description:
        'Calcule el precio puesto en destino de café colombiano verde (10–60 kg) o tostado (10–50 kg) por DHL Express a Estados Unidos, España, Alemania, Francia, Países Bajos, Bélgica, Suecia, Polonia o Emiratos: café, empaque y flete en un solo total en USD. También contenedores de 20\' de café verde, FOB Cartagena.',
    },
    profiles: {
      title: 'Perfiles de taza — Café verde colombiano: Huila 86+, Selecto 84+, Tolima, Nariño | Entre Cafés Colombianos',
      description:
        'Perfiles de taza de los cafés verdes colombianos que ofrecemos: Huila (Acevedo) 86+, Selecto 84+ de Huila, Cauca, Valle del Cauca y Quindío, Tolima Castillo 81,82 y un lote de Nariño de 77,0. Notas en taza, puntaje de cata, origen y proceso.',
    },
    faq: {
      title: 'Preguntas frecuentes — Comprar café verde de Colombia | Entre Cafés Colombianos',
      description:
        'Pedido mínimo, muestras, precio sobre la bolsa de Nueva York más diferencial, Incoterms, tiempos de tránsito, documentos, fitosanitario y EUDR, tostión y marca propia. Respuestas de un exportador de café colombiano.',
    },
    about: {
      title: 'Nosotros — Exportador de café colombiano en Bogotá | Entre Cafés Colombianos',
      description:
        'Entre Cafés Colombianos es un exportador de café registrado, con sede en Bogotá y fundado en 2026. Compramos a familias caficultoras y proveedores de calidad en Huila, Cauca, Valle del Cauca, Nariño y Quindío y exportamos a Europa, Medio Oriente, África y América.',
    },
    contact: {
      title: 'Contacto — Solicite muestras o cotización | Entre Cafés Colombianos',
      description:
        'Hable con David Ramírez, gerente de exportaciones de Entre Cafés Colombianos, Bogotá. WhatsApp +57 315 067 0591 · cafecolombiano889@proton.me. Español e inglés. Respuesta en 24 horas hábiles.',
    },
  },

  hero: {
    badge: 'Directo de Colombia · Exportador registrado',
    title: 'Café verde colombiano, exportado directamente desde el origen',
    subtitle:
      'Excelso EP, malla 14+, SCA 84+ catado por Q-Grader. Castillo, Colombia y Caturra lavados de Huila, Cauca, Valle del Cauca, Nariño y Quindío. Muestras por courier, lotes aéreos hasta 60 kg y contenedores de 20\' FOB Cartagena o CIF en su puerto.',
    cta: 'Ver especificaciones del verde',
  },

  home: {
    productsEyebrow: 'Verde · Tostado · Molido',
    productsTitle: 'Qué suministramos',
    productsLead:
      'Café verde de especialidad para tostadores e importadores, café verde comercial para mezclas, y café tostado para distribuidores y marca propia. Haga clic en cualquier foto para ver el grano de cerca.',
    allProducts: 'Catálogo completo',
    quality: {
      badge: 'Control de calidad en origen',
      title: 'Cada lote medido. Cada despacho documentado.',
      text:
        'Humedad, densidad y malla se verifican en cada muestra antes de salir de Colombia, y cada contenedor lo revisa de nuevo Almacafé, el brazo de calidad de la Federación Nacional de Cafeteros (FNC), antes del cargue. En la foto: una lectura real de un lote verde reciente — 10,9 % de humedad y 797 g/L de densidad, dentro de la especificación Excelso. Con cada lote de especialidad viaja la hoja de catación firmada por un Q-Grader.',
      certLabel: 'Registro sanitario',
    },
    why: {
      title: 'Por qué comprar a Entre Cafés Colombianos',
      items: [
        {
          title: 'Exportador registrado, no intermediario',
          text:
            'Estamos registrados ante la Federación Nacional de Cafeteros (FNC) y la DIAN y hacemos todo el expediente de exportación nosotros mismos: anuncio de venta, guía de tránsito, inspección de Almacafé, contribución cafetera y despacho aduanero.',
        },
        {
          title: 'Grado de especialidad, verificado',
          text:
            'Nuestro estándar de exportación es Excelso EP, malla 14+, 84+ puntos SCA catados por un Q-Grader certificado. Hay grado comercial (SCA 80–83) para mezclas cuando pesa más el precio que el puntaje.',
        },
        {
          title: 'Logística a la medida',
          text:
            'Desde una muestra de 250 g por DHL hasta un contenedor de 20\' con 275 sacos. Medios contenedores (10 t) y cargas mixtas verde/tostado son posibles — los tamaños que a las grandes casas comercializadoras no les interesan.',
        },
        {
          title: 'Respuestas claras sobre la Unión Europea',
          text:
            'El café verde entra a la UE con 0 % de arancel y sin certificado fitosanitario. Para EUDR le decimos con claridad qué lotes tienen hoy geolocalización de finca y cuáles no.',
        },
      ],
    },
    contact: {
      eyebrow: 'B2B · Solo mayoristas',
      title: 'Cuéntenos destino, volumen y fecha',
      text:
        'Trabajamos con tostadores, importadores, distribuidores y traders. Envíenos el puerto, la cantidad y para cuándo lo necesita, y respondemos con una hoja de oferta y muestras — en español o inglés, en 24 horas hábiles.',
    },
  },

  green: {
    eyebrow: 'Café verde · Especificación de exportación',
    title: 'Café verde colombiano — Excelso EP, malla 14+, SCA 84+',
    lead:
      'Esta es nuestra especificación estándar de exportación. Cada lote viaja con su propia ficha (variedad, proceso, altura, puntaje de taza, humedad, malla) y su hoja de catación firmada. Todo lo que sigue se confirma lote por lote antes de que usted se comprometa.',
    specsTitle: 'Especificación estándar',
    specs: [
      { label: 'Producto', value: 'Café verde arábica en almendra, sin tostar, sin descafeinar. Partida 0901.11 (Colombia 0901.11.10.00 · UE NC 0901 11 00).' },
      { label: 'Grado / preparación', value: 'Excelso, preparación europea (EP). Trillado, sin pergamino. Preparación UGQ disponible para lotes comerciales.' },
      { label: 'Malla', value: 'Malla 14+ (5,5 mm), clasificado a máquina y seleccionado electrónicamente por defectos. Malla 15+ o Supremo 17+ se cotizan bajo pedido, según disponibilidad.' },
      { label: 'Especie / variedad', value: '100 % arábica. Predomina Castillo; Colombia, Caturra, Bourbon y Tabi aparecen según el lote y la región.' },
      { label: 'Proceso', value: 'Lavado (despulpado, fermentado 12–24 h, lavado, secado al sol o mecánico). Microlotes honey y natural bajo pedido anticipado.' },
      { label: 'Puntaje de taza', value: '84+ puntos SCA, verificados por Q-Grader certificado. La hoja de catación firmada viaja con el lote.' },
      { label: 'Perfil de taza', value: 'Dulzor de caña y panela, acidez cítrica (mandarina / naranja), cuerpo cremoso, aromas florales; caramelo, chocolate de leche y frutos rojos en la tostión. Taza limpia y balanceada.' },
      { label: 'Humedad', value: '10–12 %. Declarada por lote y verificada de nuevo por Almacafé antes del embarque.' },
      { label: 'Actividad de agua', value: 'Medida por lote bajo pedido; objetivo por debajo de 0,70 aw como control práctico frente a la ocratoxina.' },
      { label: 'Densidad', value: '750–800 g/L.' },
      { label: 'Defectos', value: 'Preparación de especialidad: máximo 5 defectos plenos por 350 g (clasificación SCA de verde). Muestra de pre-embarque y aprobación de tipo antes del cargue.' },
      { label: 'Altura', value: '1.500–1.900+ metros sobre el nivel del mar (según lote).' },
      { label: 'Cosecha', value: 'Cosecha vigente. Principal septiembre–diciembre; mitaca abril–junio. Cauca tiene su pico en abril–julio.' },
      { label: 'Empaque', value: 'Sacos de fique / yute de 70 kg con bolsa hermética tipo GrainPro. Sacos de 35 kg y big bags de 1.000 kg bajo pedido. Muestras de 250 g – 1 kg al vacío.' },
      { label: 'Marcación', value: 'Número de lote, origen, peso neto, año de cosecha y marcas OIC estarcidos en cada saco.' },
      { label: 'Vida útil', value: '12 meses desde el embarque en bolsa hermética, almacenado seco y fresco.' },
    ],
    regionsTitle: 'De dónde viene el café',
    regionsLead:
      'Compramos a través de familias caficultoras y proveedores enfocados en calidad del sur y el occidente de Colombia. Tres regiones anclan la oferta; las demás se suman según ventana de cosecha y disponibilidad.',
    regions: [
      {
        name: 'Huila',
        altitude: '1.200–1.900 msnm (nuestros lotes 1.500+)',
        harvest: 'Principal sep–dic · mitaca abr–jun',
        varieties: 'Castillo, Colombia, Caturra',
        cup: 'Dulzor de panela y caña, acidez de mandarina / naranja, cuerpo cremoso, final floral.',
        use: 'El perfil de referencia de la oferta — el centro seguro para una tostión de filtrado.',
      },
      {
        name: 'Cauca',
        altitude: '1.500–2.100 msnm',
        harvest: 'Principal abr–jul · mitaca oct–dic',
        varieties: 'Castillo, Colombia, Caturra, Typica',
        cup: 'Brillante y de tono alto: cítrico y floral, claridad tipo té, cuerpo más ligero, retrogusto dulce y largo.',
        use: 'Un lote de filtrado más ligero y aromático donde la acidez es el argumento de venta.',
      },
      {
        name: 'Valle del Cauca',
        altitude: '1.300–1.900 msnm',
        harvest: 'Principal sep–dic · mitaca abr–jun',
        varieties: 'Castillo, Colombia, Caturra, Bourbon',
        cup: 'Más redondo y dulce: caramelo y cacao, acidez suave, cuerpo medio-alto, final a nuez.',
        use: 'Base para espresso y mezclas, donde cuerpo y dulzor importan más que la acidez.',
      },
    ],
    regionLabels: { altitude: 'Altura', harvest: 'Cosecha', varieties: 'Variedades', cup: 'Taza', use: 'Ideal para' },
    alsoTitle: 'También acopiamos en',
    alsoText:
      'Nariño (1.650–1.800 msnm, lotes limitados), Quindío, Tolima, Risaralda (Pereira) y la Sierra Nevada de Santa Marta (estacional). Ofrecemos lotes de una sola región cuando la cosecha lo permite; si no, ofrecemos una mezcla departamental y lo decimos en la hoja de oferta.',
    gradesTitle: 'Grados que cotizamos',
    grades: [
      {
        title: 'Especialidad — SCA 84+',
        text: 'Excelso EP, malla 14+, catado por Q-Grader. Para tostadores e importadores de especialidad que necesitan un puntaje documentado y un perfil consistente.',
      },
      {
        title: 'Comercial — SCA 80–83',
        text: 'Preparación Excelso / UGQ, malla 14+, taza limpia sin reclamo de especialidad. Para mezclas, marca propia y tostadores que compran por precio, cotizado sobre el diferencial de mercado.',
      },
      {
        title: 'Microlotes — bajo pedido',
        text: 'Lotes de una sola finca, Bourbon, proceso honey o natural, en cantidades pequeñas y con pedido anticipado. La disponibilidad depende de la cosecha.',
      },
    ],
    pricingTitle: 'Cómo fijamos el precio',
    pricingText:
      'El negocio de contenedores se cotiza sobre el contrato "C" de Nueva York más un diferencial acordado en la fecha del contrato, FOB Cartagena o CIF en su puerto — como se comercia el café colombiano. Los lotes courier de 10 a 60 kg se cotizan por kilogramo, con el flete como línea aparte, y puede ver al instante un estimado puesto en destino en nuestro cotizador de envío. Para un contenedor de 20\' el cotizador da un precio indicativo FOB Cartagena; como el mercado se mueve a diario, el precio en firme va en una hoja de oferta con fecha.',
  },

  products: {
    eyebrow: 'Catálogo mayorista',
    title: 'Productos',
    lead:
      'El café verde es nuestro negocio principal; el tostado y el molido los suministramos a distribuidores, marca propia y el mercado colombiano. Los lotes courier tienen un estimado instantáneo puesto en destino; los contenedores se cotizan bajo solicitud según lote de origen, volumen e Incoterm.',
    items: [
      {
        id: 'green-specialty',
        name: 'Café verde de especialidad — Excelso EP, SCA 84+',
        description:
          'Arábica colombiano sin tostar, Excelso preparación europea, malla 14+, lavado, 84+ puntos SCA catados por Q-Grader. Castillo, Colombia y Caturra de Huila, Cauca, Valle del Cauca, Nariño y Quindío. Humedad 10–12 %, densidad 750–800 g/L. Sacos de 70 kg con GrainPro. Muestras de 250 g – 1 kg; lotes aéreos hasta 60 kg; contenedores desde 10 t.',
        origin: 'Huila · Cauca · Valle del Cauca · Nariño · Quindío',
        roastLevel: 'green',
        price: 0,
        wholesaleDiscount: 0,
        image: IMG_GREEN,
        stock: 10000,
        weight: 'Muestras 250 g – 1 kg · lotes desde 10 kg · contenedores 10–19,25 t',
        active: true,
        flavorNotes: ['Panela', 'Mandarina', 'Caramelo', 'Chocolate de leche', 'Frutos rojos'],
        altitude: '1.500–1.900+ msnm',
        process: 'Lavado',
      },
      {
        id: 'green-commercial',
        name: 'Café verde comercial — Excelso / UGQ, SCA 80–83',
        description:
          'Café verde colombiano limpio y sano para mezclas, marca propia y tostión en volumen. Preparación Excelso o UGQ, malla 14+, lavado, humedad 10–12 %. Los contenedores se cotizan sobre el diferencial de mercado, FOB Cartagena o CIF; lotes courier bajo solicitud. Por mar, desde medio contenedor (10 t, 143 sacos) hasta contenedores de 20\' completos (275 sacos × 70 kg).',
        origin: 'Mezcla departamental — Huila, Cauca, Valle del Cauca, Quindío',
        roastLevel: 'green',
        price: 0,
        wholesaleDiscount: 0,
        image: IMG_GREEN,
        stock: 10000,
        weight: 'Lotes courier bajo solicitud · por mar desde 10 t (medio 20\') · 19,25 t por contenedor de 20\' completo',
        active: true,
        flavorNotes: ['Caramelo', 'Chocolate', 'Cítrico suave'],
        altitude: '1.300–1.900 msnm',
        process: 'Lavado',
      },
      {
        id: 'roasted-medium',
        name: 'Café tostado — en grano o molido, tostión media',
        description:
          'Café colombiano de especialidad tostado bajo pedido en Bogotá por nuestra tostadora aliada. Perfil medio (Agtron 55–65) o medio-alto (45–55); caramelo y chocolate de leche con acidez suave de frutos rojos. En grano o molido para filtrado / espresso. Bolsas al vacío con válvula, 250 g, 500 g y 1 kg; mayorista 5–25 kg. Se despacha 1–5 días después de tostar. Marca propia disponible.',
        origin: 'Huila · Cauca · Valle del Cauca',
        roastLevel: 'medium',
        price: 0,
        wholesaleDiscount: 0,
        image: IMG_ROASTED,
        stock: 500,
        weight: '250 g · 500 g · 1 kg · mayorista 5–25 kg',
        active: true,
        flavorNotes: ['Caramelo', 'Chocolate de leche', 'Frutos rojos'],
        altitude: '1.500+ msnm',
        process: 'Lavado · tostado bajo pedido',
      },
    ],
    roastedTitle: 'Café tostado — especificación',
    roastedLead: 'Tostado en Bogotá bajo pedido, para que salga fresco de Colombia. Los perfiles se ajustan a su brief.',
    roasted: [
      { label: 'Nivel de tostión', value: 'Medio (Agtron 55–65) como estándar · medio-alto (Agtron 45–55) o más claro bajo pedido.' },
      { label: 'Formato', value: 'En grano o molido (filtrado, espresso, prensa francesa).' },
      { label: 'Empaque', value: 'Bolsas multicapa al vacío con válvula desgasificadora: 250 g, 500 g, 1 kg. Mayorista 5–25 kg. Bolsas sin marca para su propia etiqueta.' },
      { label: 'Frescura', value: 'Tostado por pedido, despachado 1–5 días después de tostar. Óptimo dentro de 60 días; 12 meses de vida útil sellado.' },
      { label: 'Tamaño de exportación', value: 'Hasta 50 kg de tostado por envío courier bajo el régimen de pequeñas cantidades de la FNC; volúmenes mayores como exportación ordinaria aérea o marítima.' },
      { label: 'Arancel UE', value: 'El café tostado paga 7,5 % NMF en la UE; 0 % con la declaración de origen UE–Colombia, que nosotros emitimos.' },
    ],
    privateLabel: {
      title: 'Marca propia y perfiles a la medida',
      text:
        'Tostamos y empacamos según su brief — perfil, molienda, tamaño de bolsa, impresa o sin imprimir — y despachamos con su marca. Los mínimos dependen del formato; pida el cuadro vigente.',
    },
    domestic: {
      title: 'Ventas dentro de Colombia',
      text:
        'También suministramos café tostado y molido a cafeterías, oficinas y empresas en Colombia (250 g, 500 g, 1 kg y granel), con factura electrónica en pesos. Escríbanos por WhatsApp desde Bogotá.',
    },
  },

  export: {
    eyebrow: 'Exportación y logística',
    title: 'De una muestra a un contenedor — cómo despachamos',
    lead:
      'Nos encargamos de todo el lado colombiano: compra, trilla y control de calidad, expediente cafetero ante la FNC, aduana y reserva del flete. Usted nos dice el puerto y el Incoterm.',
    sections: [
      {
        title: 'Tamaños de envío',
        rows: [
          { label: 'Muestras de oferta', value: '250 g – 1 kg por perfil, al vacío, por DHL Express. Para compradores calificados la muestra corre por nuestra cuenta; usted cubre el courier.' },
          { label: 'Lotes pequeños por courier', value: 'Hasta 60 kg de verde o 50 kg de tostado por envío bajo el régimen de pequeñas cantidades de la FNC. DHL Express puerta a puerta, 5–8 días hábiles a todo el mundo, con rastreo.' },
          { label: 'Pallets', value: '100–1.000 kg por carga aérea consolidada (DHL Global Forwarding) o marítimo LCL. Expediente de exportación, guía de tránsito y contribución cafetera a cargo nuestro.' },
          { label: 'Contenedores', value: '20\' FCL: 275 sacos × 70 kg ≈ 19,25 t. Medio contenedor: 10 t = 143 sacos. Cargas mixtas verde / tostado posibles. Multicontenedor con contrato a futuro.' },
        ],
      },
      {
        title: 'Términos y rutas',
        rows: [
          { label: 'Incoterms 2020', value: 'DAP en su dirección (lotes courier, DHL Express) · EXW / FCA Bogotá (courier y aéreo) · FOB Cartagena o Santa Marta · CFR / CIF puerto de destino.' },
          { label: 'Puertos de cargue', value: 'Cartagena (Contecar) o Santa Marta, en el Caribe — servicios directos al norte de Europa y al Mediterráneo.' },
          { label: 'Destinos cotizados', value: 'Gotemburgo, Hamburgo, Amberes, Róterdam, Valencia, Ciudad del Cabo, Walvis Bay, Ashdod, Jebel Ali y costa este de EE. UU., entre otros.' },
          { label: 'Tránsito', value: 'Courier 5–8 días hábiles. Marítimo 18–35 días según ruta y transbordo.' },
          { label: 'Plazo de entrega', value: 'Lotes courier: 1–2 semanas desde el pago. Contenedores: normalmente 4–6 semanas de contrato a cargue (trilla, inspección de Almacafé y reserva).' },
          { label: 'Pago', value: 'Muestras y lotes courier: anticipado por transferencia bancaria. Contenedores: depósito al contrato y saldo contra documentos, o carta de crédito confirmada. Facturado en USD.' },
          { label: 'Precio', value: 'Contenedores: "C" de Nueva York más diferencial acordado, fijado al contrato, con un precio indicativo FOB Cartagena para un contenedor de 20\' en el cotizador. Lotes courier: por kilogramo, flete como línea aparte, con un estimado instantáneo puesto en destino en nuestro cotizador de envío. Cada oferta trae su propia vigencia.' },
        ],
      },
    ],
    docsTitle: 'Documentos con cada despacho',
    docs: [
      'Factura comercial (electrónica, autorizada por la DIAN) y lista de empaque / pesos',
      'Conocimiento de embarque (B/L) o guía aérea',
      'Certificado de origen OIC; declaración de origen UE–Colombia para café tostado (0 % de arancel)',
      'Ficha del lote y hoja de catación firmada por Q-Grader (lotes de especialidad)',
      'Certificado de calidad de Almacafé y guía de tránsito FNC (contenedores)',
      'Certificado fitosanitario (ICA) cuando el destino lo exige — la UE no lo pide para café verde',
      'Certificado de seguro bajo CIF',
    ],
    complianceTitle: 'Cumplimiento, sin rodeos',
    compliance: [
      {
        title: 'Expediente de exportación colombiano',
        text:
          'Exportador de café registrado ante la Federación Nacional de Cafeteros (FNC) y la DIAN. Cada exportación lleva anuncio de venta en el Portal Cafetero, guía de tránsito FNC, repeso e inspección de calidad de Almacafé, pago de la contribución cafetera y la declaración de exportación (SAE). Lo hacemos todo nosotros; ningún agente de carga puede hacerlo.',
      },
      {
        title: 'Importación en la UE: aranceles y sanidad vegetal',
        text:
          'El café verde entra a la Unión Europea con 0 % de arancel para todos los orígenes, sin certificado de origen. El tostado paga 7,5 % salvo que lo cubra el acuerdo comercial UE–Colombia, por eso emitimos la declaración de origen. El café verde no requiere certificado fitosanitario (queda fuera del Anexo XI del Reglamento (UE) 2019/2072); lo emitimos a través del ICA cuando otro destino lo pide.',
      },
      {
        title: 'Reglamento EUDR de deforestación',
        text:
          'El Reglamento europeo de deforestación exige geolocalización de cada parcela (polígonos por encima de 4 ha), fechas de producción y una declaración de no deforestación después del 31 de diciembre de 2020, con el importador presentando la declaración de debida diligencia en TRACES. Estamos construyendo datos a nivel de parcela con nuestros proveedores para los lotes con destino UE y decimos en cada hoja de oferta si un lote tiene hoy geolocalización de finca. No le venderemos un lote como "listo para EUDR" si los datos no existen.',
      },
      {
        title: 'Inocuidad',
        text:
          'Registro sanitario INVIMA NSA-0006451-2019 para productos tostados. Humedad controlada en 10–12 % y actividad de agua medida bajo pedido para mantener bajo el riesgo de ocratoxina. El café nunca se fumiga.',
      },
    ],
  },

  shipping: {
    eyebrow: 'Cotizador de envío',
    title: '¿Cuánto cuesta llevar café colombiano hasta su puerta?',
    lead:
      'Elija su país, el café y la cantidad. Al instante ve el precio puesto en destino — café, empaque y flete DHL Express — en dólares. Para lotes courier de 10 a 60 kg de verde o de 10 a 50 kg de tostado, y para contenedores de 20\' de café verde FOB Cartagena.',
    formTitle: 'Su envío',
    modeLabel: 'Tipo de envío',
    modes: {
      courier: { title: 'Lote courier', detail: '10–60 kg de verde o 10–50 kg de tostado · DHL Express a su puerta (DAP)' },
      container: { title: 'Contenedor de 20\'', detail: '100–275 sacos de 70 kg · café verde · FOB Cartagena' },
    },
    container: {
      coffeeLabel: 'Café verde',
      groups: { standard: 'Lavados y descafeinado', process: 'Honey, naturales y fermentados', variety: 'Variedades especiales' },
      products: {
        'washed-79': 'Comercial lavado · SCA 79',
        'washed-81-antioquia': 'Lavado · SCA 81 · Antioquia',
        'washed-82': 'Lavado · SCA 82',
        'washed-84-antioquia': 'Lavado · SCA 84 · Antioquia',
        'decaf-84': 'Descafeinado (lavado) · SCA 84',
        'honey-yellow-85': 'Honey amarillo · SCA 85,5',
        'fermented-85': 'Fermentación extendida · SCA 85,5',
        'honey-red-86': 'Honey rojo · SCA 86',
        'fermented-86': 'Fermentación extendida · SCA 86+',
        'honey-black-86': 'Honey negro · SCA 86,5',
        'natural-86': 'Natural · SCA 86,5',
        'natural-87': 'Natural · SCA 87',
        'chiroso-87': 'Variedad Chiroso, lavado · SCA 87',
        'pink-bourbon-87': 'Bourbon rosado, lavado · SCA 87,5',
        'geisha-88': 'Geisha, honey · SCA 88,5',
        'wush-wush-89': 'Wush Wush, natural · SCA 89',
      },
      bagsLabel: 'Cantidad (sacos de 70 kg)',
      bagsHint: 'De {min} sacos ({minKg} kg) a {full} sacos ({fullKg} kg), un contenedor de 20\' lleno. Entre más lleno el contenedor, menor el precio por kilo.',
      idle: 'Elija un café y el número de sacos para ver el precio FOB.',
      belowMin: 'El precio de contenedor arranca en {min} sacos ({minKg} kg). Para lotes más pequeños use la opción courier o escríbanos.',
      overLimit: 'Por encima de {full} sacos necesita más de un contenedor de 20\' — escríbanos para una cotización de varios contenedores.',
      perKgLine: 'Precio por kilogramo, FOB Cartagena',
      perLbLine: 'Precio por libra',
      totalLine: 'Total FOB Cartagena · {bags} sacos ({kg} kg)',
      fullNote: 'Contenedor de 20\' lleno: el mejor precio por kilo.',
      partialNote: 'Contenedor parcial. Complételo hasta {full} sacos para el mejor precio por kilo; puede mezclar cafés para llenarlo.',
      disclaimer:
        'Estimado indicativo en dólares, no es una oferta en firme. El precio del café verde se mueve con el mercado todos los días; el precio y su vigencia los confirmamos en una hoja de oferta con fecha.',
      included: [
        'Café verde en sacos de exportación de 70 kg (bolsa hermética interna bajo solicitud)',
        'Trámite de exportación en Colombia: contribución cafetera FNC, certificado de calidad de Almacafé, declaración de exportación y certificado de origen',
        'Transporte terrestre a Cartagena, llenado del contenedor, manejo portuario y emisión del BL',
        'FOB Cartagena (Incoterms 2020): el café se entrega a bordo en Cartagena',
      ],
      notIncluded: [
        'Flete marítimo y seguro — cotizamos CFR / CIF a su puerto si lo pide',
        'Gastos portuarios en destino, aranceles e impuestos',
        'Los registros que su país exija al importador — vea las notas de importación más abajo',
      ],
      paymentNote:
        'Anticipo al firmar y saldo contra documentos, o carta de crédito confirmada. Normalmente de 4 a 6 semanas desde el contrato hasta el embarque. Para lotes con destino a la UE, la geolocalización de fincas que exige el EUDR se confirma lote por lote en la oferta.',
      whatsappQuote: 'Hola, quiero cotizar {bags} sacos ({kg} kg) de café verde, {product}, FOB Cartagena. Estimado de la web: {total} ({perKg}/kg).',
      whatsappNoPrice: 'Hola, quiero cotizar {bags} sacos de café verde, {product}, FOB Cartagena.',
      emailSubject: 'Cotización de contenedor — {bags} sacos, {product}',
    },
    countryLabel: 'País de destino',
    countryPlaceholder: 'Elija un país…',
    otherCountry: 'Otro país',
    productLabel: 'Café',
    groups: { green: 'Café verde', roasted: 'Café tostado' },
    products: {
      'green-basic': { name: 'Café verde básico', detail: 'Nariño · lavado · taza 77,0 · vea su perfil de taza', inText: 'café verde básico' },
      'green-excelso': { name: 'Café verde Excelso', detail: 'Selecto: Huila, Cauca, Valle, Quindío · Excelso EP · SCA 84+', inText: 'café verde Excelso' },
      'green-supremo': { name: 'Café verde Supremo', detail: 'Huila · Acevedo, 1.580 msnm · lavado · SCA 86+', inText: 'café verde Supremo' },
      'roasted-castillo': { name: 'Café tostado Castillo', detail: 'En grano · tostión media · bolsas de 1 kg con válvula, sin marca', inText: 'café tostado Castillo' },
      'roasted-bourbon': { name: 'Café tostado Bourbon', detail: 'Variedades Bourbon · en grano · bolsas de 1 kg con válvula, sin marca', inText: 'café tostado Bourbon' },
      'roasted-fermented': { name: 'Café tostado de fermentación especial', detail: 'Coco, fresa, tabaco y otras fermentaciones · en grano · bolsas de 1 kg con válvula', inText: 'café tostado de fermentación especial' },
    },
    kgLabel: 'Cantidad (kg, netos)',
    kgHint: 'De {min} a {max} kg para este café. Para muestras de 250 g – 1 kg, escríbanos.',
    resultTitle: 'Su estimado',
    idle: 'Elija un destino y una cantidad para ver el precio puesto en destino.',
    loading: 'Calculando…',
    error: 'No pudimos calcular el estimado en este momento. Escríbanos y se lo cotizamos a mano.',
    belowMin: 'El mínimo por envío es de {min} kg. Para muestras de 250 g – 1 kg, escríbanos por WhatsApp.',
    overLimit:
      'Por encima de {max} kg este café ya no viaja como lote courier. Los pallets por carga aérea y los contenedores marítimos se cotizan caso por caso — escríbanos.',
    otherCountryText:
      'Despachamos a todo el mundo con DHL Express. Cuéntenos su país y la cantidad y le enviamos una cotización exacta.',
    coffeeLine: 'Café · {kg} kg × {price}/kg',
    prepLine: 'Empaque y preparación de exportación',
    freightLine: 'Flete DHL Express, puerta a puerta',
    totalLine: 'Total puesto en destino (DAP)',
    perKgLine: 'Por kilogramo, puesto en destino',
    boxesLine: 'Viaja en {n} caja(s), unos {kg} kg brutos.',
    disclaimer:
      'Estimado indicativo en dólares, no es una oferta en firme. Nuestros precios están en pesos colombianos y se convierten con la TRM oficial del día, y el recargo de combustible de DHL cambia cada semana; el precio final lo confirmamos en una proforma escrita.',
    includedTitle: 'Qué incluye el precio',
    packing: {
      green: 'El café empacado para exportación: bolsas herméticas tipo GrainPro dentro de cajas de hasta 24 kg',
      roasted: 'El café empacado para exportación: bolsas de 1 kg con válvula desgasificadora dentro de cajas de hasta 24 kg',
    },
    included: [
      'Trámite de exportación en Colombia bajo el régimen de pequeñas cantidades de la FNC, factura comercial y lista de empaque',
      'Flete DHL Express Worldwide puerta a puerta y con seguimiento — 5 a 8 días hábiles',
      'Entregado en el lugar (DAP): el café llega a su dirección',
    ],
    notIncludedTitle: 'Qué no incluye',
    notIncluded: [
      'Aranceles, IVA y gastos de despacho aduanero en destino — los paga el importador',
      'El recargo de DHL por zona remota, si su código postal lo tiene — lo revisamos antes de la proforma',
      'Los registros que su país exija al importador — vea las notas de importación más abajo',
      'Comisiones bancarias de su transferencia',
    ],
    paymentNote:
      'Pago anticipado por transferencia bancaria, facturado en USD. Plazo de 1 a 2 semanas desde el pago (para Estados Unidos, una vez confirmado el registro FDA).',
    notesTitle: 'Notas de importación por país',
    notesLead: 'Lo que necesita el importador al llegar el café. Al elegir un país arriba se abre su nota.',
    countryNotes: {
      US: 'El café para Estados Unidos debe tostarse y empacarse — o, si es verde, trillarse y almacenarse — en una instalación registrada ante la FDA. Despachamos a EE. UU. solo cuando ese registro está confirmado para su lote, y le damos la fecha en la proforma. Cada envío necesita el Prior Notice de la FDA, que coordinamos con usted o con su agente de aduanas. Como importador, usted debe cumplir el Programa de Verificación de Proveedores Extranjeros (FSVP) y tener número DUNS. El tostado en bolsas para venta al público necesita etiqueta en inglés con el peso neto en onzas y gramos. El arancel de EE. UU. para el café verde y tostado es 0 %.',
      DE: 'El café verde entra a la UE con arancel 0 %; el tostado paga 7,5 % salvo que aplique la declaración de origen UE–Colombia, que nosotros emitimos. El IVA de importación se cobra a la tarifa alemana y lo paga el importador. Para importar con fines comerciales necesita número EORI y, para revender, registrarse como empresa alimentaria ante la autoridad local.',
      BE: 'El café verde entra a la UE con arancel 0 %; el tostado paga 7,5 % salvo que aplique la declaración de origen UE–Colombia, que nosotros emitimos. El IVA de importación se cobra a la tarifa belga y lo paga el importador. Para importar con fines comerciales necesita número EORI y, para revender, registrarse como empresa alimentaria ante la autoridad nacional de alimentos.',
      ES: 'El café verde entra a la UE con arancel 0 %; el tostado paga 7,5 % salvo que aplique la declaración de origen UE–Colombia, que nosotros emitimos. España cobra IVA de importación de cerca del 10 % al café y aplica un control oficial de importación de alimentos (AGRIM) que gestiona DHL. Para revender necesita número EORI y registro de empresa alimentaria (RGSEAA).',
      FR: 'El café verde entra a la UE con arancel 0 %; el tostado paga 7,5 % salvo que aplique la declaración de origen UE–Colombia, que nosotros emitimos. El IVA de importación se cobra a la tarifa francesa y lo paga el importador. Para importar con fines comerciales necesita número EORI y, para revender, registrarse como empresa alimentaria ante la autoridad local.',
      NL: 'El café verde entra a la UE con arancel 0 %; el tostado paga 7,5 % salvo que aplique la declaración de origen UE–Colombia, que nosotros emitimos. El IVA de importación se cobra a la tarifa neerlandesa y lo paga el importador. Para importar con fines comerciales necesita número EORI y, para revender, registrarse como empresa alimentaria ante la autoridad nacional de alimentos.',
      PL: 'El café verde entra a la UE con arancel 0 %; el tostado paga 7,5 % salvo que aplique la declaración de origen UE–Colombia, que nosotros emitimos. El IVA de importación se cobra a la tarifa polaca y lo paga el importador. Para importar con fines comerciales necesita número EORI y, para revender, registrarse como empresa alimentaria ante la autoridad sanitaria.',
      SE: 'El café verde entra a la UE con arancel 0 %; el tostado paga 7,5 % salvo que aplique la declaración de origen UE–Colombia, que nosotros emitimos. El IVA de importación se cobra a la tarifa sueca y lo paga el importador. Para importar con fines comerciales necesita número EORI y, para revender, registrarse como empresa alimentaria ante la autoridad local.',
      AE: 'En Emiratos el importador normalmente necesita una licencia de comercio de alimentos y debe registrar cada producto y etiqueta ante la autoridad local (en Abu Dabi, ADAFSA), con etiquetado en árabe. Verifíquelo antes de pedir.',
    },
    ctaTitle: '¿Listo para pedir o necesita una cotización exacta?',
    ctaText:
      'Envíele este estimado a David por WhatsApp o por correo y le respondemos con una proforma escrita en 24 horas hábiles.',
    whatsappQuote: 'Hola, quiero cotizar {kg} kg de {product} puestos en {country}. Estimado de la web: {total} (DAP).',
    whatsappNoPrice: 'Hola, quiero cotizar {kg} kg de {product} puestos en {country}.',
    whatsappOther: 'Hola, quiero cotizar el envío de {kg} kg de {product} a mi país: ',
    whatsappGeneric: 'Hola, quiero cotizar el envío de café colombiano.',
    emailSubject: 'Cotización de envío — {kg} kg de {product}',
  },

  profiles: {
    eyebrow: 'Café verde · perfiles de taza',
    title: 'Perfiles de taza de los cafés que ofrecemos',
    lead:
      'Cuatro cafés verdes colombianos, cada uno con su perfil en taza, su puntaje de cata, su origen y su proceso. Todos son café verde en almendra, sin tostar, listos para su tostadora.',
    updated: 'Actualizado el 31 de octubre de 2026',
    compareTitle: 'A simple vista',
    compareLabels: { origin: 'Origen', score: 'Puntaje de taza', acidity: 'Acidez', process: 'Proceso', presentation: 'Presentación', estimator: 'En el cotizador de envío' },
    presentation: 'Café verde en almendra',
    scoreLabel: 'puntaje de taza',
    viewProfile: 'Ver el perfil completo',
    radarTitle: 'Atributos de la cata',
    radarShapeNote: 'Forma del perfil según la ficha técnica del lote; los puntajes por atributo no se publican.',
    axes: ['Fragancia y aroma', 'Sabor', 'Sabor residual', 'Acidez', 'Cuerpo', 'Uniformidad', 'Balance', 'Taza limpia', 'Dulzor', 'Impresión global'],
    attributesTitle: 'Hoja de cata',
    attributeCols: ['Atributo', 'Nota', 'Lo que anotó el catador'],
    totalLabel: 'Puntaje de la cata',
    totalNote: 'Suma de los diez atributos',
    inEstimator: 'En el cotizador de envío como «{name}»',
    onRequest: 'Se cotiza bajo solicitud',
    estimatorCta: 'Cotizar un envío',
    quoteCta: 'Pedir cotización',
    ctaTitle: 'Cátelos usted mismo',
    ctaText:
      'Enviamos muestras de oferta de 250–500 g por perfil por DHL Express. Cuéntenos qué cafés quiere catar y a dónde se los enviamos.',
    whatsappMessage: 'Hola, quiero muestras de sus cafés verdes. Me interesan estos perfiles: ',
    whatsappProfile: 'Hola, quiero cotizar su café verde {name}.',
    emailSubject: 'Muestras de café verde — perfiles de taza',
    greenCallout: {
      title: 'Perfiles de taza de nuestros cafés actuales',
      text: 'Huila 86+, Selecto 84+, Tolima y un lote de Nariño: notas en taza, puntaje de cata, origen y proceso, lado a lado.',
      cta: 'Ver los perfiles de taza',
    },
    items: [
      {
        id: 'huila',
        name: 'Huila',
        grade: 'Supremo',
        subtitle: 'Acevedo, Huila · 1.580 msnm',
        score: '86+',
        notes: ['Cítrico', 'Panela', 'Floral', 'Aromático'],
        summary:
          'Una taza cítrica y aromática, con dulzor de panela y notas florales. Limpia, uniforme, balanceada y dulce: esos cuatro atributos llegan al máximo de la escala.',
        facts: ['Café verde · lavado', 'Fermentación de 48 h en cereza y 48 h despulpado', 'Secado de 10 a 12 días'],
        origin: 'Acevedo, Huila',
        acidity: 'Cítrica',
        process: 'Lavado',
        specsTitle: 'Origen y proceso',
        specs: [
          { label: 'Departamento', value: 'Huila' },
          { label: 'Municipio', value: 'Acevedo' },
          { label: 'Altitud', value: '1.580 msnm' },
          { label: 'Presentación', value: 'Café verde en almendra' },
          { label: 'Proceso', value: 'Lavado' },
          { label: 'Fermentación en cereza', value: '48 horas' },
          { label: 'Fermentación despulpado', value: '48 horas' },
          { label: 'Días de secado', value: '10 a 12 días' },
        ],
        estimator: 'Café verde Supremo',
      },
      {
        id: 'selecto',
        name: 'Selecto',
        grade: 'Excelso EP',
        subtitle: 'Huila · Cauca · Valle del Cauca · Quindío',
        score: '84+',
        notes: ['Caña de azúcar', 'Panela', 'Mandarina', 'Naranja', 'Cuerpo cremoso', 'Aromático', 'Floral'],
        summary:
          'Una taza dulce y aromática: caña de azúcar y panela, acidez cítrica con matices de mandarina o naranja, cuerpo cremoso y notas florales. Limpia, balanceada y de alta persistencia. Evaluada por catador Q-Grader.',
        facts: ['Café verde · principalmente Castillo', 'Grano superior a malla 14', 'Selección electrónica de defectos'],
        origin: 'Huila, Cauca, Valle del Cauca y Quindío',
        acidity: 'Cítrica, con matices de mandarina o naranja',
        process: 'Lavado',
        specsTitle: 'Origen y especificación',
        specs: [
          { label: 'Origen', value: 'Huila, Cauca, Valle del Cauca y Quindío, en blends según la cosecha' },
          { label: 'Variedad', value: 'Principalmente Castillo' },
          { label: 'Presentación', value: 'Café verde en almendra, 100 % arábica' },
          { label: 'Tamaño de grano', value: 'Superior a malla 14' },
          { label: 'Selección', value: 'Tamizado mecánico y selección electrónica de defectos' },
          { label: 'Humedad', value: 'Verificada antes de cada lote' },
          { label: 'Evaluación', value: 'Puntaje superior a 84 SCA, evaluado por catador Q-Grader' },
        ],
        estimator: 'Café verde Excelso',
      },
      {
        id: 'tolima',
        name: 'Tolima',
        grade: 'Grado de exportación UGQ',
        subtitle: 'Tolima · Castillo lavado',
        score: '81,82',
        notes: ['Cacao', 'Panela', 'Caña de azúcar', 'Chocolate', 'Caramelo', 'Acidez cítrica media'],
        summary:
          'Una taza directa y dulce: cacao, panela, caña de azúcar, chocolate y caramelo, con acidez cítrica media. Sencilla más que compleja; pensada para mezcla o para un espresso de todos los días.',
        facts: ['Café verde · grado de exportación UGQ', 'Humedad de 10 a 12 %'],
        origin: 'Tolima',
        acidity: 'Cítrica media',
        process: 'Lavado',
        specsTitle: 'Origen y proceso',
        specs: [
          { label: 'Departamento', value: 'Tolima' },
          { label: 'Variedad', value: 'Castillo' },
          { label: 'Proceso', value: 'Lavado' },
          { label: 'Presentación', value: 'Café verde en almendra, trillado en seco, listo para exportar' },
          { label: 'Grado', value: 'UGQ, grado de exportación' },
          { label: 'Humedad', value: '10 a 12 %' },
        ],
      },
      {
        id: 'basico',
        name: 'Básico',
        grade: 'Lote de Nariño',
        subtitle: 'Nariño · 1.650–1.800 msnm',
        score: '77,0',
        notes: ['Mandarina', 'Miel de rosas', 'Jazmín', 'Caña de azúcar', 'Frutos rojos', 'Brevas', 'Limoncillo', 'Uva verde', 'Caramelo'],
        summary:
          'Mandarina, miel de rosas y jazmín en el aroma; caña de azúcar, frutos rojos sutiles, brevas y limoncillo en taza. Acidez jugosa, como la uva verde; cuerpo redondo y ligero con textura de miel y un final a caramelo.',
        facts: ['Café verde · Castillo, Colombia y Caturra · lavado', 'Cata del 10 de septiembre de 2026'],
        origin: 'Nariño',
        acidity: 'Jugosa, como la uva verde',
        process: 'Lavado',
        specsTitle: 'Origen y proceso',
        specs: [
          { label: 'Altitud', value: '1.650 a 1.800 msnm' },
          { label: 'Variedades', value: 'Castillo, Colombia y Caturra' },
          { label: 'Presentación', value: 'Café verde en almendra' },
          { label: 'Proceso', value: 'Lavado' },
          { label: 'Fecha de cata', value: '10 de septiembre de 2026' },
        ],
        attributes: [
          { label: 'Fragancia y aroma', score: '6,5', note: 'mandarina, miel de rosas de baja intensidad, sutil floral a jazmín, caña de azúcar' },
          { label: 'Sabor', score: '7,0', note: 'caña de azúcar, agradable y sutil frutos rojos, brevas, limoncillo' },
          { label: 'Sabor residual', score: '7,0', note: 'agradable a caramelo' },
          { label: 'Acidez', score: '6,5', note: 'jugosa, como la uva verde' },
          { label: 'Cuerpo', score: '7,0', note: 'redondo y ligero, con leve sensación a miel' },
          { label: 'Uniformidad', score: '10', note: 'ok' },
          { label: 'Balance', score: '10', note: 'ok' },
          { label: 'Taza limpia', score: '10', note: 'ok' },
          { label: 'Dulzor', score: '6,0', note: 'caña de azúcar' },
          { label: 'Impresión global', score: '7,0', note: 'café balanceado con muy buen cuerpo, dulce y una acidez muy estable' },
        ],
        estimator: 'Café verde básico',
      },
    ],
  },

  faq: {
    eyebrow: 'Preguntas de compradores',
    title: 'Preguntas frecuentes',
    lead: 'Respuestas cortas y con datos. Si la suya no está aquí, escríbanos — respondemos en español o inglés en 24 horas hábiles.',
    items: [
      {
        q: '¿Qué café exportan?',
        a: 'Café verde arábica colombiano: grado de especialidad (Excelso EP, malla 14+, 84+ puntos SCA catados por Q-Grader) y grado comercial (SCA 80–83) para mezclas. También suministramos café tostado en grano y molido, incluida marca propia, tostado bajo pedido en Bogotá.',
      },
      {
        q: '¿Cuál es el pedido mínimo?',
        a: 'No hay mínimo para muestras (250 g – 1 kg). Los lotes por courier van desde 10 kg hasta 60 kg de café verde o 50 kg de tostado. Para marítimo trabajamos desde medio contenedor (10 t, 143 sacos de 70 kg) hasta un 20\' completo (275 sacos, unas 19,25 t) y contratos multicontenedor.',
      },
      {
        q: '¿Envían muestras y cuánto cuestan?',
        a: 'Sí. Las muestras de oferta de 250–500 g por perfil van por DHL Express. Para compradores calificados el café corre por nuestra cuenta y usted cubre el courier; los lotes de muestra más grandes se facturan por kilogramo con el flete como línea aparte. Antes de cargar cualquier contenedor se envía una muestra de pre-embarque del lote real.',
      },
      {
        q: '¿Cómo fijan los precios?',
        a: 'Los contenedores se cotizan sobre el contrato "C" de Nueva York más un diferencial acordado en la fecha del contrato, FOB Cartagena o CIF en su puerto. Nuestro cotizador en línea muestra un precio indicativo FOB Cartagena para un contenedor de 20\'; como el mercado se mueve a diario, el precio en firme va en una hoja de oferta con fecha y vigencia propia. Los lotes courier (10 a 60 kg de verde o 10 a 50 kg de tostado) se cotizan por kilogramo, y puede ver al instante un estimado puesto en destino (DAP) en https://www.entrecafescolombianos.coffee/es/cotizador-de-envio.',
      },
      {
        q: '¿Con qué Incoterms trabajan?',
        a: 'DAP en su dirección para lotes courier (DHL Express, puerta a puerta), EXW y FCA Bogotá para courier y aéreo si lo pide, FOB Cartagena o Santa Marta para marítimo, y CFR o CIF hasta su puerto cuando quiere que nosotros llevemos flete y seguro.',
      },
      {
        q: '¿Desde y hacia qué puertos despachan?',
        a: 'Cargamos en Cartagena o Santa Marta, en la costa Caribe. Hemos cotizado Gotemburgo, Hamburgo, Amberes, Róterdam, Valencia, Ciudad del Cabo, Walvis Bay, Ashdod, Jebel Ali y la costa este de Estados Unidos; cualquier puerto con servicio desde Cartagena se puede cotizar.',
      },
      {
        q: '¿Cuánto tarda la entrega?',
        a: 'Los envíos courier llegan en 5–8 días hábiles a todo el mundo. El marítimo tarda 18–35 días según la ruta. Para un contenedor cuente 4–6 semanas de contrato a cargue: trilla, inspección de Almacafé y reserva del buque.',
      },
      {
        q: '¿Qué documentos acompañan el despacho?',
        a: 'Factura comercial, lista de empaque, B/L o guía aérea, certificado de origen OIC, ficha del lote y hoja de catación del Q-Grader, certificado de calidad de Almacafé para contenedores, certificado de seguro bajo CIF y certificado fitosanitario cuando el destino lo exige.',
      },
      {
        q: '¿Necesito certificado fitosanitario para importar café verde en la UE?',
        a: 'No. El café verde en almendra está fuera del Anexo XI del Reglamento (UE) 2019/2072, así que la UE no pide certificado fitosanitario ni registro en TRACES. Otros destinos sí pueden pedirlo, y lo obtenemos del ICA cuando es el caso.',
      },
      {
        q: '¿Su café cumple con EUDR?',
        a: 'EUDR exige geolocalización de parcelas, fechas de producción y una declaración de no deforestación, presentadas por el importador en TRACES. Estamos construyendo datos a nivel de parcela con nuestros proveedores y decimos en cada hoja de oferta si un lote tiene geolocalización de finca. No describimos un lote como "listo para EUDR" si los datos no existen.',
      },
      {
        q: '¿Qué arancel paga el café colombiano en la UE?',
        a: 'Café verde: 0 %, para todos los orígenes, sin prueba de origen. Café tostado: 7,5 % NMF, o 0 % con la declaración de origen UE–Colombia, que nosotros emitimos.',
      },
      {
        q: '¿Pueden tostar y empacar con mi marca?',
        a: 'Sí. Nuestra tostadora aliada en Bogotá tuesta según su perfil y empaca en 250 g, 500 g, 1 kg o bolsas mayoristas, impresas o sin imprimir. El café tostado se despacha 1–5 días después de tostar.',
      },
      {
        q: '¿Venden dentro de Colombia?',
        a: 'Sí. Café tostado y molido para cafeterías, oficinas y empresas, en 250 g, 500 g, 1 kg y granel, con factura electrónica en pesos colombianos. Estamos en Bogotá.',
      },
      {
        q: '¿Cuáles son las condiciones de pago?',
        a: 'Las muestras y los lotes courier se pagan por anticipado mediante transferencia bancaria. Para contenedores acordamos un depósito al contrato y el saldo contra documentos, o una carta de crédito confirmada. Las facturas se emiten en dólares.',
      },
      {
        q: '¿Quiénes son, legalmente?',
        a: 'Entre Cafés Colombianos es un negocio de exportación de café matriculado en la Cámara de Comercio de Bogotá en 2026, exportador registrado ante la Federación Nacional de Cafeteros y facturador electrónico autorizado por la DIAN. Lo dirige su fundador, David Leonardo Ramírez Contreras.',
      },
    ],
  },

  about: {
    title: 'Sobre Entre Cafés Colombianos',
    story: [
      'Entre Cafés Colombianos es un exportador de café con sede en Bogotá, fundado en 2026 por David Leonardo Ramírez Contreras. Compramos a familias caficultoras y proveedores enfocados en calidad del sur y el occidente del país — Huila, Cauca, Valle del Cauca, Nariño y Quindío — y exportamos café verde y tostado directamente a tostadores, importadores y distribuidores.',
      'Empezamos pequeños y a propósito: los primeros despachos fueron café tostado a Suecia por courier, y con ellos aprendimos el expediente completo de exportación colombiano — anuncio de venta ante la FNC, guía de tránsito, contribución cafetera, inspección de Almacafé, aduana — por cuenta propia y no a través de la licencia de un tercero. Ese es el expediente que hoy corremos para cada lote, desde una caja de 45 kg por courier hasta un contenedor.',
      'Lo que le ofrecemos al mercado es tamaño honesto y papeles honestos: medios contenedores y cargas mixtas que a las grandes comercializadoras no les interesan, un puntaje de taza documentado y una respuesta clara sobre las reglas de la UE — aranceles, sanidad vegetal y EUDR — antes de que usted se comprometa.',
    ],
    factsTitle: 'Datos de la empresa',
    facts: [
      { label: 'Forma legal', value: 'Persona natural comerciante matriculada en la Cámara de Comercio de Bogotá, junio de 2026. Actividad: comercio al por mayor de alimentos (CIIU 4631).' },
      { label: 'Registro de exportador', value: 'Federación Nacional de Cafeteros (FNC). Facturación electrónica autorizada por la DIAN.' },
      { label: 'Registro sanitario', value: 'INVIMA NSA-0006451-2019 (productos tostados).' },
      { label: 'Ubicación', value: 'Bogotá D.C., Colombia · GMT-5.' },
      { label: 'Idiomas', value: 'Español e inglés.' },
      { label: 'Fundador', value: 'David Leonardo Ramírez Contreras — gerente de exportaciones.' },
    ],
    marketsTitle: 'Dónde despachamos y cotizamos',
    marketsText:
      'Nuestro primer mercado de exportación fue Suecia. Desde entonces hemos cotizado café verde y tostado a compradores de Europa, Medio Oriente, África y América, desde lotes courier hasta contenedores.',
    shippedLabel: 'Despachado',
    shipped: ['Suecia', 'Colombia (mercado nacional)'],
    quotingLabel: 'Cotizado / negociaciones activas',
    quoting: ['Bélgica', 'España', 'Países Bajos', 'Alemania', 'Estados Unidos', 'Sudáfrica', 'Namibia', 'Emiratos Árabes Unidos', 'Israel', 'Arabia Saudita'],
  },

  contact: {
    title: 'Contacto',
    lead: 'Responde una sola persona: David Ramírez, gerente de exportaciones y fundador. Escriba en español o inglés.',
    whatsapp: 'WhatsApp',
    email: 'Correo',
    responseNote: 'Respondemos en 24 horas hábiles (Bogotá, GMT-5).',
    askTitle: 'Para cotizar rápido, cuéntenos',
    askItems: [
      'País y puerto de destino (o aeropuerto para lotes courier)',
      'Cantidad — kilogramos, sacos o contenedores',
      'Grado: especialidad 84+, comercial, o tostado / marca propia',
      'Incoterm preferido (FOB, CIF, FCA…)',
      'Para cuándo lo necesita',
    ],
  },

  common: {
    pricingNote: 'Lotes courier: estimado al instante en el cotizador de envío · contenedores: precio bajo solicitud.',
    sampleSize: 'Presentaciones',
    altitude: 'Altura',
    process: 'Proceso',
    requestQuote: 'Pedir cotización',
    requestSamples: 'Pedir muestras',
    whatsapp: 'WhatsApp',
    email: 'Correo',
    readMore: 'Leer más',
  },
};

export const CONTENT: Record<'en' | 'es', SiteContent> = { en, es };

export function content(lang: Language): SiteContent {
  return lang === 'es' ? es : en;
}
