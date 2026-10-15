import { ChevronDown } from 'lucide-react';
import { Language, Tab } from '../types';
import { content } from '../content';
import { PageHeader, ContactButtons } from '../components/ui';
import Link from '../components/Link';

interface Props {
  lang: Language;
  navigate: (tab: Tab) => void;
}

/**
 * Native <details> accordion: every answer is in the HTML (crawlable, no JS
 * needed) and the first one is open by default.
 */
export default function Faq({ lang, navigate }: Props) {
  const c = content(lang);
  const f = c.faq;

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={f.eyebrow} title={f.title} lead={f.lead} />

        <div className="space-y-3 mb-16">
          {f.items.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group bg-white rounded-2xl shadow-md open:shadow-lg transition-shadow"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 [&::-webkit-details-marker]:hidden">
                <h2 className="font-display text-lg font-bold text-coffee-900 m-0">{item.q}</h2>
                <ChevronDown className="w-5 h-5 text-gold-500 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-6 text-coffee-700 leading-relaxed text-[15px]">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="bg-coffee-50 rounded-3xl p-8 md:p-10 text-center">
          <h2 className="text-2xl font-display font-bold text-coffee-900 mb-3">{c.home.contact.title}</h2>
          <p className="text-coffee-600 mb-8 max-w-xl mx-auto">{c.home.contact.text}</p>
          <ContactButtons whatsappLabel={c.common.whatsapp} emailLabel={c.common.email} />
          <p className="text-xs text-coffee-500 mt-6">
            <Link tab="green" lang={lang} navigate={navigate} className="underline hover:text-coffee-800">
              {c.green.title} →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
