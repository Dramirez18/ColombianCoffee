import { Package, Settings, User as UserIcon, Building2, MapPin, Mail, Phone } from 'lucide-react';
import { Language, User, Order } from '../types';
import { t } from '../i18n';

interface UserProfileProps {
  lang: Language;
  user: User;
  orders: Order[];
}

export default function UserProfile({ lang, user, orders }: UserProfileProps) {
  const userOrders = orders.filter((o) => o.userEmail === user.email);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    processing: 'bg-indigo-100 text-indigo-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold text-coffee-900 mb-8">
        {t(lang, 'profile_title')}
      </h1>

      {/* User Info Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-coffee-100 flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-coffee-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-coffee-900">{user.name}</h2>
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mt-1 ${
              user.userType === 'wholesale'
                ? 'bg-gold-300 text-coffee-900'
                : 'bg-coffee-100 text-coffee-700'
            }`}>
              {user.userType === 'wholesale' ? t(lang, 'auth_wholesale') : t(lang, 'auth_retail')}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2 text-sm text-coffee-600">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
              {user.phone && (
                <div className="flex items-center gap-2 text-sm text-coffee-600">
                  <Phone className="w-4 h-4" />
                  {user.phone}
                </div>
              )}
              {user.address && (
                <div className="flex items-center gap-2 text-sm text-coffee-600">
                  <MapPin className="w-4 h-4" />
                  {user.address}, {user.city} {user.postalCode}
                </div>
              )}
              {user.companyName && (
                <div className="flex items-center gap-2 text-sm text-coffee-600">
                  <Building2 className="w-4 h-4" />
                  {user.companyName} {user.kvkNumber ? `(KVK: ${user.kvkNumber})` : ''}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Order History */}
      <h2 className="text-2xl font-display font-bold text-coffee-900 mb-4 flex items-center gap-2">
        <Package className="w-6 h-6" />
        {t(lang, 'profile_order_history')}
      </h2>

      {userOrders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <Package className="w-16 h-16 text-coffee-200 mx-auto mb-4" />
          <p className="text-coffee-400 text-lg">{t(lang, 'profile_no_orders')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-coffee-500">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-xs text-coffee-400">{order.createdAt}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-coffee-700">
                      {item.productName} x{item.quantity} ({item.weight})
                    </span>
                    <span className="text-coffee-600 font-medium">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-coffee-100 mt-3 pt-3 flex justify-between">
                <span className="font-semibold text-coffee-900">Total</span>
                <span className="font-bold text-coffee-900">€{order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
