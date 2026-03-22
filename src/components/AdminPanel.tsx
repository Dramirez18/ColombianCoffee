import { useState } from 'react';
import {
  LayoutDashboard, Package, ShoppingCart, Users, TrendingUp,
  Edit3, Trash2, Save, X, Plus, Eye, EyeOff,
} from 'lucide-react';
import { Language, Product, Order, User } from '../types';
import { t } from '../i18n';

interface AdminPanelProps {
  lang: Language;
  products: Product[];
  orders: Order[];
  clients: User[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onAddProduct: (product: Product) => void;
}

type AdminTab = 'dashboard' | 'products' | 'orders' | 'clients';

export default function AdminPanel({
  lang, products, orders, clients,
  onUpdateProduct, onDeleteProduct, onAddProduct,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeProducts = products.filter((p) => p.active).length;

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: t(lang, 'admin_dashboard'), icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: 'products', label: t(lang, 'admin_products'), icon: <Package className="w-4 h-4" /> },
    { key: 'orders', label: t(lang, 'admin_orders'), icon: <ShoppingCart className="w-4 h-4" /> },
    { key: 'clients', label: t(lang, 'admin_clients'), icon: <Users className="w-4 h-4" /> },
  ];

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const saveEdit = () => {
    if (editingId && editForm) {
      onUpdateProduct(editForm as Product);
      setEditingId(null);
      setEditForm({});
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold text-coffee-900 mb-6">
        {t(lang, 'admin_title')}
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? 'bg-coffee-700 text-white'
                : 'bg-white text-coffee-600 hover:bg-coffee-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: t(lang, 'admin_total_products'), value: products.length, sub: `${activeProducts} active`, icon: <Package className="w-6 h-6" />, color: 'bg-amber-50 text-amber-700' },
              { label: t(lang, 'admin_total_orders'), value: orders.length, sub: `${orders.filter(o => o.status === 'pending').length} pending`, icon: <ShoppingCart className="w-6 h-6" />, color: 'bg-blue-50 text-blue-700' },
              { label: t(lang, 'admin_total_clients'), value: clients.length, sub: `${clients.filter(c => c.userType === 'wholesale').length} wholesale`, icon: <Users className="w-6 h-6" />, color: 'bg-green-50 text-green-700' },
              { label: t(lang, 'admin_revenue'), value: `€${totalRevenue.toFixed(2)}`, sub: 'Total', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-purple-50 text-purple-700' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl shadow-md p-6">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                  {stat.icon}
                </div>
                <p className="text-sm text-coffee-500">{stat.label}</p>
                <p className="text-2xl font-bold text-coffee-900 mt-1">{stat.value}</p>
                <p className="text-xs text-coffee-400 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Quick overview */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-display font-bold text-coffee-900 mb-4">Product Overview</h3>
            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-coffee-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-medium text-coffee-800">{p.name}</p>
                      <p className="text-xs text-coffee-400">{p.weight}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-coffee-700">€{p.price.toFixed(2)}</p>
                    <p className={`text-xs ${p.stock > 20 ? 'text-green-600' : p.stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
                      Stock: {p.stock}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Management */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-coffee-50">
                <tr>
                  <th className="text-left p-4 text-xs font-semibold text-coffee-600 uppercase">Product</th>
                  <th className="text-left p-4 text-xs font-semibold text-coffee-600 uppercase">Price</th>
                  <th className="text-left p-4 text-xs font-semibold text-coffee-600 uppercase">Stock</th>
                  <th className="text-left p-4 text-xs font-semibold text-coffee-600 uppercase">Weight</th>
                  <th className="text-left p-4 text-xs font-semibold text-coffee-600 uppercase">Status</th>
                  <th className="text-right p-4 text-xs font-semibold text-coffee-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-coffee-50 hover:bg-coffee-50/50">
                    {editingId === product.id ? (
                      <>
                        <td className="p-4">
                          <input
                            value={editForm.name || ''}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full px-2 py-1 border border-coffee-200 rounded text-sm"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.price || 0}
                            onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                            className="w-20 px-2 py-1 border border-coffee-200 rounded text-sm"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="number"
                            value={editForm.stock || 0}
                            onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) })}
                            className="w-20 px-2 py-1 border border-coffee-200 rounded text-sm"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            value={editForm.weight || ''}
                            onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                            className="w-20 px-2 py-1 border border-coffee-200 rounded text-sm"
                          />
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => setEditForm({ ...editForm, active: !editForm.active })}
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              editForm.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {editForm.active ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={saveEdit} className="text-green-600 hover:text-green-800 p-1">
                              <Save className="w-4 h-4" />
                            </button>
                            <button onClick={cancelEdit} className="text-red-500 hover:text-red-700 p-1">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="text-sm font-medium text-coffee-800">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-coffee-700 font-medium">€{product.price.toFixed(2)}</td>
                        <td className="p-4">
                          <span className={`text-sm font-medium ${product.stock > 20 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-coffee-600">{product.weight}</td>
                        <td className="p-4">
                          <button
                            onClick={() => onUpdateProduct({ ...product, active: !product.active })}
                            className="p-1"
                          >
                            {product.active ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-red-400" />
                            )}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => startEdit(product)} className="text-coffee-500 hover:text-coffee-700 p-1">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDeleteProduct(product.id)} className="text-red-400 hover:text-red-600 p-1">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-coffee-200 mx-auto mb-4" />
              <p className="text-coffee-400 text-lg">No orders yet</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-coffee-900">{order.userName}</p>
                    <p className="text-xs text-coffee-400">{order.userEmail} | {order.userType}</p>
                    <p className="text-xs text-coffee-400">{order.createdAt}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm text-coffee-600">
                      <span>{item.productName} x{item.quantity}</span>
                      <span>€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-coffee-100 mt-3 pt-3 flex justify-between font-bold text-coffee-900">
                  <span>Total</span>
                  <span>€{order.total.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Clients */}
      {activeTab === 'clients' && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {clients.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-coffee-200 mx-auto mb-4" />
              <p className="text-coffee-400 text-lg">No clients yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-coffee-50">
                  <tr>
                    <th className="text-left p-4 text-xs font-semibold text-coffee-600 uppercase">Name</th>
                    <th className="text-left p-4 text-xs font-semibold text-coffee-600 uppercase">Email</th>
                    <th className="text-left p-4 text-xs font-semibold text-coffee-600 uppercase">Type</th>
                    <th className="text-left p-4 text-xs font-semibold text-coffee-600 uppercase">City</th>
                    <th className="text-left p-4 text-xs font-semibold text-coffee-600 uppercase">Company</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-t border-coffee-50 hover:bg-coffee-50/50">
                      <td className="p-4 text-sm font-medium text-coffee-800">{client.name}</td>
                      <td className="p-4 text-sm text-coffee-600">{client.email}</td>
                      <td className="p-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          client.userType === 'wholesale'
                            ? 'bg-gold-300 text-coffee-900'
                            : 'bg-coffee-100 text-coffee-700'
                        }`}>
                          {client.userType}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-coffee-600">{client.city || '-'}</td>
                      <td className="p-4 text-sm text-coffee-600">{client.companyName || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
