import { useState, useEffect, useCallback } from 'react';
import { Mountain, Coffee, Truck, Award, MapPin, X, ShieldCheck, Sprout } from 'lucide-react';
import { Language, Tab, Product, CartItem, User, Order } from './types';
import { t } from './i18n';
import { PRODUCTS, WHOLESALE_DISCOUNT, COMPANY } from './constants';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

function App() {
  // Language
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('huila-lang') as Language) || 'en';
  });

  // Navigation
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('huila-products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('huila-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  // Auth
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('huila-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authOpen, setAuthOpen] = useState(false);
  const [clients, setClients] = useState<User[]>(() => {
    const saved = localStorage.getItem('huila-clients');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('huila-orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Product Detail Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Persist state
  useEffect(() => { localStorage.setItem('huila-lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('huila-products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('huila-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('huila-user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('huila-clients', JSON.stringify(clients)); }, [clients]);
  useEffect(() => { localStorage.setItem('huila-orders', JSON.stringify(orders)); }, [orders]);

  // Cart actions
  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  // Auth
  const handleLogin = useCallback((loginUser: User) => {
    setUser(loginUser);
    setClients((prev) => {
      if (prev.find((c) => c.email === loginUser.email)) return prev;
      return [...prev, loginUser];
    });
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setActiveTab('home');
  }, []);

  // Checkout
  const handleCheckout = useCallback(() => {
    if (!user) {
      setCartOpen(false);
      setAuthOpen(true);
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const isWholesale = user.userType === 'wholesale';
    const discount = isWholesale ? subtotal * WHOLESALE_DISCOUNT : 0;

    const order: Order = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userType: user.userType,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: isWholesale
          ? item.product.price * (1 - WHOLESALE_DISCOUNT)
          : item.product.price,
        weight: item.product.weight,
      })),
      subtotal,
      discount,
      total: subtotal - discount,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      province: user.province,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setCartOpen(false);
    setActiveTab('profile');
  }, [user, cart]);

  // Admin product actions
  const handleUpdateProduct = useCallback((updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  }, []);

  const handleDeleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleAddProduct = useCallback((product: Product) => {
    setProducts((prev) => [...prev, product]);
  }, []);

  // Filtered products
  const displayProducts = products.filter((p) => {
    if (!p.active) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.flavorNotes.some((n) => n.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        user={user}
        onCartClick={() => setCartOpen(true)}
        onAuthClick={() => setAuthOpen(true)}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1">
        {/* HOME */}
        {activeTab === 'home' && (
          <>
            <HeroCarousel lang={lang} onExplore={() => setActiveTab('products')} />

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-coffee-900 mb-4">
                  {t(lang, 'products_title')}
                </h2>
                <p className="text-coffee-500 max-w-2xl mx-auto">
                  {t(lang, 'about_story').substring(0, 120)}...
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter((p) => p.active).slice(0, 3).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    lang={lang}
                    userType={user?.userType || null}
                    onAddToCart={addToCart}
                    onViewDetails={setSelectedProduct}
                  />
                ))}
              </div>

              <div className="text-center mt-10">
                <button
                  onClick={() => setActiveTab('products')}
                  className="bg-coffee-700 hover:bg-coffee-600 text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
                >
                  {t(lang, 'products_all')} →
                </button>
              </div>
            </section>

            {/* Our Products Showcase */}
            <section className="bg-coffee-50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=800&h=800&fit=crop"
                      alt="Entre Cafés Colombianos - Specialty Coffee Beans"
                      className="w-full max-w-md mx-auto drop-shadow-xl rounded-2xl"
                    />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-2 bg-gold-500/15 text-gold-500 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                      <Sprout className="w-4 h-4" />
                      {COMPANY.regions}
                    </span>
                    <h2 className="text-3xl font-display font-bold text-coffee-900 mb-4">
                      Our Specialty Coffee Collection
                    </h2>
                    <p className="text-coffee-600 leading-relaxed mb-6">
                      Specialty Colombian coffee sourced from our network of farms across {COMPANY.regions}, cultivated at {COMPANY.altitude}. Each lot is carefully selected, cupped and graded to deliver a consistent profile of {COMPANY.flavorProfile.toLowerCase()} — scoring {COMPANY.scaScore}.
                    </p>
                    <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm mb-4">
                      <ShieldCheck className="w-8 h-8 text-green-600 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-coffee-900">{COMPANY.certification}</p>
                        <p className="text-xs text-coffee-500">Registro Sanitario: {COMPANY.registroSanitario}</p>
                      </div>
                    </div>
                    <p className="text-xs text-coffee-400 italic">
                      "{COMPANY.slogan}"
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Entre Cafés Colombianos */}
            <section className="bg-coffee-800 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-display font-bold text-center mb-12 text-gold-400">
                  Why {COMPANY.name}?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                    {
                      icon: <Mountain className="w-10 h-10" />,
                      title: COMPANY.altitude,
                      desc: `Grown high in the Colombian Andes across ${COMPANY.regions}, where altitude, volcanic soil and microclimate produce exceptional density and complexity.`,
                    },
                    {
                      icon: <Award className="w-10 h-10" />,
                      title: `Specialty ${COMPANY.scaScore}`,
                      desc: `Every lot is cupped and graded. We only export coffee that meets specialty standards — consistently scoring ${COMPANY.scaScore} with a profile of ${COMPANY.flavorProfile.toLowerCase()}.`,
                    },
                    {
                      icon: <ShieldCheck className="w-10 h-10" />,
                      title: 'INVIMA Certified',
                      desc: `Certified by Colombia's national health authority. Registro Sanitario ${COMPANY.registroSanitario}.`,
                    },
                    {
                      icon: <Truck className="w-10 h-10" />,
                      title: 'Worldwide Export',
                      desc: 'Direct export from Colombia to Europe, the UAE and South Africa. DHL air freight for samples and small lots, CIF for container shipments.',
                    },
                  ].map((feature) => (
                    <div key={feature.title} className="text-center">
                      <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gold-400">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                      <p className="text-coffee-200 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* PRODUCTS */}
        {activeTab === 'products' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-coffee-900 mb-8">
              {t(lang, 'products_title')}
            </h1>

            {user?.userType === 'wholesale' && (
              <div className="bg-gold-300/20 border border-gold-400/30 rounded-xl p-4 mb-8 flex items-center gap-3">
                <Coffee className="w-6 h-6 text-gold-500" />
                <p className="text-sm text-coffee-700">
                  <strong>Wholesale pricing active!</strong> You receive an {(WHOLESALE_DISCOUNT * 100).toFixed(0)}% discount on all products.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  lang={lang}
                  userType={user?.userType || null}
                  onAddToCart={addToCart}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>

            {displayProducts.length === 0 && (
              <div className="text-center py-16">
                <Coffee className="w-16 h-16 text-coffee-200 mx-auto mb-4" />
                <p className="text-coffee-400 text-lg">No products found</p>
              </div>
            )}
          </section>
        )}

        {/* ABOUT */}
        {activeTab === 'about' && (
          <section className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-coffee-900 mb-8">
              {t(lang, 'about_title')}
            </h1>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
              <img
                src="https://images.unsplash.com/photo-1524350876685-274059332603?w=1200&h=500&fit=crop"
                alt="Coffee Farm Huila"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="p-8">
                <p className="text-coffee-700 leading-relaxed text-lg mb-6">
                  {t(lang, 'about_story')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-coffee-50 rounded-xl p-6 text-center">
                    <Mountain className="w-8 h-8 text-coffee-600 mx-auto mb-3" />
                    <h3 className="font-display font-bold text-coffee-900 mb-1">
                      {t(lang, 'products_origin')}
                    </h3>
                    <p className="text-sm text-coffee-500">Huila, Colombia</p>
                  </div>
                  <div className="bg-coffee-50 rounded-xl p-6 text-center">
                    <Coffee className="w-8 h-8 text-coffee-600 mx-auto mb-3" />
                    <h3 className="font-display font-bold text-coffee-900 mb-1">
                      {t(lang, 'products_altitude')}
                    </h3>
                    <p className="text-sm text-coffee-500">1,600 - 2,100 masl</p>
                  </div>
                  <div className="bg-coffee-50 rounded-xl p-6 text-center">
                    <Award className="w-8 h-8 text-coffee-600 mx-auto mb-3" />
                    <h3 className="font-display font-bold text-coffee-900 mb-1">
                      Specialty Grade
                    </h3>
                    <p className="text-sm text-coffee-500">Score 80+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Map Area */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-8 h-8 text-coffee-600" />
                <h2 className="text-2xl font-display font-bold text-coffee-900">
                  {t(lang, 'about_delivery')}
                </h2>
              </div>
              <p className="text-coffee-600 mb-6">{t(lang, 'about_delivery_text')}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  'Drenthe', 'Flevoland', 'Friesland', 'Gelderland',
                  'Groningen', 'Limburg', 'Noord-Brabant', 'Noord-Holland',
                  'Overijssel', 'Utrecht', 'Zeeland', 'Zuid-Holland',
                ].map((province) => (
                  <div
                    key={province}
                    className="flex items-center gap-2 bg-coffee-50 rounded-lg px-3 py-2"
                  >
                    <MapPin className="w-4 h-4 text-gold-500" />
                    <span className="text-sm text-coffee-700 font-medium">{province}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PROFILE */}
        {activeTab === 'profile' && user && (
          <UserProfile lang={lang} user={user} orders={orders} />
        )}

        {/* ADMIN */}
        {activeTab === 'admin' && user?.role === 'admin' && (
          <AdminPanel
            lang={lang}
            products={products}
            orders={orders}
            clients={clients}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onAddProduct={handleAddProduct}
          />
        )}
      </main>

      <Footer lang={lang} setActiveTab={setActiveTab} />

      {/* Cart Sidebar */}
      <Cart
        lang={lang}
        cart={cart}
        userType={user?.userType || null}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
      />

      {/* Auth Modal */}
      <AuthModal
        lang={lang}
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setSelectedProduct(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5 text-coffee-700" />
                </button>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-display font-bold text-coffee-900 mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-coffee-600 leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-coffee-50 rounded-xl p-4">
                    <p className="text-xs text-coffee-400 uppercase font-semibold">{t(lang, 'products_origin')}</p>
                    <p className="text-sm text-coffee-800 font-medium mt-1">{selectedProduct.origin}</p>
                  </div>
                  <div className="bg-coffee-50 rounded-xl p-4">
                    <p className="text-xs text-coffee-400 uppercase font-semibold">{t(lang, 'products_altitude')}</p>
                    <p className="text-sm text-coffee-800 font-medium mt-1">{selectedProduct.altitude}</p>
                  </div>
                  <div className="bg-coffee-50 rounded-xl p-4">
                    <p className="text-xs text-coffee-400 uppercase font-semibold">{t(lang, 'products_process')}</p>
                    <p className="text-sm text-coffee-800 font-medium mt-1">{selectedProduct.process}</p>
                  </div>
                  <div className="bg-coffee-50 rounded-xl p-4">
                    <p className="text-xs text-coffee-400 uppercase font-semibold">{t(lang, 'products_weight')}</p>
                    <p className="text-sm text-coffee-800 font-medium mt-1">{selectedProduct.weight}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-coffee-400 uppercase font-semibold mb-2">{t(lang, 'products_flavor_notes')}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.flavorNotes.map((note) => (
                      <span
                        key={note}
                        className="bg-coffee-100 text-coffee-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-coffee-800">
                      €{user?.userType === 'wholesale'
                        ? (selectedProduct.price * (1 - WHOLESALE_DISCOUNT)).toFixed(2)
                        : selectedProduct.price.toFixed(2)
                      }
                    </span>
                    {user?.userType === 'wholesale' && (
                      <span className="text-sm text-coffee-400 line-through ml-2">
                        €{selectedProduct.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    disabled={selectedProduct.stock === 0}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                      selectedProduct.stock === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-coffee-700 hover:bg-coffee-600 text-white hover:shadow-lg'
                    }`}
                  >
                    {selectedProduct.stock === 0
                      ? t(lang, 'products_out_of_stock')
                      : t(lang, 'products_add_to_cart')
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
