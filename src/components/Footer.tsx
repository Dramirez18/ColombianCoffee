import { MapPin, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import { Language, Tab } from '../types';
import { t } from '../i18n';
import { COMPANY } from '../constants';
import Link from './Link';

interface FooterProps {
  lang: Language;
  navigate: (tab: Tab) => void;
}

export default function Footer({ lang, navigate }: FooterProps) {
  const links: { key: Tab; label: string }[] = [
    { key: 'home', label: t(lang, 'nav_home') },
    { key: 'green', label: t(lang, 'nav_green') },
    { key: 'profiles', label: t(lang, 'nav_profiles') },
    { key: 'products', label: t(lang, 'nav_products') },
    { key: 'export', label: t(lang, 'nav_export') },
    { key: 'shipping', label: t(lang, 'nav_shipping') },
    { key: 'faq', label: t(lang, 'nav_faq') },
    { key: 'about', label: t(lang, 'nav_about') },
    { key: 'contact', label: t(lang, 'nav_contact') },
    { key: 'privacy', label: t(lang, 'nav_privacy') },
  ];

  return (
    <footer className="bg-coffee-900 text-coffee-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-entre.webp" alt={COMPANY.name} width={56} height={56} loading="lazy" decoding="async" className="w-14 h-14 object-contain rounded-full bg-cream/95 p-1 shadow-md" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold-300 font-medium">Entre Cafés</span>
                <span className="text-base font-display font-bold text-gold-400 -mt-0.5">Colombianos</span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-coffee-300 font-medium -mt-0.5">Green Coffee Exporters</span>
              </div>
            </div>
            <p className="text-sm text-coffee-300 leading-relaxed italic mb-2">"{COMPANY.tagline}"</p>
            <p className="text-sm text-coffee-300 leading-relaxed">{t(lang, 'footer_tagline')}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-coffee-400">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>FNC registered exporter · INVIMA {COMPANY.registroSanitario}</span>
            </div>
            <p className="text-xs text-coffee-400 mt-1">
              {COMPANY.grade} · {COMPANY.scaScore} · {COMPANY.altitude}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t(lang, 'footer_links')}</h4>
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item.key}>
                  <Link tab={item.key} lang={lang} navigate={navigate} className="text-sm text-coffee-300 hover:text-gold-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t(lang, 'footer_contact')}</h4>
            <ul className="space-y-3">
              <li className="text-sm text-coffee-300 font-medium">
                {COMPANY.contact.name}
                <span className="block text-xs text-coffee-400">{COMPANY.contact.role}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-coffee-300">
                <MessageCircle className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={COMPANY.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                  {COMPANY.contact.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-coffee-300">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${COMPANY.contact.email}`} className="hover:text-gold-400 transition-colors break-all">
                  {COMPANY.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-coffee-300">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>
                  {COMPANY.contact.city}<br />
                  {COMPANY.contact.country} · {COMPANY.contact.timezone}
                </span>
              </li>
            </ul>
          </div>

          {/* Export markets */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t(lang, 'footer_export_markets')}</h4>
            <p className="text-sm text-coffee-300 mb-4">{t(lang, 'footer_export_markets_text')}</p>
            <p className="text-xs text-coffee-400">{COMPANY.regions}</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-coffee-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-coffee-400">
            &copy; {new Date().getFullYear()} {COMPANY.legalName}. {t(lang, 'footer_rights')}
          </p>
          <div className="flex items-center gap-2">
            <img src="https://flagcdn.com/w40/co.png" alt="Colombia" className="w-6 h-4 rounded-sm object-cover" />
            <span className="text-xs text-coffee-400">{COMPANY.slogan}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
