import { Globe2, Mountain, Award, Coffee } from 'lucide-react';
import { Language, Tab } from '../types';
import { content } from '../content';
import { COMPANY } from '../constants';
import { PageHeader, SectionTitle, SpecTable } from '../components/ui';
import Link from '../components/Link';

interface Props {
  lang: Language;
  navigate: (tab: Tab) => void;
}

export default function About({ lang, navigate }: Props) {
  const c = content(lang);
  const a = c.about;

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={a.title} lead={c.meta.about.description} />

        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-10">
          <img
            src="/hero/plantacion-cordillera.webp"
            alt={a.imageAlt}
            loading="lazy"
            decoding="async"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="p-8 space-y-5">
            {a.story.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-coffee-700 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-coffee-50 rounded-xl p-6 text-center">
                <Mountain className="w-8 h-8 text-coffee-600 mx-auto mb-3" />
                <h3 className="font-display font-bold text-coffee-900 mb-1">{c.green.regionLabels.altitude}</h3>
                <p className="text-sm text-coffee-500">{COMPANY.altitude}</p>
              </div>
              <div className="bg-coffee-50 rounded-xl p-6 text-center">
                <Coffee className="w-8 h-8 text-coffee-600 mx-auto mb-3" />
                <h3 className="font-display font-bold text-coffee-900 mb-1">{COMPANY.grade}</h3>
                <p className="text-sm text-coffee-500">{COMPANY.process}</p>
              </div>
              <div className="bg-coffee-50 rounded-xl p-6 text-center">
                <Award className="w-8 h-8 text-coffee-600 mx-auto mb-3" />
                <h3 className="font-display font-bold text-coffee-900 mb-1">{COMPANY.scaScore}</h3>
                <p className="text-sm text-coffee-500">Q-Grader</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <SectionTitle>{a.factsTitle}</SectionTitle>
          <SpecTable rows={a.facts} />
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center gap-3 mb-4">
            <Globe2 className="w-8 h-8 text-coffee-600" />
            <h2 className="text-2xl font-display font-bold text-coffee-900">{a.marketsTitle}</h2>
          </div>
          <p className="text-coffee-600 mb-6">{a.marketsText}</p>
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-coffee-400 font-semibold mb-2">{a.shippedLabel}</p>
              <div className="flex flex-wrap gap-2">
                {a.shipped.map((m) => (
                  <span key={m} className="bg-gold-500/15 text-coffee-900 rounded-lg px-3 py-1.5 text-sm font-medium">{m}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-coffee-400 font-semibold mb-2">{a.quotingLabel}</p>
              <div className="flex flex-wrap gap-2">
                {a.quoting.map((m) => (
                  <span key={m} className="bg-coffee-50 text-coffee-700 rounded-lg px-3 py-1.5 text-sm font-medium">{m}</span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-coffee-500 mt-6">
            <Link tab="contact" lang={lang} navigate={navigate} className="underline hover:text-coffee-800">
              {c.contact.title} →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
