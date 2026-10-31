import { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { Calculator, CheckCircle2, MinusCircle, Package, Info, Loader2, Ship, Plane, BookmarkPlus, LogIn } from 'lucide-react';
import { Language, Tab } from '../types';
import { content } from '../content';
import { PageHeader, ContactButtons } from '../components/ui';
import Link from '../components/Link';
import {
  CONTAINER,
  CONTAINER_PRODUCTS,
  ContainerProductGroup,
  ContainerProductId,
  ContainerQuote,
  OTHER_COUNTRY,
  SHIPPING_DESTINATIONS,
  SHIPPING_KG_STEP,
  SHIPPING_MIN_KG,
  SHIPPING_PRODUCTS,
  ShippingProductGroup,
  ShippingProductId,
  ShippingQuote,
} from '../shipping';

interface Props {
  lang: Language;
  navigate: (tab: Tab) => void;
}

type Mode = 'courier' | 'container';

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ok'; quote: ShippingQuote }
  | { status: 'okContainer'; quote: ContainerQuote }
  | { status: 'below' }
  | { status: 'over' }
  | { status: 'error' };

const GROUPS: ShippingProductGroup[] = ['green', 'roasted'];
const CONTAINER_GROUPS: ContainerProductGroup[] = ['standard', 'process', 'variety'];
const REQUEST_TIMEOUT_MS = 10000;

/** Replaces {key} tokens in a content string. */
function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? `{${k}}`));
}

/**
 * Shipping estimator: courier lots (DAP, DHL Express) and 20' containers of
 * green coffee (FOB Cartagena). The page only knows public data (countries,
 * products, limits); prices, supplier costs and the DHL tariff stay on the
 * server behind /api/estimate, which returns the totals.
 */
