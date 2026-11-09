import { Tag, Store, Camera } from 'lucide-react';
import { Language, Product, Tab } from '../types';
import { content, RoastedCoffeeId } from '../content';
import ProductCard from '../components/ProductCard';
import Link from '../components/Link';
import { PageHeader, SectionTitle, SpecTable } from '../components/ui';

/** Real photo of each roasted coffee (public/products/tostado), in display order. */
const ROASTED_COFFEES: RoastedCoffeeId[] = ['castillo', 'pink-bourbon', 'fresa', 'coco', 'vainilla', 'sandia'];

interface Props {
  lang: Language;
  navigate: (tab: Tab) => void;
  products: Product[];
  onZoom: (product: Product) => void;
}

export default function Products({ lang, navigate, products, onZoom }: Props) {
  const c = content(lang);
  const p = c.products;

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={p.eyebrow} title={p.title} lead={p.lead} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} onZoom={onZoom} />
          ))}
        </div>

        <p className="text-center text-sm text-coffee-500 mb-20">
          <Link tab="green" lang={lang} navigate={navigate} className="underline hover:text-coffee-800">
            {c.green.title} →
          </Link>
        </p>

        <div className="max-w-5xl mx-auto mb-20">
          <SectionTitle sub={p.gallery.lead}>{p.gallery.title}</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROASTED_COFFEES.map((id) => {
              const g = p.gallery;
              const k = g.coffees[id];
              const rows: [string, string | undefined][] = [
                [g.labels.variety, k.variety],
                [g.labels.process, k.process],
                [g.labels.fermentation, k.fermentation],
                [g.labels.origin, k.origin],
                [g.labels.altitude, k.altitude],
                [g.labels.roast, k.roast],
              ];
              return (
                <article key={id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                  <img
                    src={`/products/tostado/${id}.webp`}
                    alt={`${k.name} — ${k.tagline}`}
                    width={900}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-bold text-coffee-900">{k.name}</h3>
                    <p className="text-xs uppercase tracking-wider text-coffee-500 font-semibold mt-1 mb-4">{k.tagline}</p>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm mb-4">
                      {rows.filter(([, v]) => v).map(([label, value]) => (
                        <div key={label} className="contents">
                          <dt className="text-coffee-500">{label}</dt>
                          <dd className="m-0 text-coffee-900 font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <ul className="flex flex-wrap gap-1.5 mb-4" aria-label={g.labels.notes}>
                      {k.notes.map((n) => (
                        <li key={n} className="px-2.5 py-1 rounded-full bg-coffee-50 text-coffee-800 text-xs font-semibold">{n}</li>
                      ))}
                    </ul>
                    <p className="mt-auto pt-3 border-t border-coffee-100 text-xs text-coffee-600 leading-relaxed">
                      <span className="font-semibold text-coffee-800">{g.labels.ingredients}:</span> {k.ingredients}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="flex items-center justify-center gap-2 text-xs text-coffee-500 mt-4">
            <Camera className="w-4 h-4" aria-hidden="true" /> {p.gallery.note}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <SectionTitle sub={p.roastedLead}>{p.roastedTitle}</SectionTitle>
          <SpecTable rows={p.roasted} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <Tag className="w-6 h-6 text-gold-500" />
                <h3 className="font-display text-xl font-bold text-coffee-900">{p.privateLabel.title}</h3>
              </div>
              <p className="text-sm text-coffee-700 leading-relaxed">{p.privateLabel.text}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <Store className="w-6 h-6 text-gold-500" />
                <h3 className="font-display text-xl font-bold text-coffee-900">{p.domestic.title}</h3>
              </div>
              <p className="text-sm text-coffee-700 leading-relaxed">{p.domestic.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
