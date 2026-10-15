import { Language, Product } from './types';
import { PublicTab } from './router';

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
        'Talk to David Ramírez, export manager at Entre Cafés Colombianos, Bogotá. WhatsApp +57 315 067 0591 · cafecolombiano888@proton.com. English and Spanish. Replies within 24 hours on business days.',
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
      'Container business is priced against the New York "C" contract plus a differential agreed on the contract date, FOB Cartagena or CIF your port — the way Colombian coffee is traded. Samples and small air lots are priced per kilogram, freight shown as its own line. We do not hold an open price list for a market that moves daily; ask and you get a dated offer sheet.',
  },

  products: {
    eyebrow: 'Wholesale catalogue',
    title: 'Products',
    lead:
      'Green coffee is our core business; roasted and ground coffee are supplied for distributors, private label and the Colombian market. Pricing on request by origin lot, volume and Incoterm.',
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
          'Clean, sound Colombian green coffee for blends, private label and volume roasting. Excelso or UGQ preparation, screen 14+, fully washed, moisture 10–12%. Priced against the market differential, FOB Cartagena or CIF. From a half container (10 t, 143 bags) to full 20\' containers (275 bags × 70 kg).',
        origin: 'Departmental blend — Huila, Cauca, Valle del Cauca, Quindío',
        roastLevel: 'green',
        price: 0,
        wholesaleDiscount: 0,
        image: IMG_GREEN,
        stock: 10000,
        weight: 'From 10 t (half 20\') · 19.25 t per full 20\' container',
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
          { label: 'Incoterms 2020', value: 'EXW Bogotá · FCA Bogotá (courier and air) · FOB Cartagena or Santa Marta · CFR / CIF destination port.' },
          { label: 'Ports of loading', value: 'Cartagena (Contecar) or Santa Marta on the Caribbean — direct services to northern Europe and the Mediterranean.' },
          { label: 'Destinations quoted', value: 'Gothenburg, Hamburg, Antwerp, Rotterdam, Valencia, Cape Town, Walvis Bay, Ashdod, Jebel Ali and US East Coast, among others.' },
          { label: 'Transit', value: 'Courier 5–8 business days. Sea freight 18–35 days depending on route and transhipment.' },
          { label: 'Lead time', value: 'Courier lots: 1–2 weeks from payment. Containers: typically 4–6 weeks from contract to loading (milling, Almacafé inspection and booking).' },
          { label: 'Payment', value: 'Samples and courier lots: in advance by bank transfer. Containers: deposit on contract with the balance against documents, or a confirmed letter of credit. Invoiced in USD.' },
          { label: 'Pricing', value: 'Containers: NY "C" plus an agreed differential, fixed at contract. Courier lots: per kilogram, freight as its own line. Every offer carries its own validity period.' },
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
        a: 'There is no minimum for samples (250 g – 1 kg). Courier lots run from around 10 kg up to 60 kg of green coffee. For sea freight we work from a half container (10 t, 143 bags of 70 kg) up to a full 20\' (275 bags, about 19.25 t) and multi-container contracts.',
      },
      {
        q: 'Do you send samples, and what do they cost?',
        a: 'Yes. Offer samples of 250–500 g per profile go by DHL Express. For qualified buyers the coffee is on us and you cover the courier; larger sample lots are invoiced per kilogram with freight as its own line. A pre-shipment sample from the actual lot is sent before any container is loaded.',
      },
      {
        q: 'How do you set your prices?',
        a: 'Containers are priced against the New York "C" contract plus a differential agreed on the contract date, FOB Cartagena or CIF your port. Courier lots are priced per kilogram. We do not publish a list price because the market moves daily; you get a dated offer sheet with its own validity.',
      },
      {
        q: 'Which Incoterms do you work with?',
        a: 'EXW and FCA Bogotá for courier and air, FOB Cartagena or Santa Marta for sea, and CFR or CIF to your port when you want us to carry freight and insurance.',
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
    pricingNote: 'Wholesale — pricing on request by origin lot, volume and Incoterm.',
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
        'Hable con David Ramírez, gerente de exportaciones de Entre Cafés Colombianos, Bogotá. WhatsApp +57 315 067 0591 · cafecolombiano888@proton.com. Español e inglés. Respuesta en 24 horas hábiles.',
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
      'El negocio de contenedores se cotiza sobre el contrato "C" de Nueva York más un diferencial acordado en la fecha del contrato, FOB Cartagena o CIF en su puerto — como se comercia el café colombiano. Las muestras y los lotes aéreos pequeños se cotizan por kilogramo, con el flete como línea aparte. No mantenemos una lista de precios abierta para un mercado que se mueve a diario; pregunte y recibe una hoja de oferta con fecha.',
  },

  products: {
    eyebrow: 'Catálogo mayorista',
    title: 'Productos',
    lead:
      'El café verde es nuestro negocio principal; el tostado y el molido los suministramos a distribuidores, marca propia y el mercado colombiano. Precio bajo solicitud según lote de origen, volumen e Incoterm.',
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
          'Café verde colombiano limpio y sano para mezclas, marca propia y tostión en volumen. Preparación Excelso o UGQ, malla 14+, lavado, humedad 10–12 %. Cotizado sobre el diferencial de mercado, FOB Cartagena o CIF. Desde medio contenedor (10 t, 143 sacos) hasta contenedores de 20\' completos (275 sacos × 70 kg).',
        origin: 'Mezcla departamental — Huila, Cauca, Valle del Cauca, Quindío',
        roastLevel: 'green',
        price: 0,
        wholesaleDiscount: 0,
        image: IMG_GREEN,
        stock: 10000,
        weight: 'Desde 10 t (medio 20\') · 19,25 t por contenedor de 20\' completo',
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
          { label: 'Incoterms 2020', value: 'EXW Bogotá · FCA Bogotá (courier y aéreo) · FOB Cartagena o Santa Marta · CFR / CIF puerto de destino.' },
          { label: 'Puertos de cargue', value: 'Cartagena (Contecar) o Santa Marta, en el Caribe — servicios directos al norte de Europa y al Mediterráneo.' },
          { label: 'Destinos cotizados', value: 'Gotemburgo, Hamburgo, Amberes, Róterdam, Valencia, Ciudad del Cabo, Walvis Bay, Ashdod, Jebel Ali y costa este de EE. UU., entre otros.' },
          { label: 'Tránsito', value: 'Courier 5–8 días hábiles. Marítimo 18–35 días según ruta y transbordo.' },
          { label: 'Plazo de entrega', value: 'Lotes courier: 1–2 semanas desde el pago. Contenedores: normalmente 4–6 semanas de contrato a cargue (trilla, inspección de Almacafé y reserva).' },
          { label: 'Pago', value: 'Muestras y lotes courier: anticipado por transferencia bancaria. Contenedores: depósito al contrato y saldo contra documentos, o carta de crédito confirmada. Facturado en USD.' },
          { label: 'Precio', value: 'Contenedores: "C" de Nueva York más diferencial acordado, fijado al contrato. Lotes courier: por kilogramo, flete como línea aparte. Cada oferta trae su propia vigencia.' },
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
        a: 'No hay mínimo para muestras (250 g – 1 kg). Los lotes por courier van desde unos 10 kg hasta 60 kg de café verde. Para marítimo trabajamos desde medio contenedor (10 t, 143 sacos de 70 kg) hasta un 20\' completo (275 sacos, unas 19,25 t) y contratos multicontenedor.',
      },
      {
        q: '¿Envían muestras y cuánto cuestan?',
        a: 'Sí. Las muestras de oferta de 250–500 g por perfil van por DHL Express. Para compradores calificados el café corre por nuestra cuenta y usted cubre el courier; los lotes de muestra más grandes se facturan por kilogramo con el flete como línea aparte. Antes de cargar cualquier contenedor se envía una muestra de pre-embarque del lote real.',
      },
      {
        q: '¿Cómo fijan los precios?',
        a: 'Los contenedores se cotizan sobre el contrato "C" de Nueva York más un diferencial acordado en la fecha del contrato, FOB Cartagena o CIF en su puerto. Los lotes courier se cotizan por kilogramo. No publicamos lista de precios porque el mercado se mueve a diario; usted recibe una hoja de oferta con fecha y vigencia propia.',
      },
      {
        q: '¿Con qué Incoterms trabajan?',
        a: 'EXW y FCA Bogotá para courier y aéreo, FOB Cartagena o Santa Marta para marítimo, y CFR o CIF hasta su puerto cuando quiere que nosotros llevemos flete y seguro.',
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
    pricingNote: 'Mayorista — precio bajo solicitud según lote de origen, volumen e Incoterm.',
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
