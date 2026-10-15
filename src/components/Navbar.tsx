import { useState } from 'react';
import { User, Menu, X, Globe, Shield, Mail, MessageCircle } from 'lucide-react';
import { Language, Tab, User as UserType } from '../types';
import { t, LANGUAGE_NAMES, LANGUAGE_FLAGS } from '../i18n';
import { COMPANY } from '../constants';
import Link from './Link';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeTab: Tab;
  navigate: (tab: Tab) => void;
  user: UserType | null;
  onAuthClick: () => void;
  onLogout: () => void;
}

export default function Navbar({
  lang, setLang, activeTab, navigate, user,
  onAuthClick, onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navItems: { key: Tab; label: string }[] = [
    { key: 'home', label: t(lang, 'nav_home') },
    { key: 'green', label: t(lang, 'nav_green') },
    { key: 'products', label: t(lang, 'nav_products') },
    { key: 'export', label: t(lang, 'nav_export') },
    { key: 'faq', label: t(lang, 'nav_faq') },
    { key: 'about', label: t(lang, 'nav_about') },
    { key: 'contact', label: t(lang, 'nav_contact') },
  ];

  const go = (tab: Tab) => {
    navigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-coffee-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 mx-auto">
            {navItems.slice(0, 6).map((item) => (
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
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            <a
              href={`mailto:${COMPANY.contact.email}`}
              aria-label="Email"
              className="hidden sm:flex items-center gap-2 bg-coffee-800 hover:bg-coffee-700 text-coffee-100 px-3 py-2 rounded-full text-xs font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden xl:inline">Email</span>
            </a>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-label="Language selector"
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

            {/* User (legacy client area) */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('profile')}
                  aria-label="Profile"
                  className="text-coffee-200 hover:text-gold-400 transition-colors p-2"
                >
                  <User className="w-5 h-5" />
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={() => navigate('admin')}
                    aria-label="Admin"
                    className="text-coffee-200 hover:text-gold-400 transition-colors p-2"
                  >
                    <Shield className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={onLogout}
                  className="text-xs text-coffee-300 hover:text-red-400 transition-colors hidden sm:block"
                >
                  {t(lang, 'nav_logout')}
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden xl:block bg-gold-500 hover:bg-gold-400 text-coffee-900 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                {t(lang, 'nav_login')}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden text-coffee-200 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-coffee-700 mt-2 pt-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={undefined}
                onClick={() => go(item.key)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTab === item.key
                    ? 'bg-coffee-700 text-gold-400'
                    : 'text-coffee-200 hover:bg-coffee-800'
                }`}
              >
                {item.label}
              </a>
            ))}
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
