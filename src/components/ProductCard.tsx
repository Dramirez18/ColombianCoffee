import { ShoppingCart, Info, Leaf } from 'lucide-react';
import { Product, Language, UserType } from '../types';
import { t } from '../i18n';
import { WHOLESALE_DISCOUNT } from '../constants';

interface ProductCardProps {
  product: Product;
  lang: Language;
  userType: UserType | null;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
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

export default function ProductCard({ product, lang, userType, onAddToCart, onViewDetails }: ProductCardProps) {
  const isWholesale = userType === 'wholesale';
  const wholesalePrice = product.price * (1 - WHOLESALE_DISCOUNT);
  const displayPrice = isWholesale ? wholesalePrice : product.price;
  const savings = isWholesale ? product.price - wholesalePrice : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
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
        <button
          onClick={() => onViewDetails(product)}
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
        >
          <Info className="w-5 h-5 text-coffee-700" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-coffee-900 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-coffee-500 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Flavor Notes */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.flavorNotes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="text-xs bg-coffee-50 text-coffee-600 px-2 py-0.5 rounded-full"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price & Cart */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-coffee-800">
                €{displayPrice.toFixed(2)}
              </span>
              <span className="text-xs text-coffee-400">/ {product.weight}</span>
            </div>
            {isWholesale && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-coffee-400 line-through">
                  €{product.price.toFixed(2)}
                </span>
                <span className="text-xs text-green-600 font-semibold">
                  {t(lang, 'products_you_save')} €{savings.toFixed(2)}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`p-3 rounded-full transition-all ${
              product.stock === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-coffee-700 hover:bg-coffee-600 text-white hover:shadow-lg hover:scale-110'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Stock indicator */}
        {product.stock > 0 && product.stock <= 20 && (
          <p className="text-xs text-orange-500 mt-2 font-medium">
            Only {product.stock} left in stock
          </p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-500 mt-2 font-medium">
            {t(lang, 'products_out_of_stock')}
          </p>
        )}
      </div>
    </div>
  );
}
