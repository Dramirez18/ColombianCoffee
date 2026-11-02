import { useState, useEffect, useCallback } from 'react';
import { Language, Tab, Product } from './types';
import { content } from './content';
import { isLanguage } from './locale';
import { parsePath, pathFor, PublicTab } from './router';
import Navbar from './components/Navbar';
import ImageLightbox from './components/ImageLightbox';
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
import Privacy from './pages/Privacy';
import Account from './pages/Account';
import Admin from './pages/Admin';
import { AuthProvider } from './auth';

const isBrowser = typeof window !== 'undefined';

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

  // Catalogue shown on the pages
  const products = content(lang).products.items;

  useEffect(() => {
    localStorage.removeItem('huila-products');
    localStorage.removeItem('huila-cart');

    // A language chosen earlier wins over the English default, unless the URL
    // explicitly names a language.
    const saved = localStorage.getItem('huila-lang');
    const urlLang = parsePath(window.location.pathname).lang;
    if (isLanguage(saved) && !urlLang && saved !== initialLang) {
      setLangState(saved);
      window.history.replaceState({}, '', pathFor(parsePath(window.location.pathname).tab, saved));
    }
  }, [initialLang]);

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
      setLangState(parsed.lang ?? 'en');
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

  const activeProducts = products.filter((p) => p.active);

  const lightboxCaption = lightboxProduct
    ? `${lightboxProduct.name} · ${lightboxProduct.origin} · ${lightboxProduct.altitude} · ${lightboxProduct.process}`
    : undefined;

  const pageProps = { lang, navigate };

  return (
    <AuthProvider lang={lang} activeTab={activeTab}>
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar lang={lang} setLang={setLang} activeTab={activeTab} navigate={navigate} />

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

        {activeTab === 'privacy' && <Privacy {...pageProps} />}
        {activeTab === 'account' && <Account {...pageProps} />}
        {activeTab === 'admin' && <Admin {...pageProps} />}
      </main>

      <Footer lang={lang} navigate={navigate} />

      <ImageLightbox
        src={lightboxProduct?.image || null}
        alt={lightboxProduct?.name}
        caption={lightboxCaption}
        onClose={() => setLightboxProduct(null)}
        previewLabel={content(lang).common.imagePreview}
        closeLabel={content(lang).common.close}
      />
    </div>
    </AuthProvider>
  );
}

export default App;
