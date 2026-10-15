import { Tag, Store } from 'lucide-react';
import { Language, Product, Tab } from '../types';
import { content } from '../content';
import ProductCard from '../components/ProductCard';
import Link from '../components/Link';
import { PageHeader, SectionTitle, SpecTable } from '../components/ui';

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
