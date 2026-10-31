import { CheckCircle2, ArrowDown, Calculator, MessageCircle } from 'lucide-react';
import { Language, Tab } from '../types';
import { content, CupProfile } from '../content';
import { COMPANY } from '../constants';
import { PageHeader, SectionTitle, SpecTable, ContactButtons } from '../components/ui';
import Link from '../components/Link';
import RadarChart from '../components/RadarChart';

interface Props {
  lang: Language;
  navigate: (tab: Tab) => void;
}

/** Accent colour per coffee — the same ones used in the printed cup-profile sheet. */
const COLORS: Record<CupProfile['id'], string> = {
  huila: '#4A7C3F',
  selecto: '#2C5F7C',
  tolima: '#A0522D',
  basico: '#6B3E5E',
};

/**
 * Attribute scores for the radar (SCA order: fragrance, flavour, aftertaste,
 * acidity, body, uniformity, balance, clean cup, sweetness, overall).
 * Huila: shape from the lot's technical sheet, which prints no figures — so
 * the chart shows the shape only. Basic (Nariño): cupping sheet of
 * 10 Sep 2026, published in full.
 */
const RADAR: Partial<Record<CupProfile['id'], { values: number[]; showValues: boolean }>> = {
  huila: { values: [8.5, 7.5, 8, 7.5, 7.5, 10, 10, 10, 10, 8], showValues: false },
  basico: { values: [6.5, 7, 7, 6.5, 7, 10, 10, 10, 6, 7], showValues: true },
};