export default function Shipping({ lang, navigate }: Props) {
  const c = content(lang);
  const s = c.shipping;
  const sc = s.container;
  const isEs = lang === 'es';
  const locale = isEs ? 'es-CO' : 'en-US';

  const [mode, setMode] = useState<Mode>('courier');
  const [country, setCountry] = useState('');
  const [product, setProduct] = useState<ShippingProductId>('green-excelso');
  const [kgText, setKgText] = useState('20');
  const [cProduct, setCProduct] = useState<ContainerProductId>('washed-84-antioquia');
  const [bagsText, setBagsText] = useState(String(CONTAINER.fullBags));
  const [state, setState] = useState<State>({ status: 'idle' });

  const prod = SHIPPING_PRODUCTS.find((p) => p.id === product)!;
  const maxKg = prod.maxKg;
  const typedKg = Number(kgText.trim().replace(',', '.'));
  // Same rounding as the server, so the limits shown here match what it accepts.
  const kg = kgText.trim() && Number.isFinite(typedKg) ? Math.round(typedKg / SHIPPING_KG_STEP) * SHIPPING_KG_STEP : NaN;
  const kgValid = Number.isFinite(kg) && kg > 0;
  const typedBags = Number(bagsText.trim());
  const bags = bagsText.trim() && Number.isInteger(typedBags) ? typedBags : NaN;
  const bagsValid = Number.isInteger(bags) && bags > 0;

  // Wake the function up (it fetches the day's exchange rate) while the buyer is still choosing.
  useEffect(() => {
    fetch('/api/estimate?warm').catch(() => {});
  }, []);

  useEffect(() => {
    let query: URLSearchParams;
    if (mode === 'container') {
      if (!bagsValid) return setState({ status: 'idle' });
      if (bags < CONTAINER.minBags) return setState({ status: 'below' });
      if (bags > CONTAINER.fullBags) return setState({ status: 'over' });
      query = new URLSearchParams({ mode: 'container', product: cProduct, bags: String(bags) });
    } else {
      if (!country || country === OTHER_COUNTRY || !kgValid) return setState({ status: 'idle' });
      if (kg < SHIPPING_MIN_KG) return setState({ status: 'below' });
      if (kg > maxKg) return setState({ status: 'over' });
      query = new URLSearchParams({ country, product, kg: String(kg) });
    }
    // Loading right away, so the panel never pairs the new selection with the previous total.
    setState({ status: 'loading' });
    const ctrl = new AbortController();
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      ctrl.abort();
    }, REQUEST_TIMEOUT_MS + 300);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/estimate?${query}`, { signal: ctrl.signal });
        const data = await res.json();
        if (data.ok) setState(data.quote.mode === 'container' ? { status: 'okContainer', quote: data.quote } : { status: 'ok', quote: data.quote });
        else if (data.error === 'above_max') setState({ status: 'over' });
        else if (data.error === 'below_min') setState({ status: 'below' });
        else setState({ status: 'error' });
      } catch (e) {
        if (timedOut || (e as Error).name !== 'AbortError') setState({ status: 'error' });
      } finally {
        clearTimeout(timeout);
      }
    }, 300);
    return () => {
      clearTimeout(timer);
      clearTimeout(timeout);
      ctrl.abort();
    };
  }, [mode, country, product, kg, kgValid, maxKg, cProduct, bags, bagsValid]);

  const money = (n: number) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  const num = (n: number) => new Intl.NumberFormat(locale).format(n);

  const destName = (d: (typeof SHIPPING_DESTINATIONS)[number]) => (isEs ? d.es : d.en);
  const destinations = [...SHIPPING_DESTINATIONS].sort((a, b) => destName(a).localeCompare(destName(b), lang));
  const destination = SHIPPING_DESTINATIONS.find((d) => d.code === country);
  const countryInText = destination ? (isEs ? destination.es : destination.enIn) : '';

  // Prefilled WhatsApp / email: as much of the selection as we know.
  let message: string;
  let subject: string;
  if (mode === 'container') {
    const v = { bags: bagsValid ? num(bags) : '', product: sc.products[cProduct] };
    message =
      state.status === 'okContainer'
        ? fill(sc.whatsappQuote, { ...v, kg: num(state.quote.kg), total: money(state.quote.total), perKg: money(state.quote.usdPerKg) })
        : bagsValid
          ? fill(sc.whatsappNoPrice, v)
          : s.whatsappGeneric;
    subject = bagsValid ? fill(sc.emailSubject, v) : s.eyebrow;
  } else {
    const v = { kg: kgValid ? num(kg) : '', product: s.products[product].inText, country: countryInText };
    message =
      state.status === 'ok'
        ? fill(s.whatsappQuote, { ...v, total: money(state.quote.total) })
        : !kgValid
          ? s.whatsappGeneric
          : destination
            ? fill(s.whatsappNoPrice, v)
            : fill(s.whatsappOther, v);
    subject = kgValid ? fill(s.emailSubject, v) : s.eyebrow;
  }

  const inputClass =
    'w-full rounded-xl border border-coffee-300 bg-white px-4 py-3 text-coffee-900 focus:outline-none focus:border-coffee-700 focus-visible:ring-2 focus-visible:ring-coffee-700';
  const labelClass = 'block text-xs uppercase tracking-wider text-coffee-500 font-semibold mb-2';
  const minKgC = CONTAINER.minBags * CONTAINER.bagKg;
  const fullKgC = CONTAINER.fullBags * CONTAINER.bagKg;

  const included = mode === 'container' ? sc.included : [s.packing[prod.group], ...s.included];
  const notIncluded = mode === 'container' ? sc.notIncluded : s.notIncluded;
  const paymentNote = mode === 'container' ? sc.paymentNote : s.paymentNote;

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={s.eyebrow} title={s.title} lead={s.lead} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 mb-16 items-start">
          {/* Form */}
          <form className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-7" noValidate onSubmit={(e) => e.preventDefault()}>
            <h2 className="font-display text-2xl font-bold text-coffee-900 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-gold-500" aria-hidden="true" />
              {s.formTitle}
            </h2>

            <fieldset>
              <legend className={labelClass}>{s.modeLabel}</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(['courier', 'container'] as Mode[]).map((m) => {
                  const selected = m === mode;
                  const Icon = m === 'courier' ? Plane : Ship;
                  return (
                    <label
                      key={m}
                      className={`flex items-start gap-3 rounded-xl border p-3.5 cursor-pointer transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-coffee-700 ${
                        selected ? 'border-gold-500 bg-coffee-50' : 'border-coffee-100 hover:border-coffee-300'
                      }`}
                    >
                      <input type="radio" name="ship-mode" value={m} checked={selected} onChange={() => setMode(m)} className="mt-1 accent-[#7A4F2B]" />
                      <span>
                        <span className="flex items-center gap-1.5 font-semibold text-coffee-900">
                          <Icon className="w-4 h-4 text-gold-500" aria-hidden="true" />
                          {s.modes[m].title}
                        </span>
                        <span className="block text-sm text-coffee-600">{s.modes[m].detail}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {mode === 'courier' ? (
              <>
                <div>
                  <label htmlFor="ship-country" className={labelClass}>{s.countryLabel}</label>
                  <select id="ship-country" value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass}>
                    <option value="" disabled>{s.countryPlaceholder}</option>
                    {destinations.map((d) => (
                      <option key={d.code} value={d.code}>{destName(d)}</option>
                    ))}
                    <option value={OTHER_COUNTRY}>{s.otherCountry}</option>
                  </select>
                </div>

                <fieldset>
                  <legend className={labelClass}>{s.productLabel}</legend>
                  <div className="space-y-5">
                    {GROUPS.map((group) => (
                      <div key={group} role="group" aria-labelledby={`ship-group-${group}`}>
                        <div className="flex items-baseline justify-between gap-3 mb-2">
                          <p id={`ship-group-${group}`} className="text-sm font-semibold text-coffee-700 m-0">{s.groups[group]}</p>
                          {group === 'green' && (
                            <Link tab="profiles" lang={lang} navigate={navigate} className="text-xs font-semibold text-coffee-600 underline hover:text-coffee-900">
                              {c.profiles.greenCallout.cta} →
                            </Link>
                          )}
                        </div>
                        <div className="space-y-2">
                          {SHIPPING_PRODUCTS.filter((p) => p.group === group).map((p) => {
                            const selected = p.id === product;
                            return (
                              <label
                                key={p.id}
                                className={`flex items-start gap-3 rounded-xl border p-3.5 cursor-pointer transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-coffee-700 ${
                                  selected ? 'border-gold-500 bg-coffee-50' : 'border-coffee-100 hover:border-coffee-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="ship-product"
                                  value={p.id}
                                  checked={selected}
                                  onChange={() => setProduct(p.id)}
                                  className="mt-1 accent-[#7A4F2B]"
                                />
                                <span>
                                  <span className="block font-semibold text-coffee-900">{s.products[p.id].name}</span>
                                  <span className="block text-sm text-coffee-600">{s.products[p.id].detail}</span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="ship-kg" className={labelClass}>{s.kgLabel}</label>
                  <input
                    id="ship-kg"
                    type="number"
                    inputMode="decimal"
                    min={SHIPPING_MIN_KG}
                    max={maxKg}
                    step={SHIPPING_KG_STEP}
                    value={kgText}
                    onChange={(e) => setKgText(e.target.value)}
                    aria-describedby="ship-kg-hint"
                    className={inputClass}
                  />
                  <p id="ship-kg-hint" className="text-xs text-coffee-600 mt-2">{fill(s.kgHint, { min: SHIPPING_MIN_KG, max: maxKg })}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="ship-container-coffee" className={labelClass}>{sc.coffeeLabel}</label>
                  <select
                    id="ship-container-coffee"
                    value={cProduct}
                    onChange={(e) => setCProduct(e.target.value as ContainerProductId)}
                    className={inputClass}
                  >
                    {CONTAINER_GROUPS.map((group) => (
                      <optgroup key={group} label={sc.groups[group]}>
                        {CONTAINER_PRODUCTS.filter((p) => p.group === group).map((p) => (
                          <option key={p.id} value={p.id}>{sc.products[p.id]}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="ship-bags" className={labelClass}>{sc.bagsLabel}</label>
                  <input
                    id="ship-bags"
                    type="number"
                    inputMode="numeric"
                    min={CONTAINER.minBags}
                    max={CONTAINER.fullBags}
                    step={1}
                    value={bagsText}
                    onChange={(e) => setBagsText(e.target.value)}
                    aria-describedby="ship-bags-hint"
                    className={inputClass}
                  />
                  <p id="ship-bags-hint" className="text-xs text-coffee-600 mt-2">
                    {fill(sc.bagsHint, { min: CONTAINER.minBags, minKg: num(minKgC), full: CONTAINER.fullBags, fullKg: num(fullKgC) })}
                  </p>
                </div>
              </>
            )}
          </form>

          {/* Result */}
          <div className="bg-coffee-800 text-white rounded-2xl p-6 md:p-8 lg:sticky lg:top-24" aria-live="polite">
            <h2 className="font-display text-2xl font-bold text-gold-400 mb-6 flex items-center gap-3">
              <Package className="w-6 h-6" aria-hidden="true" />
              {s.resultTitle}
            </h2>

            {mode === 'courier' && country === OTHER_COUNTRY && <p className="text-coffee-100 leading-relaxed">{s.otherCountryText}</p>}
            {state.status === 'idle' && !(mode === 'courier' && country === OTHER_COUNTRY) && (
              <p className="text-coffee-200 leading-relaxed">{mode === 'container' ? sc.idle : s.idle}</p>
            )}
            {state.status === 'loading' && (
              <p className="text-coffee-200 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> {s.loading}
              </p>
            )}
            {state.status === 'below' && (
              <p className="text-coffee-100 leading-relaxed">
                {mode === 'container'
                  ? fill(sc.belowMin, { min: CONTAINER.minBags, minKg: num(minKgC) })
                  : fill(s.belowMin, { min: SHIPPING_MIN_KG })}
              </p>
            )}
            {state.status === 'over' && (
              <p className="text-coffee-100 leading-relaxed">
                {mode === 'container' ? fill(sc.overLimit, { full: CONTAINER.fullBags }) : fill(s.overLimit, { max: maxKg })}
              </p>
            )}
            {state.status === 'error' && <p className="text-coffee-100 leading-relaxed">{s.error}</p>}

            {state.status === 'ok' && (
              <div>
                <dl className="divide-y divide-coffee-700 text-sm">
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-coffee-200">
                      {fill(s.coffeeLine, { kg: num(state.quote.netKg), price: money(state.quote.usdPerKg) })}
                    </dt>
                    <dd className="m-0 font-semibold tabular-nums">{money(state.quote.coffee)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-coffee-200">{s.prepLine}</dt>
                    <dd className="m-0 font-semibold tabular-nums">{money(state.quote.prep)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-coffee-200">{s.freightLine}</dt>
                    <dd className="m-0 font-semibold tabular-nums">{money(state.quote.freight)}</dd>
                  </div>
                  <div className="flex justify-between items-baseline gap-4 pt-5 pb-2">
                    <dt className="font-semibold text-white">{s.totalLine}</dt>
                    <dd className="m-0 font-display text-3xl font-bold text-gold-400 tabular-nums">{money(state.quote.total)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2">
                    <dt className="text-coffee-300">{s.perKgLine}</dt>
                    <dd className="m-0 text-coffee-100 tabular-nums">{money(state.quote.landedPerKg)}</dd>
                  </div>
                </dl>
                <p className="text-xs text-coffee-300 mt-4">{fill(s.boxesLine, { n: state.quote.boxes, kg: num(state.quote.grossKg) })}</p>
              </div>
            )}

            {state.status === 'okContainer' && (
              <div>
                <dl className="divide-y divide-coffee-700 text-sm">
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-coffee-200">{sc.perKgLine}</dt>
                    <dd className="m-0 font-semibold tabular-nums">{money(state.quote.usdPerKg)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-coffee-200">{sc.perLbLine}</dt>
                    <dd className="m-0 font-semibold tabular-nums">{money(state.quote.usdPerLb)}</dd>
                  </div>
                  <div className="flex justify-between items-baseline gap-4 pt-5 pb-2">
                    <dt className="font-semibold text-white">{fill(sc.totalLine, { bags: num(state.quote.bags), kg: num(state.quote.kg) })}</dt>
                    <dd className="m-0 font-display text-3xl font-bold text-gold-400 tabular-nums">{money(state.quote.total)}</dd>
                  </div>
                </dl>
                <p className="text-xs text-coffee-300 mt-4">
                  {state.quote.full ? sc.fullNote : fill(sc.partialNote, { full: CONTAINER.fullBags })}
                </p>
              </div>
            )}

            {(state.status === 'ok' || state.status === 'okContainer') && (
              <SaveQuote
                key={JSON.stringify(state.quote)}
                lang={lang}
                navigate={navigate}
                body={
                  state.status === 'okContainer'
                    ? { mode: 'container', product: state.quote.product, bags: state.quote.bags }
                    : { mode: 'courier', country: state.quote.country, product: state.quote.product, kg: state.quote.netKg }
                }
              />
            )}

            <p className="text-xs text-coffee-300 leading-relaxed mt-6 pt-5 border-t border-coffee-700 flex gap-2">
              <Info className="w-4 h-4 shrink-0 text-gold-400" aria-hidden="true" />
              <span>{mode === 'container' ? sc.disclaimer : s.disclaimer}</span>
            </p>
          </div>
        </div>

        {/* Included / not included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="font-display text-xl font-bold text-coffee-900 mb-4">{s.includedTitle}</h2>
            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-coffee-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="font-display text-xl font-bold text-coffee-900 mb-4">{s.notIncludedTitle}</h2>
            <ul className="space-y-3">
              {notIncluded.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-coffee-700 leading-relaxed">
                  <MinusCircle className="w-4 h-4 text-coffee-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-coffee-600 mt-5">{paymentNote}</p>
          </div>
        </div>

        {/* Import notes: all countries in the HTML (crawlable); the selected one opens */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-coffee-900">{s.notesTitle}</h2>
          <p className="text-coffee-600 mt-2 mb-6">{s.notesLead}</p>
          <div className="space-y-3">
            {destinations.map((d) => (
              <details
                key={d.code}
                open={mode === 'courier' && d.code === country}
                className="group bg-white rounded-2xl shadow-md open:ring-2 open:ring-gold-500"
              >
                <summary className="cursor-pointer list-none px-6 py-4 font-display text-lg font-bold text-coffee-900 flex items-center justify-between gap-4 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coffee-700">
                  {destName(d)}
                  <span className="text-gold-500 text-xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="px-6 pb-5 text-sm text-coffee-700 leading-relaxed">{s.countryNotes[d.code]}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="bg-coffee-50 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-coffee-900 mb-3">{s.ctaTitle}</h2>
          <p className="text-coffee-600 mb-8 max-w-xl mx-auto">{s.ctaText}</p>
          <ContactButtons whatsappLabel={c.common.whatsapp} emailLabel={c.common.email} message={message} subject={subject} body={message} />
        </div>
      </div>
    </section>
  );
}

/**
 * "Save and request a proforma". The server recalculates the quote from these inputs
 * (it never trusts a total sent by the browser) and stores it in the customer's account.
 */
function SaveQuote({ lang, navigate, body }: { lang: Language; navigate: (tab: Tab) => void; body: Record<string, string | number> }) {
  const t = content(lang).saveQuote;
  const auth = useAuth();
  const [st, setSt] = useState<'idle' | 'saving' | 'saved' | 'error' | 'tooMany'>('idle');
  if (auth.status !== 'signedIn' && auth.status !== 'signedOut') return null;

  const btn = 'mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors';
  if (auth.status === 'signedOut') {
    return (
      <button onClick={auth.openSignIn} className={`${btn} border border-gold-400 text-gold-400 hover:bg-gold-400/10`}>
        <LogIn className="w-4 h-4" aria-hidden="true" /> {t.signIn}
      </button>
    );
  }
  if (!auth.customer || !auth.customer.policyCurrent) {
    return (
      <button onClick={() => navigate('account')} className={`${btn} border border-gold-400 text-gold-400 hover:bg-gold-400/10`}>
        {t.completeProfile}
      </button>
    );
  }
  if (st === 'saved') {
    return (
      <p className="mt-5 rounded-xl bg-green-600/20 px-4 py-3 text-sm text-green-100 flex flex-wrap items-center gap-x-3 gap-y-1">
        <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" /> {t.saved}
        <button onClick={() => navigate('account')} className="underline font-semibold">{t.viewInAccount}</button>
      </p>
    );
  }
  const save = async () => {
    setSt('saving');
    try {
      const res = await auth.authFetch('/api/quotes', { method: 'POST', body: JSON.stringify(body) });
      setSt(res.ok ? 'saved' : res.status === 429 ? 'tooMany' : 'error');
    } catch {
      setSt('error');
    }
  };
  return (
    <div>
      <button onClick={() => void save()} disabled={st === 'saving'} className={`${btn} bg-gold-500 hover:bg-gold-400 text-coffee-900 disabled:opacity-60`}>
        <BookmarkPlus className="w-4 h-4" aria-hidden="true" /> {st === 'saving' ? t.saving : t.save}
      </button>
      {(st === 'error' || st === 'tooMany') && (
        <p role="alert" className="mt-2 text-xs text-red-200">{st === 'tooMany' ? t.tooMany : t.error}</p>
      )}
    </div>
  );
}
