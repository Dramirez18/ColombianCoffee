import { useState, useEffect, useCallback } from 'react';
import { Language, Tab, Product, User, Order } from './types';
import { content } from './content';
import { parsePath, pathFor, PublicTab } from './router';
import { LANGUAGE_NAMES } from './i18n';
import Navbar from './components/Navbar';
import ImageLightbox from './components/ImageLightbox';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import Home from './pages/Home';
import GreenCoffee from './pages/GreenCoffee';
import Profiles from './pages/Profiles';
import Products from './pages/Products';
import Export from './pages/Export';
import Shipping from './pages/Shipping';
import Faq from './pages/Faq';
import About from './pages/About';
import Contact from './pages/Contact';

const isBrowser = typeof window !== 'undefined';
const CLIENT_ONLY_LANGS: Language[] = ['nl', 'de', 'fr', 'sv'];

interface AppProps {
  /** Path the page was requested at — drives the initial tab and language. */
  initialPath: string;
  initialLang: Language;
}

/**
 * The same component renders on the server (scripts/prerender.mjs) and in the
 * browser, so nothing here may touch window/localStorage during render —
 * only inside effects or event handlers.
 */
function App({ initialPath, initialLang }: AppProps) {
  const [activeTab, setActiveTab] = useState<Tab>(() => parsePath(initialPath).tab);
  const [lang, setLangState] = useState<Language>(initialLang);

  // Catalogue shown on the pages (and editable in the legacy admin panel)
  const [products, setProducts] = useState<Product[]>(() => content(initialLang).products.items);
  useEffect(() => { setProducts(content(lang).products.items); }, [lang]);

  // Legacy client area — loaded after mount so server and client markup match
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [clients, setClients] = useState<User[]>([]);
  const [orders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    localStorage.removeItem('huila-products');
    localStorage.removeItem('huila-cart');
    const savedUser = localStorage.getItem('huila-user');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedClients = localStorage.getItem('huila-clients');
    if (savedClients) setClients(JSON.parse(savedClients));

    // A language chosen earlier wins over the English default, unless the URL
    // explicitly asks for Spanish.
    const saved = localStorage.getItem('huila-lang') as Language | null;
    const urlLang = parsePath(window.location.pathname).lang;
    if (saved && saved in LANGUAGE_NAMES && !urlLang && saved !== initialLang) {
      setLangState(saved);
      if (saved === 'es') {
        window.history.replaceState({}, '', pathFor(parsePath(window.location.pathname).tab, 'es'));
      }
    }
    setHydrated(true);
  }, [initialLang]);

  useEffect(() => { if (hydrated) localStorage.setItem('huila-user', JSON.stringify(user)); }, [user, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem('huila-clients', JSON.stringify(clients)); }, [clients, hydrated]);

  // Image lightbox for product photos
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null);

  // --- Routing -------------------------------------------------------------
  const navigate = useCallback((tab: Tab) => {
    setActiveTab(tab);
    if (!isBrowser) return;
    const path = pathFor(tab, lang);
    if (window.location.pathname !== path) window.history.pushState({ tab }, '', path);
    window.scrollTo({ top: 0 });
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    if (!isBrowser) return;
    localStorage.setItem('huila-lang', next);
    const path = pathFor(activeTab, next);
    if (window.location.pathname !== path) window.history.replaceState({ tab: activeTab }, '', path);
  }, [activeTab]);

  useEffect(() => {
    if (!isBrowser) return;
    const onPop = () => {
      const parsed = parsePath(window.location.pathname);
      setActiveTab(parsed.tab);
      if (parsed.lang) setLangState(parsed.lang);
      else setLangState((current) => (CLIENT_ONLY_LANGS.includes(current) ? current : 'en'));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Keep <title>, description and <html lang> in sync on client-side navigation
  useEffect(() => {
    if (!isBrowser) return;
    const meta = content(lang).meta[activeTab as PublicTab];
    if (meta) {
      document.title = meta.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    }
    document.documentElement.lang = lang;
  }, [activeTab, lang]);

  // --- Legacy auth / admin -------------------------------------------------
  const handleLogin = useCallback((loginUser: User) => {
    setUser(loginUser);
    setClients((prev) => (prev.find((c) => c.email === loginUser.email) ? prev : [...prev, loginUser]));
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    navigate('home');
  }, [navigate]);

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

  const pageProps = { lang, navigate };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        navigate={navigate}
        user={user}
        onAuthClick={() => setAuthOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <Home {...pageProps} products={activeProducts} onZoom={setLightboxProduct} />
        )}
        {activeTab === 'green' && <GreenCoffee {...pageProps} />}
        {activeTab === 'profiles' && <Profiles {...pageProps} />}
        {activeTab === 'products' && (
          <Products {...pageProps} products={activeProducts} onZoom={setLightboxProduct} />
        )}
        {activeTab === 'export' && <Export {...pageProps} />}
        {activeTab === 'shipping' && <Shipping {...pageProps} />}
        {activeTab === 'faq' && <Faq {...pageProps} />}
        {activeTab === 'about' && <About {...pageProps} />}
        {activeTab === 'contact' && <Contact {...pageProps} />}

        {activeTab === 'profile' && user && (
          <UserProfile lang={lang} user={user} orders={orders} />
        )}
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

      <Footer lang={lang} navigate={navigate} />

      <AuthModal
        lang={lang}
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
      />

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
