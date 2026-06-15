import { useState } from 'react';
import { Coffee, ShoppingCart, User, Menu, X, Search, Globe, Shield } from 'lucide-react';
import { Language, Tab, CartItem, User as UserType } from '../types';
import { t, LANGUAGE_NAMES, LANGUAGE_FLAGS } from '../i18n';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  cart: CartItem[];
  user: UserType | null;
  onCartClick: () => void;
  onAuthClick: () => void;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function Navbar({
  lang, setLang, activeTab, setActiveTab, cart, user,
  onCartClick, onAuthClick, onLogout, searchQuery, setSearchQuery,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems: { key: Tab; label: string }[] = [
    { key: 'home', label: t(lang, 'nav_home') },
    { key: 'products', label: t(lang, 'nav_products') },
    { key: 'about', label: t(lang, 'nav_about') },
  ];

  return (
    <nav className="bg-coffee-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <img src="/logo-cafe.png" alt="Entre Cafés Colombianos" className="w-10 h-10 object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-300 font-medium">Entre</span>
              <span className="text-lg font-display font-bold text-gold-400 -mt-0.5">Cafés</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-coffee-200 font-medium -mt-0.5">Colombianos</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`text-sm font-medium transition-colors hover:text-gold-400 ${
                  activeTab === item.key ? 'text-gold-400' : 'text-coffee-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center bg-coffee-800 rounded-full px-4 py-2 flex-1 max-w-xs mx-6">
            <Search className="w-4 h-4 text-coffee-400 mr-2" />
            <input
              type="text"
              placeholder={t(lang, 'nav_search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-coffee-400 outline-none w-full"
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
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

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative text-coffee-200 hover:text-gold-400 transition-colors p-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="text-coffee-200 hover:text-gold-400 transition-colors p-2"
                >
                  <User className="w-5 h-5" />
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={() => setActiveTab('admin')}
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
                className="bg-gold-500 hover:bg-gold-400 text-coffee-900 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                {t(lang, 'nav_login')}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-coffee-200 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-coffee-700 mt-2 pt-4">
            <div className="flex items-center bg-coffee-800 rounded-full px-4 py-2 mb-4">
              <Search className="w-4 h-4 text-coffee-400 mr-2" />
              <input
                type="text"
                placeholder={t(lang, 'nav_search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-white placeholder-coffee-400 outline-none w-full"
              />
            </div>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => { setActiveTab(item.key); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.key
                    ? 'bg-coffee-700 text-gold-400'
                    : 'text-coffee-200 hover:bg-coffee-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
