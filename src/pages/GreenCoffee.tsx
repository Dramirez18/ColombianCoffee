import { Mountain, Calendar, Leaf, Coffee, Target, ArrowRight } from 'lucide-react';
import { Language, Tab } from '../types';
import { content } from '../content';
import { PageHeader, SectionTitle, SpecTable, ContactButtons } from '../components/ui';
import Link from '../components/Link';

interface Props {
  lang: Language;
  navigate: (tab: Tab) => void;
}

export default function GreenCoffee({ lang, navigate }: Props) {
  const c = content(lang);
  const g = c.green;

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={g.eyebrow} title={g.title} lead={g.lead} />

        {/* Photo + specs */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start mb-20">
          <figure className="bg-white rounded-2xl shadow-md overflow-hidden lg:sticky lg:top-24">
            <img
              src="/products/grano-verde.jpg"
              alt="Colombian green coffee beans, Excelso EP screen 14+, sample lot 84"
              loading="lazy"
              decoding="async"
              className="w-full h-64 lg:h-72 object-cover"
            />
            <figcaption className="p-4 text-xs text-coffee-500">
              Excelso EP · screen 14+ · fully washed · SCA 84+
            </figcaption>
          </figure>
          <div>
            <SectionTitle>{g.specsTitle}</SectionTitle>
            <SpecTable rows={g.specs} />
          </div>
        </div>

        {/* Cup profiles of the current coffees */}
        <div className="mb-20 bg-coffee-800 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-gold-400 mb-2">{c.profiles.greenCallout.title}</h2>
            <p className="text-coffee-100 leading-relaxed max-w-2xl">{c.profiles.greenCallout.text}</p>
          </div>
          <Link
            tab="profiles"
            lang={lang}
            navigate={navigate}
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-coffee-900 px-6 py-3 rounded-full text-sm font-semibold transition-colors"
          >
            {c.profiles.greenCallout.cta}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Regions */}
        <div className="mb-20">
          <SectionTitle sub={g.regionsLead}>{g.regionsTitle}</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {g.regions.map((r) => (
              <article key={r.name} className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
                <h3 className="font-display text-2xl font-bold text-coffee-900 mb-4">{r.name}</h3>
                <dl className="space-y-3 text-sm text-coffee-700">
                  <div className="flex gap-2">
                    <Mountain className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <div><dt className="text-[10px] uppercase tracking-wider text-coffee-400">{g.regionLabels.altitude}</dt><dd>{r.altitude}</dd></div>
                  </div>
                  <div className="flex gap-2">
                    <Calendar className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <div><dt className="text-[10px] uppercase tracking-wider text-coffee-400">{g.regionLabels.harvest}</dt><dd>{r.harvest}</dd></div>
                  </div>
                  <div className="flex gap-2">
                    <Leaf className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <div><dt className="text-[10px] uppercase tracking-wider text-coffee-400">{g.regionLabels.varieties}</dt><dd>{r.varieties}</dd></div>
                  </div>
                  <div className="flex gap-2">
                    <Coffee className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <div><dt className="text-[10px] uppercase tracking-wider text-coffee-400">{g.regionLabels.cup}</dt><dd>{r.cup}</dd></div>
                  </div>
                  <div className="flex gap-2">
                    <Target className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <div><dt className="text-[10px] uppercase tracking-wider text-coffee-400">{g.regionLabels.use}</dt><dd>{r.use}</dd></div>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <div className="mt-6 bg-coffee-50 rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold text-coffee-900 mb-2">{g.alsoTitle}</h3>
            <p className="text-sm text-coffee-700 leading-relaxed">{g.alsoText}</p>
          </div>
        </div>

        {/* Grades */}
        <div className="mb-20">
          <SectionTitle>{g.gradesTitle}</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {g.grades.map((grade) => (
              <div key={grade.title} className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-gold-500">
                <h3 className="font-display text-xl font-bold text-coffee-900 mb-2">{grade.title}</h3>
                <p className="text-sm text-coffee-700 leading-relaxed">{grade.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing + CTA */}
        <div className="bg-coffee-800 text-white rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gold-400 mb-4">{g.pricingTitle}</h2>
          <p className="text-coffee-100 leading-relaxed mb-8 max-w-3xl">{g.pricingText}</p>
          <ContactButtons
            whatsappLabel={c.common.whatsapp}
            emailLabel={c.common.email}
            dark
            message={lang === 'es' ? 'Hola, quiero una oferta de café verde Excelso EP.' : 'Hi, I would like an offer sheet for Excelso EP green coffee.'}
            subject={lang === 'es' ? 'Cotización café verde — Entre Cafés Colombianos' : 'Green coffee quote — Entre Cafés Colombianos'}
          />
          <p className="text-center text-xs text-coffee-300 mt-6">
            <Link tab="export" lang={lang} navigate={navigate} className="underline hover:text-gold-300">
              {c.export.title}
            </Link>
            {' · '}
            <Link tab="faq" lang={lang} navigate={navigate} className="underline hover:text-gold-300">
              {c.faq.title}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
