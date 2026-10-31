import { renderToString } from 'react-dom/server';
import App from './App';
import { content } from './content';
import { COMPANY } from './constants';
import { Language } from './types';
import { prerenderPages, absoluteUrl, SITE_URL, PRERENDER_LANGS, PublicTab, ROUTES } from './router';

/**
 * Build-time entry used by scripts/prerender.mjs. Produces, for every public
 * page in English and Spanish: the page HTML, the <head> block (title,
 * description, canonical, hreflang, Open Graph, JSON-LD) and the sitemap.
 */

export { prerenderPages };

export function render(path: string, lang: Language): string {
  return renderToString(<App initialPath={path} initialLang={lang} />);
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function jsonLd(data: unknown): string {
  // "</script" inside a string would end the tag early; escape "<" to be safe.
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

function organization(lang: Language) {
  const c = content(lang);
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-entre.webp`,
    description: c.meta.home.description,
    foundingDate: COMPANY.founded,
    founder: { '@type': 'Person', name: COMPANY.contact.name, jobTitle: 'Export Manager' },
    email: COMPANY.contact.email,
    telephone: COMPANY.contact.whatsappE164,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bogotá',
      addressRegion: 'Bogotá D.C.',
      addressCountry: 'CO',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: COMPANY.contact.whatsappE164,
        email: COMPANY.contact.email,
        availableLanguage: ['English', 'Spanish'],
      },
    ],
    areaServed: ['Europe', 'Middle East', 'Africa', 'North America', 'Colombia'],
    knowsAbout: [
      'Colombian green coffee export',
      'Excelso European Preparation',
      'SCA cupping and Q-Grader scoring',
      'Incoterms FOB Cartagena and CIF',
      'EU Deforestation Regulation (EUDR) traceability',
      'FNC coffee export procedures',
    ],
  };
}

function productList(lang: Language) {
  const c = content(lang);
  return {
    '@type': 'ItemList',
    itemListElement: c.products.items.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.description,
        image: `${SITE_URL}${p.image}`,
        brand: { '@type': 'Brand', name: COMPANY.name },
        manufacturer: { '@id': `${SITE_URL}/#organization` },
        category: p.roastLevel === 'green' ? 'Green coffee beans' : 'Roasted coffee',
        countryOfOrigin: 'CO',
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Origin', value: p.origin },
          { '@type': 'PropertyValue', name: 'Altitude', value: p.altitude },
          { '@type': 'PropertyValue', name: 'Process', value: p.process },
          { '@type': 'PropertyValue', name: 'Sizes', value: p.weight },
        ],
      },
    })),
  };
}

/** The cup-profile page: each coffee as a Product with its cup score, origin, process and notes. */
function cupProfiles(lang: Language) {
  const c = content(lang);
  return {
    '@type': 'ItemList',
    name: c.profiles.title,
    itemListElement: c.profiles.items.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `${p.name} — ${p.grade}`,
        description: p.summary,
        brand: { '@type': 'Brand', name: COMPANY.name },
        manufacturer: { '@id': `${SITE_URL}/#organization` },
        category: 'Green coffee beans',
        countryOfOrigin: 'CO',
        url: `${absoluteUrl('profiles', lang)}#${p.id}`,
        additionalProperty: [
          { '@type': 'PropertyValue', name: c.profiles.compareLabels.score, value: p.score },
          { '@type': 'PropertyValue', name: c.profiles.compareLabels.origin, value: p.origin },
          { '@type': 'PropertyValue', name: c.profiles.compareLabels.process, value: p.process },
          { '@type': 'PropertyValue', name: c.profiles.compareLabels.acidity, value: p.acidity },
          { '@type': 'PropertyValue', name: 'Cup notes', value: p.notes.join(', ') },
        ],
      },
    })),
  };
}

function faqPage(lang: Language) {
  const c = content(lang);
  return {
    '@type': 'FAQPage',
    mainEntity: c.faq.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function head(tab: PublicTab, lang: Language): string {
  const c = content(lang);
  const meta = c.meta[tab];
  const url = absoluteUrl(tab, lang);
  const graph: unknown[] = [
    organization(lang),
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: COMPANY.name,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: PRERENDER_LANGS,
    },
    {
      '@type': 'WebPage',
      '@id': url,
      url,
      name: meta.title,
      description: meta.description,
      inLanguage: lang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
    },
  ];
  if (tab === 'green' || tab === 'products' || tab === 'home') graph.push(productList(lang));
  if (tab === 'faq') graph.push(faqPage(lang));
  if (tab === 'profiles') graph.push(cupProfiles(lang));

  const alternates = PRERENDER_LANGS.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${absoluteUrl(tab, l)}" />`,
  ).join('\n    ');

  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    alternates,
    `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(tab, 'en')}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(COMPANY.name)}" />`,
    `<meta property="og:locale" content="${lang === 'es' ? 'es_CO' : 'en_US'}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${SITE_URL}/products/grano-verde.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    jsonLd({ '@context': 'https://schema.org', '@graph': graph }),
  ].join('\n    ');
}

export function sitemap(): string {
  const today = new Date().toISOString().slice(0, 10);
  const entries = ROUTES.map((r) => {
    const alternates = PRERENDER_LANGS.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(r.tab, l)}" />`,
    ).join('\n');
    return PRERENDER_LANGS.map(
      (l) =>
        `  <url>\n    <loc>${absoluteUrl(r.tab, l)}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`,
    ).join('\n');
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`;
}
