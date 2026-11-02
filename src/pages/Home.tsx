import { ShieldCheck, Sprout, FileCheck2, Award, Container, Scale } from 'lucide-react';
import { Language, Product, Tab } from '../types';
import { content } from '../content';
import { COMPANY } from '../constants';
import HeroCarousel from '../components/HeroCarousel';
import RoastVideo from '../components/RoastVideo';
import ProductCard from '../components/ProductCard';
import Link from '../components/Link';
import { ContactButtons } from '../components/ui';

interface HomeProps {
  lang: Language;
  navigate: (tab: Tab) => void;
  products: Product[];
  onZoom: (product: Product) => void;
}

const WHY_ICONS = [
  <FileCheck2 className="w-10 h-10" />,
  <Award className="w-10 h-10" />,
  <Container className="w-10 h-10" />,
  <Scale className="w-10 h-10" />,
];

export default function Home({ lang, navigate, products, onZoom }: HomeProps) {
  const c = content(lang);

  return (
    <>
      <HeroCarousel lang={lang} onExplore={() => navigate('green')} />

      {/* What we supply */}
      <section className="py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold mb-4">
              {c.home.productsEyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-coffee-900 mb-5 leading-tight">
              {c.home.productsTitle}
            </h2>
            <p className="text-coffee-500 max-w-xl mx-auto text-base md:text-lg">{c.home.productsLead}</p>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-8" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} onZoom={onZoom} />
            ))}
          </div>

          <div className="text-center mt-20 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              tab="green"
              lang={lang}
              navigate={navigate}
              className="bg-coffee-700 hover:bg-coffee-600 text-white px-10 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:scale-105"
            >
              {c.hero.cta} →
            </Link>
            <Link
              tab="products"
              lang={lang}
              navigate={navigate}
              className="bg-white hover:bg-coffee-50 text-coffee-800 border border-coffee-200 px-10 py-4 rounded-full font-semibold transition-all hover:shadow-lg"
            >
              {c.home.allProducts}
            </Link>
          </div>
        </div>
      </section>

      <RoastVideo lang={lang} />

      {/* Quality control at origin */}
      <section className="bg-coffee-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/products/calidad-humedad-densidad.jpg"
                alt={c.home.qcImageAlt}
                loading="lazy"
                decoding="async"
                className="w-full max-w-md mx-auto drop-shadow-xl rounded-2xl cursor-zoom-in hover:scale-[1.02] transition-transform"
                onClick={() =>
                  onZoom({
                    ...products[0],
                    name: c.home.quality.title,
                    image: '/products/calidad-humedad-densidad.jpg',
                  })
                }
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 bg-gold-500/15 text-gold-500 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <Sprout className="w-4 h-4" />
                {c.home.quality.badge}
              </span>
              <h2 className="text-3xl font-display font-bold text-coffee-900 mb-4">{c.home.quality.title}</h2>
              <p className="text-coffee-600 leading-relaxed mb-6">{c.home.quality.text}</p>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm mb-4">
                <ShieldCheck className="w-8 h-8 text-green-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-coffee-900">{COMPANY.certification} · FNC registered exporter</p>
                  <p className="text-xs text-coffee-500">{c.home.quality.certLabel}: {COMPANY.registroSanitario}</p>
                </div>
              </div>
              <p className="text-xs text-coffee-400 italic">"{COMPANY.slogan}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-coffee-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-gold-400">{c.home.why.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {c.home.why.items.map((feature, i) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gold-400">
                  {WHY_ICONS[i]}
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                <p className="text-coffee-200 text-sm leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-coffee-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold mb-3">
            {c.home.contact.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-coffee-900 mb-4">{c.home.contact.title}</h2>
          <p className="text-coffee-600 mb-8 max-w-xl mx-auto">{c.home.contact.text}</p>
          <ContactButtons whatsappLabel={c.common.whatsapp} emailLabel={c.common.email} />
          <p className="text-xs text-coffee-400 mt-4">
            {COMPANY.contact.role} · {COMPANY.contact.languages} · {COMPANY.contact.timezone}
          </p>
        </div>
      </section>
    </>
  );
}
