import { Language, Tab } from '../types';
import { content } from '../content';
import { PageHeader } from '../components/ui';

interface Props {
  lang: Language;
  navigate: (tab: Tab) => void;
}

/** Personal data protection policy (Colombian Law 1581 of 2012). Pre-rendered in English and Spanish. */
export default function Privacy({ lang }: Props) {
  const p = content(lang).privacy;
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
        <p className="text-center -mt-8 mb-12 text-xs uppercase tracking-wider text-coffee-500 font-semibold">{p.updated}</p>
        {p.translationNote && <p className="text-center -mt-8 mb-10 text-sm text-coffee-600 italic">{p.translationNote}</p>}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 space-y-8">
          {p.sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-xl font-bold text-coffee-900 mb-3">{s.title}</h2>
              {s.paragraphs.map((t) => (
                <p key={t} className="text-coffee-700 leading-relaxed mb-3">{t}</p>
              ))}
              {s.items && (
                <ul className="list-disc pl-6 space-y-1.5 text-coffee-700 leading-relaxed">
                  {s.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
