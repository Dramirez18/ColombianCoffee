import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem, Language, UserType } from '../types';
import { t } from '../i18n';
import { WHOLESALE_DISCOUNT } from '../constants';

interface CartProps {
  lang: Language;
  cart: CartItem[];
  userType: UserType | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export default function Cart({
  lang, cart, userType, isOpen, onClose,
  onUpdateQuantity, onRemoveItem, onClearCart, onCheckout,
}: CartProps) {
  const isWholesale = userType === 'wholesale';

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  );
  const discount = isWholesale ? subtotal * WHOLESALE_DISCOUNT : 0;
  const total = subtotal - discount;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-coffee-100">
          <h2 className="text-xl font-display font-bold text-coffee-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-coffee-600" />
            {t(lang, 'cart_title')}
          </h2>
          <button
            onClick={onClose}
            className="text-coffee-400 hover:text-coffee-700 transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-coffee-200 mx-auto mb-4" />
              <p className="text-coffee-400 text-lg">{t(lang, 'cart_empty')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                const itemPrice = isWholesale
                  ? item.product.price * (1 - WHOLESALE_DISCOUNT)
                  : item.product.price;

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-4 bg-coffee-50 rounded-xl p-4"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-coffee-900 text-sm truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-coffee-400 mt-0.5">
                        {item.product.weight}
                      </p>
                      <p className="text-coffee-700 font-bold mt-1">
                        €{itemPrice.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full bg-white border border-coffee-200 flex items-center justify-center hover:bg-coffee-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full bg-white border border-coffee-200 flex items-center justify-center hover:bg-coffee-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="ml-auto text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with totals */}
        {cart.length > 0 && (
          <div className="border-t border-coffee-100 p-6 space-y-3">
            <div className="flex justify-between text-sm text-coffee-600">
              <span>{t(lang, 'cart_subtotal')}</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            {isWholesale && discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>{t(lang, 'cart_discount')} (-{(WHOLESALE_DISCOUNT * 100).toFixed(0)}%)</span>
                <span>-€{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-coffee-900 pt-2 border-t border-coffee-200">
              <span>{t(lang, 'cart_total')}</span>
              <span>€{total.toFixed(2)}</span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-coffee-700 hover:bg-coffee-600 text-white py-3 rounded-xl font-semibold transition-colors mt-2"
            >
              {t(lang, 'cart_checkout')}
            </button>
            <button
              onClick={onClearCart}
              className="w-full text-sm text-coffee-400 hover:text-red-500 transition-colors py-2"
            >
              {t(lang, 'cart_clear')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
