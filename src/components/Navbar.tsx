import { content } from '../content';
import { useState } from 'react';
import { User, Menu, X, Globe, Shield, Mail, MessageCircle, LogIn, LogOut } from 'lucide-react';
import { Language, Tab } from '../types';
import { useAuth } from '../auth';
import { t, LANGUAGE_NAMES, LANGUAGE_FLAGS } from '../i18n';
import { COMPANY } from '../constants';
import Link from './Link';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeTab: Tab;
  navigate: (tab: Tab) => void;
}

export default function Navbar({ lang, setLang, activeTab, navigate }: NavbarProps) {
  const auth = useAuth();
  const signedIn = auth.status === 'signedIn';
  const signOut = () => {
    void auth.signOut();
    navigate('home');
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navItems: { key: Tab; label: string }[] = [
    { key: 'home', label: t(lang, 'nav_home') },
    { key: 'green', label: t(lang, 'nav_green') },
    { key: 'products', label: t(lang, 'nav_products') },
    { key: 'export', label: t(lang, 'nav_export') },
    { key: 'shipping', label: t(lang, 'nav_shipping') },
    { key: 'faq', label: t(lang, 'nav_faq') },
    { key: 'profiles', label: t(lang, 'nav_profiles') },
    { key: 'contact', label: t(lang, 'nav_contact') },
  ];

  // Con sesión iniciada hay hasta tres íconos más a la derecha (cuenta, admin, salir): el menú
  // completo necesita más ancho, así que el hamburguesa se mantiene hasta 2xl.
  const desktopNav = signedIn ? 'hidden 2xl:flex' : 'hidden xl:flex';
  const mobileOnly = signedIn ? '2xl:hidden' : 'xl:hidden';

  const go = (tab: Tab) => {
    navigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-coffee-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl 2xl:max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link tab="home" lang={lang} navigate={navigate} className="flex items-center gap-3 group shrink-0" ariaLabel={COMPANY.name}>
            <img src="/logo-entre.webp" alt="Entre Cafés Colombianos" width={56} height={56} fetchPriority="high" className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-full bg-cream/95 p-0.5 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all" />
            <span className="flex flex-col leading-none">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-300 font-medium">Entre Cafés</span>
              <span className="text-base font-display font-bold text-gold-400 -mt-0.5">Colombianos</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-coffee-200 font-medium -mt-0.5">Green Coffee Exporters</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className={`${desktopNav} items-center gap-5 2xl:gap-7 mx-auto`}>
            {navItems.filter((item) => item.key !== 'contact').map((item) => (
              <Link
                key={item.key}
                tab={item.key}
                lang={lang}
                navigate={navigate}
                className={`text-sm font-medium transition-colors hover:text-gold-400 whitespace-nowrap ${
                  activeTab === item.key ? 'text-gold-400' : 'text-coffee-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side — contact-first B2B */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={COMPANY.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hidden sm:flex items-center gap-2 bg-green-600/90 hover:bg-green-500 text-white px-3 py-2 rounded-full text-xs font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden 2xl:inline">WhatsApp</span>
            </a>

            <a
              href={`mailto:${COMPANY.contact.email}`}
              aria-label="Email"
              className="hidden sm:flex items-center gap-2 bg-coffee-800 hover:bg-coffee-700 text-coffee-100 px-3 py-2 rounded-full text-xs font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden 2xl:inline">Email</span>
            </a>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-label={content(lang).common.languageSelector}
                aria-expanded={langMenuOpen}
                className="flex items-center gap-1 text-coffee-200 hover:text-gold-400 transition-colors p-2"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs hidden sm:inline">{LANGUAGE_FLAGS[lang]}</span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl py-1 min-w-[160px] z-50">
                  {(Object.keys(LANGUAGE_NAMES) as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-coffee-50 flex items-center gap-2 ${
                        lang === l ? 'text-coffee-700 font-semibold bg-coffee-50' : 'text-coffee-800'
                      }`}
                    >
                      <span>{LANGUAGE_FLAGS[l]}</span>
                      <span>{LANGUAGE_NAMES[l]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Customer account (Clerk). Hidden while loading or when accounts are not configured. */}
            {signedIn ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigate('account')}
                  aria-label={t(lang, 'nav_account')}
                  title={t(lang, 'nav_account')}
                  className={`hover:text-gold-400 transition-colors p-2 ${activeTab === 'account' ? 'text-gold-400' : 'text-coffee-200'}`}
                >
                  <User className="w-5 h-5" />
                </button>
                {auth.isAdmin && (
                  <button
                    onClick={() => navigate('admin')}
                    aria-label={t(lang, 'nav_admin')}
                    title={t(lang, 'nav_admin')}
                    className={`hover:text-gold-400 transition-colors p-2 ${activeTab === 'admin' ? 'text-gold-400' : 'text-coffee-200'}`}
                  >
                    <Shield className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={signOut}
                  aria-label={t(lang, 'nav_logout')}
                  title={t(lang, 'nav_logout')}
                  className="hidden sm:block text-coffee-300 hover:text-red-400 transition-colors p-2"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : auth.status === 'signedOut' ? (
              <button
                onClick={auth.openSignIn}
                aria-label={t(lang, 'nav_login')}
                title={t(lang, 'nav_login')}
                className="hidden xl:flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-coffee-900 p-2 2xl:px-4 rounded-full text-sm font-semibold transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden 2xl:inline">{t(lang, 'nav_login')}</span>
              </button>
            ) : null}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={content(lang).common.menu}
              aria-expanded={mobileMenuOpen}
              className={`${mobileOnly} text-coffee-200 p-2`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`${mobileOnly} pb-4 border-t border-coffee-700 mt-2 pt-4 space-y-1`}>
            {navItems.map((item) => (
              <Link
                key={item.key}
                tab={item.key}
                lang={lang}
                navigate={go}
                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.key
                    ? 'bg-coffee-700 text-gold-400'
                    : 'text-coffee-200 hover:bg-coffee-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {signedIn && (
              <>
                <Link tab="account" lang={lang} navigate={go} className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg text-coffee-200 hover:bg-coffee-800 transition-colors">
                  <User className="w-4 h-4" /> {t(lang, 'nav_account')}
                </Link>
                {auth.isAdmin && (
                  <Link tab="admin" lang={lang} navigate={go} className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg text-coffee-200 hover:bg-coffee-800 transition-colors">
                    <Shield className="w-4 h-4" /> {t(lang, 'nav_admin')}
                  </Link>
                )}
              </>
            )}
            {(signedIn || auth.status === 'signedOut') && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (signedIn) signOut();
                  else auth.openSignIn();
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg text-coffee-200 hover:bg-coffee-800 transition-colors"
              >
                {signedIn ? <LogOut className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                {t(lang, signedIn ? 'nav_logout' : 'nav_login')}
              </button>
            )}
            <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-coffee-800">
              <a
                href={COMPANY.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-2.5 rounded-full text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={`mailto:${COMPANY.contact.email}`}
                className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-coffee-900 px-3 py-2.5 rounded-full text-xs font-semibold"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
