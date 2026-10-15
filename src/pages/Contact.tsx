import { MessageCircle, Mail, MapPin, Clock, Languages, CheckCircle2 } from 'lucide-react';
import { Language, Tab } from '../types';
import { content } from '../content';
import { COMPANY } from '../constants';
import { PageHeader } from '../components/ui';

interface Props {
  lang: Language;
  navigate: (tab: Tab) => void;
}

export default function Contact({ lang }: Props) {
  const c = content(lang);
  const k = c.contact;
  const message = lang === 'es'
    ? 'Hola, quiero cotizar café colombiano.'
    : 'Hi, I would like a quote for Colombian coffee.';

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={k.title} lead={k.lead} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <a
            href={`${COMPANY.contact.whatsappLink}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center"
          >
            <MessageCircle className="w-10 h-10 mb-3" />
            <span className="text-sm uppercase tracking-wider font-semibold opacity-90">{k.whatsapp}</span>
            <span className="text-2xl font-display font-bold mt-1">{COMPANY.contact.whatsapp}</span>
          </a>
          <a
            href={`mailto:${COMPANY.contact.email}`}
            className="bg-coffee-800 hover:bg-coffee-700 text-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center"
          >
            <Mail className="w-10 h-10 mb-3 text-gold-400" />
            <span className="text-sm uppercase tracking-wider font-semibold text-coffee-200">{k.email}</span>
            <span className="text-xl md:text-2xl font-display font-bold mt-1 break-all">{COMPANY.contact.email}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6">
          <address className="not-italic bg-white rounded-2xl shadow-md p-6 space-y-4 text-sm text-coffee-700">
            <p className="font-display text-lg font-bold text-coffee-900">{COMPANY.contact.name}</p>
            <p className="text-coffee-500 -mt-3">{COMPANY.contact.role}</p>
            <p className="flex items-start gap-2"><MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" /><span>{COMPANY.contact.city}, {COMPANY.contact.country}</span></p>
            <p className="flex items-start gap-2"><Clock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" /><span>{k.responseNote}</span></p>
            <p className="flex items-start gap-2"><Languages className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" /><span>{COMPANY.contact.languages}</span></p>
          </address>

          <div className="bg-coffee-50 rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-coffee-900 mb-4">{k.askTitle}</h2>
            <ul className="space-y-2">
              {k.askItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-coffee-700">
                  <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