export default function Profiles({ lang, navigate }: Props) {
  const c = content(lang);
  const p = c.profiles;
  const isEs = lang === 'es';
  const fmt = (n: number) => (n === 10 ? '10' : isEs ? n.toFixed(1).replace('.', ',') : n.toFixed(1));
  const fill = (s: string, name: string) => s.replace('{name}', name);
  const waLink = (msg: string) => `${COMPANY.contact.whatsappLink}?text=${encodeURIComponent(msg)}`;

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={p.eyebrow} title={p.title} lead={p.lead} />
        <p className="text-center -mt-8 mb-14 text-xs uppercase tracking-wider text-coffee-500 font-semibold">{p.updated}</p>

        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {p.items.map((item) => {
            const color = COLORS[item.id];
            return (
              <article key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                <header className="px-6 py-4 text-white" style={{ backgroundColor: color }}>
                  <h2 className="font-display text-2xl font-bold leading-tight">{item.name}</h2>
                  <p className="text-sm text-white/85">{item.subtitle}</p>
                </header>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <p className="m-0">
                      <span className="font-display text-5xl font-bold leading-none" style={{ color }}>{item.score}</span>
                      <span className="block text-xs text-coffee-500 mt-1">{p.scoreLabel}</span>
                    </p>
                    <span className="text-xs font-semibold text-coffee-600 text-right">{item.grade}</span>
                  </div>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {item.notes.map((note) => (
                      <li
                        key={note}
                        className="text-xs font-medium px-2.5 py-1 rounded-full border"
                        style={{ color, borderColor: `${color}66`, backgroundColor: `${color}12` }}
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1 text-sm text-coffee-700 mb-5">
                    {item.facts.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <a
                    href={`#${item.id}`}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                    style={{ color }}
                  >
                    {p.viewProfile}
                    <ArrowDown className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* At a glance */}
        <div className="mb-20">
          <SectionTitle>{p.compareTitle}</SectionTitle>
          <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
            <table className="w-full min-w-[720px] table-fixed text-sm text-coffee-800 border-collapse">
              <thead>
                <tr>
                  <th scope="col" className="bg-coffee-800 text-left px-4 py-3 w-44" aria-hidden="true" />
                  {p.items.map((item) => (
                    <th key={item.id} scope="col" className="px-4 py-3 text-white font-semibold" style={{ backgroundColor: COLORS[item.id] }}>
                      {item.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-coffee-100">
                {(
                  [
                    [p.compareLabels.origin, (i: CupProfile) => i.origin],
                    [p.compareLabels.score, (i: CupProfile) => i.score],
                    [p.compareLabels.acidity, (i: CupProfile) => i.acidity],
                    [p.compareLabels.process, (i: CupProfile) => i.process],
                    [p.compareLabels.presentation, () => p.presentation],
                    [p.compareLabels.estimator, (i: CupProfile) => i.estimator ?? p.onRequest],
                  ] as [string, (i: CupProfile) => string][]
                ).map(([label, get], row) => (
                  <tr key={label} className={row % 2 ? 'bg-cream/60' : ''}>
                    <th scope="row" className="text-left px-4 py-3 font-semibold text-coffee-900">{label}</th>
                    {p.items.map((item) => (
                      <td key={item.id} className={`px-4 py-3 text-center ${row === 1 ? 'font-bold text-base' : ''}`}>{get(item)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full profiles */}
        <div className="space-y-20 mb-20">
          {p.items.map((item) => {
            const color = COLORS[item.id];
            const radar = RADAR[item.id];
            return (
              <article key={item.id} id={item.id} className="scroll-mt-24">
                <header className="rounded-2xl px-6 py-5 text-white flex flex-wrap items-baseline justify-between gap-2 mb-8" style={{ backgroundColor: color }}>
                  <h2 className="font-display text-3xl font-bold">{item.name}</h2>
                  <p className="text-sm text-white/90">{item.subtitle}</p>
                </header>

                <div className={`grid grid-cols-1 ${radar ? 'lg:grid-cols-[1.1fr_1fr]' : ''} gap-8 items-center mb-8`}>
                  {radar && (
                    <figure className="bg-white rounded-2xl shadow-md p-4 m-0">
                      <RadarChart
                        values={radar.values}
                        labels={p.axes}
                        color={color}
                        showValues={radar.showValues}
                        format={fmt}
                        title={`${p.radarTitle} — ${item.name}`}
                      />
                      {!radar.showValues && (
                        <figcaption className="text-xs text-coffee-500 px-2 pb-1 text-center">{p.radarShapeNote}</figcaption>
                      )}
                    </figure>
                  )}
                  <div>
                    <p className="m-0 mb-4">
                      <span className="font-display text-6xl font-bold leading-none" style={{ color }}>{item.score}</span>
                      <span className="block text-sm text-coffee-500 mt-1">{p.scoreLabel} · {item.grade}</span>
                    </p>
                    <ul className="flex flex-wrap gap-2 mb-5">
                      {item.notes.map((note) => (
                        <li
                          key={note}
                          className="text-sm font-medium px-3 py-1 rounded-full border"
                          style={{ color, borderColor: `${color}66`, backgroundColor: `${color}12` }}
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
                    <p className="text-coffee-700 leading-relaxed text-base md:text-lg">{item.summary}</p>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-coffee-900 mb-4">{item.specsTitle}</h3>
                <SpecTable rows={item.specs} />

                {item.attributes && (
                  <div className="mt-8">
                    <h3 className="font-display text-xl font-bold text-coffee-900 mb-4">{p.attributesTitle}</h3>
                    <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
                      <table className="w-full min-w-[560px] text-sm text-coffee-800">
                        <thead className="text-white" style={{ backgroundColor: color }}>
                          <tr>
                            <th scope="col" className="text-left px-4 py-3">{p.attributeCols[0]}</th>
                            <th scope="col" className="text-center px-4 py-3">{p.attributeCols[1]}</th>
                            <th scope="col" className="text-left px-4 py-3">{p.attributeCols[2]}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-coffee-100">
                          {item.attributes.map((a) => (
                            <tr key={a.label}>
                              <th scope="row" className="text-left px-4 py-2.5 font-semibold text-coffee-900">{a.label}</th>
                              <td className="text-center px-4 py-2.5 font-bold tabular-nums" style={{ color }}>{a.score}</td>
                              <td className="px-4 py-2.5 text-coffee-700">{a.note}</td>
                            </tr>
                          ))}
                          <tr className="bg-coffee-50">
                            <th scope="row" className="text-left px-4 py-3 font-bold text-coffee-900">{p.totalLabel}</th>
                            <td className="text-center px-4 py-3 font-display text-xl font-bold" style={{ color }}>{item.score}</td>
                            <td className="px-4 py-3 text-coffee-600">{p.totalNote}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                  {item.estimator ? (
                    <>
                      <span className="flex items-center gap-2 text-coffee-700">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color }} aria-hidden="true" />
                        {fill(p.inEstimator, item.estimator)}
                      </span>
                      <Link
                        tab="shipping"
                        lang={lang}
                        navigate={navigate}
                        className="inline-flex items-center gap-2 bg-coffee-800 hover:bg-coffee-700 text-white px-4 py-2 rounded-full font-semibold transition-colors w-fit"
                      >
                        <Calculator className="w-4 h-4" aria-hidden="true" />
                        {p.estimatorCta}
                      </Link>
                    </>
                  ) : (
                    <>
                      <span className="text-coffee-700">{p.onRequest}</span>
                      <a
                        href={waLink(fill(p.whatsappProfile, item.name))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full font-semibold transition-colors w-fit"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        {p.quoteCta}
                      </a>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="bg-coffee-50 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-coffee-900 mb-3">{p.ctaTitle}</h2>
          <p className="text-coffee-600 mb-8 max-w-xl mx-auto">{p.ctaText}</p>
          <ContactButtons
            whatsappLabel={c.common.whatsapp}
            emailLabel={c.common.email}
            message={p.whatsappMessage + p.items.map((i) => `${i.name} (${i.score})`).join(', ')}
            subject={p.emailSubject}
          />
        </div>
      </div>
    </section>
  );
}
