import { Leaf, ZoomIn, MessageCircle, Mail } from 'lucide-react';
import { Product, Language } from '../types';
import { t } from '../i18n';
import { COMPANY } from '../constants';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onZoom: (product: Product) => void;
}

const ROAST_COLORS: Record<string, string> = {
  green: 'bg-green-100 text-green-800',
  medium: 'bg-amber-100 text-amber-800',
  'medium-high': 'bg-orange-100 text-orange-800',
  decaf: 'bg-blue-100 text-blue-800',
};

const ROAST_KEY: Record<string, string> = {
  green: 'roast_green',
  medium: 'roast_medium',
  'medium-high': 'roast_medium_high',
  decaf: 'roast_decaf',
};

export default function ProductCard({ product, lang, onZoom }: ProductCardProps) {
  const inquirySubject = encodeURIComponent(
    `Inquiry — ${product.name} (Entre Cafés Colombianos)`
  );
  const inquiryBody = encodeURIComponent(
    `Hello,\n\nI'm interested in your "${product.name}".\n\n` +
    `Quantity / sample size: \n` +
    `Destination country: \n` +
    `Preferred Incoterm (FOB / CIF): \n` +
    `Timeline: \n\n` +
    `Thanks.`
  );
  const mailtoLink = `mailto:${COMPANY.contact.email}?subject=${inquirySubject}&body=${inquiryBody}`;
  const whatsappLink = `${COMPANY.contact.whatsappLink}?text=${encodeURIComponent(
    `Hi! I'd like info about: ${product.name}`
  )}`;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
      {/* Image — clickable for zoom */}
      <button
        type="button"
        onClick={() => onZoom(product)}
        aria-label={`Zoom photo of ${product.name}`}
        className="relative h-56 overflow-hidden cursor-zoom-in"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-coffee-900/0 group-hover:bg-coffee-900/15 transition-colors" />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${ROAST_COLORS[product.roastLevel]}`}>
            {t(lang, ROAST_KEY[product.roastLevel] as any)}
          </span>
        </div>
        {product.roastLevel === 'green' && (
          <div className="absolute top-3 right-3">
            <Leaf className="w-6 h-6 text-green-500 drop-shadow-md" />
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-white/90 group-hover:bg-white p-2 rounded-full shadow-md transition-all">
          <ZoomIn className="w-5 h-5 text-coffee-700" />
        </div>
      </button>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-lg font-bold text-coffee-900 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-coffee-500 mb-3 line-clamp-3">
          {product.description}
        </p>

        {/* Flavor Notes */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.flavorNotes.slice(0, 4).map((note) => (
            <span
              key={note}
              className="text-xs bg-coffee-50 text-coffee-600 px-2 py-0.5 rounded-full"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Specs — wholesale focused */}
        <div className="grid grid-cols-2 gap-2 text-xs text-coffee-600 mb-4 pb-4 border-b border-coffee-100">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-coffee-400">Altitude</span>
            <span className="font-semibold">{product.altitude}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-coffee-400">Process</span>
            <span className="font-semibold">{product.process}</span>
          </div>
          <div className="col-span-2">
            <span className="block text-[10px] uppercase tracking-wider text-coffee-400">Sample size</span>
            <span className="font-semibold">{product.weight}</span>
          </div>
        </div>

        {/* CTAs — Contact for pricing */}
        <div className="mt-auto space-y-2">
          <p className="text-[11px] text-coffee-500 italic mb-2">
            Wholesale — pricing on request based on origin lot, volume and Incoterm.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-500 text-white px-3 py-2.5 rounded-full text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <a
              href={mailtoLink}
              className="flex items-center justify-center gap-1.5 bg-coffee-800 hover:bg-coffee-700 text-white px-3 py-2.5 rounded-full text-xs font-semibold transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
