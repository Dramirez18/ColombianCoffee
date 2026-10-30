import { FileText, CheckCircle2, Calculator } from 'lucide-react';
import { Language, Tab } from '../types';
import { content } from '../content';
import { PageHeader, SectionTitle, SpecTable, ContactButtons } from '../components/ui';
import Link from '../components/Link';

interface Props {
  lang: Language;
  navigate: (tab: Tab) => void;
}

export default function Export({ lang, navigate }: Props) {
  const c = content(lang);
  const x = c.export;

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={x.eyebrow} title={x.title} lead={x.lead} />

        {x.sections.map((s) => (
          <div key={s.title} className="mb-16">
            <SectionTitle>{s.title}</SectionTitle>
            <SpecTable rows={s.rows} />
          </div>
        ))}

        <div className="mb-16 bg-white border border-gold-500/50 rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex gap-4">
            <Calculator className="w-8 h-8 text-gold-500 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-coffee-900 mb-1">{c.shipping.title}</h2>
              <p className="text-sm text-coffee-600 leading-relaxed max-w-2xl">{c.shipping.lead}</p>
            </div>
          </div>
          <Link
            tab="shipping"
            lang={lang}
            navigate={navigate}
            className="shrink-0 inline-flex items-center justify-center bg-coffee-800 hover:bg-coffee-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
          >
            {c.shipping.eyebrow} →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 mb-16">
          <div className="bg-coffee-800 text-white rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <FileText className="w-7 h-7 text-gold-400" />
              <h2 className="text-2xl font-display font-bold text-gold-400">{x.docsTitle}</h2>
            </div>
            <ul className="space-y-3">
              {x.docs.map((d) => (
                <li key={d} className="flex gap-3 text-sm text-coffee-100 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle>{x.complianceTitle}</SectionTitle>
            <div className="space-y-4">
              {x.compliance.map((item) => (
                <article key={item.title} className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-display text-lg font-bold text-coffee-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-coffee-700 leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-coffee-50 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-coffee-900 mb-3">{c.home.contact.title}</h2>
          <p className="text-coffee-600 mb-8 max-w-xl mx-auto">{c.home.contact.text}</p>
          <ContactButtons whatsappLabel={c.common.whatsapp} emailLabel={c.common.email} />
          <p className="text-xs text-coffee-500 mt-6">
            <Link tab="faq" lang={lang} navigate={navigate} className="underline hover:text-coffee-800">
              {c.faq.title} →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
