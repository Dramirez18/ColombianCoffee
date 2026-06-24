import { useState, useEffect, useCallback } from 'react';
import { Mountain, Coffee, Truck, Award, ShieldCheck, Sprout, Globe2, MessageCircle, Mail } from 'lucide-react';
import { Language, Tab, Product, User, Order } from './types';
import { t } from './i18n';
import { PRODUCTS, COMPANY, EXPORT_MARKETS } from './constants';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import RoastVideo from './components/RoastVideo';
import ProductCard from './components/ProductCard';
import ImageLightbox from './components/ImageLightbox';
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

  // Products — sourced from code, no localStorage cache (B2B catalogue)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Clear any legacy products cache from old e-commerce phase
  useEffect(() => {
    localStorage.removeItem('huila-products');
    localStorage.removeItem('huila-cart');
  }, []);

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

  // Orders (kept for admin compatibility)
  const [orders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('huila-orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Image lightbox for product photos
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null);

  // Persist state
  useEffect(() => { localStorage.setItem('huila-lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('huila-user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('huila-clients', JSON.stringify(clients)); }, [clients]);

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

  const activeProducts = products.filter((p) => p.active);

  const lightboxCaption = lightboxProduct
    ? `${lightboxProduct.name} · ${lightboxProduct.origin} · ${lightboxProduct.altitude} · ${lightboxProduct.process}`
    : undefined;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onAuthClick={() => setAuthOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* HOME */}
        {activeTab === 'home' && (
          <>
            <HeroCarousel lang={lang} onExplore={() => setActiveTab('products')} />

            {/* Featured Products — B2B wholesale */}
            <section className="py-24 lg:py-28">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title block — full width, content centered */}
                <div className="text-center mb-20">
                  <span className="inline-block text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold mb-4">
                    Wholesale · Samples · Bulk
                  </span>
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-coffee-900 mb-5 leading-tight">
                    {t(lang, 'products_title')}
                  </h2>
                  <p className="text-coffee-500 max-w-xl mx-auto text-base md:text-lg">
                    Specialty Colombian coffee in three formats. Click any photo to inspect bean quality up close.
                  </p>
                  <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-8" aria-hidden="true" />
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                  {activeProducts.slice(0, 3).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      lang={lang}
                      onZoom={setLightboxProduct}
                    />
                  ))}
                </div>

                {/* All Coffee CTA — clear separation */}
                <div className="text-center mt-20">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="bg-coffee-700 hover:bg-coffee-600 text-white px-10 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:scale-105"
                  >
                    {t(lang, 'products_all')} →
                  </button>
                </div>
              </div>
            </section>

            {/* Roast video — vertical reel */}
            <RoastVideo />

            {/* Quality & Commitment — CoffMeter showcase */}
            <section className="bg-coffee-50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <img
                      src="/products/calidad-humedad-densidad.jpg"
                      alt="Quality control — CoffMeter measuring moisture (10.9%) and density (797 g/L) of our green coffee"
                      loading="lazy"
                      decoding="async"
                      className="w-full max-w-md mx-auto drop-shadow-xl rounded-2xl cursor-zoom-in hover:scale-[1.02] transition-transform"
                      onClick={() => setLightboxProduct({
                        ...(activeProducts[0] || PRODUCTS[0]),
                        name: 'Quality control — moisture & density',
                        description: 'Real reading: 10.9% moisture, 797 g/L density, 27.9°C sample temperature. Within Excelso UGQ specs.',
                        image: '/products/calidad-humedad-densidad.jpg',
                      } as Product)}
                    />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-2 bg-gold-500/15 text-gold-500 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                      <Sprout className="w-4 h-4" />
                      Quality &amp; commitment
                    </span>
                    <h2 className="text-3xl font-display font-bold text-coffee-900 mb-4">
                      Every lot, measured. Every batch, traceable.
                    </h2>
                    <p className="text-coffee-600 leading-relaxed mb-6">
                      We check moisture, density and screen size on every sample before we ship. Pictured: an actual reading from a recent green coffee lot — <strong>10.9% moisture, 797 g/L density</strong>, well within Excelso UGQ specifications. Cupped, graded and documented for full traceability from {COMPANY.regions} to your roastery.
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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

            {/* Contact CTA */}
            <section className="bg-coffee-50 py-16">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold mb-3">
                  B2B · Wholesale only
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-coffee-900 mb-4">
                  Start a conversation
                </h2>
                <p className="text-coffee-600 mb-8 max-w-xl mx-auto">
                  We work directly with roasters, importers and distributors. Tell us about your destination, volume and timeline — we'll send a tailored offer and origin samples.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={COMPANY.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp {COMPANY.contact.whatsapp}
                  </a>
                  <a
                    href={`mailto:${COMPANY.contact.email}`}
                    className="inline-flex items-center justify-center gap-2 bg-coffee-800 hover:bg-coffee-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
                  >
                    <Mail className="w-5 h-5" />
                    {COMPANY.contact.email}
                  </a>
                </div>
                <p className="text-xs text-coffee-400 mt-4">
                  {COMPANY.contact.role} · {COMPANY.contact.languages} · {COMPANY.contact.timezone}
                </p>
              </div>
            </section>
          </>
        )}

        {/* PRODUCTS */}
        {activeTab === 'products' && (
          <section className="py-24 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold mb-4">
                  Wholesale catalogue
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-coffee-900 mb-5 leading-tight">
                  {t(lang, 'products_title')}
                </h1>
                <p className="text-coffee-500 max-w-xl mx-auto text-base md:text-lg">
                  All coffee is whole bean. Click any photo to inspect bean quality.
                  Pricing on request based on origin lot, volume and Incoterm.
                </p>
                <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-8" aria-hidden="true" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {activeProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    lang={lang}
                    onZoom={setLightboxProduct}
                  />
                ))}
              </div>
            </div>
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
                src="/hero/plantacion-cordillera.webp"
                alt="Coffee plantation at sunrise in the Colombian cordillera"
                loading="lazy"
                decoding="async"
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
                    <p className="text-sm text-coffee-500">{COMPANY.regions}</p>
                  </div>
                  <div className="bg-coffee-50 rounded-xl p-6 text-center">
                    <Coffee className="w-8 h-8 text-coffee-600 mx-auto mb-3" />
                    <h3 className="font-display font-bold text-coffee-900 mb-1">
                      {t(lang, 'products_altitude')}
                    </h3>
                    <p className="text-sm text-coffee-500">{COMPANY.altitude}</p>
                  </div>
                  <div className="bg-coffee-50 rounded-xl p-6 text-center">
                    <Award className="w-8 h-8 text-coffee-600 mx-auto mb-3" />
                    <h3 className="font-display font-bold text-coffee-900 mb-1">
                      Specialty Grade
                    </h3>
                    <p className="text-sm text-coffee-500">{COMPANY.scaScore}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Markets */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <Globe2 className="w-8 h-8 text-coffee-600" />
                <h2 className="text-2xl font-display font-bold text-coffee-900">
                  {t(lang, 'about_delivery')}
                </h2>
              </div>
              <p className="text-coffee-600 mb-6">{t(lang, 'about_delivery_text')}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {EXPORT_MARKETS.map((market) => (
                  <div
                    key={market.code}
                    className="flex items-center gap-2 bg-coffee-50 rounded-lg px-3 py-2"
                  >
                    <img
                      src={`https://flagcdn.com/w40/${market.code.toLowerCase()}.png`}
                      alt={market.name}
                      className="w-5 h-3.5 rounded-sm object-cover shrink-0"
                    />
                    <span className="text-sm text-coffee-700 font-medium">{market.name}</span>
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

      {/* Auth Modal */}
      <AuthModal
        lang={lang}
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
      />

      {/* Image lightbox */}
      <ImageLightbox
        src={lightboxProduct?.image || null}
        alt={lightboxProduct?.name}
        caption={lightboxCaption}
        onClose={() => setLightboxProduct(null)}
      />
    </div>
  );
}

export default App;
