import { useCallback, useEffect, useState } from 'react';
import { Download, Loader2, RefreshCw, MessageCircle, Mail } from 'lucide-react';
import { Language, Tab } from '../types';
import { content } from '../content';
import { useAuth } from '../auth';
import { PageHeader } from '../components/ui';
import { QUOTE_STATUSES, SavedQuote, dateLabel, destinationLabel, moneyLabel, productLabel, quantityLabel } from '../quoteLabels';

interface Props {
  lang: Language;
  navigate: (tab: Tab) => void;
}

/** Quote requests for the administrator. Access is decided by /api/admin/quotes, not by this page. */
export default function Admin({ lang }: Props) {
  const c = content(lang);
  const ad = c.admin;
  const a = c.account;
  const auth = useAuth();
  const [quotes, setQuotes] = useState<SavedQuote[] | null>(null);
  const [filter, setFilter] = useState<SavedQuote['status'] | 'all'>('all');
  const [forbidden, setForbidden] = useState(false);

  const load = useCallback(async () => {
    setQuotes(null);
    const res = await auth.authFetch('/api/admin/quotes');
    if (res.status === 401 || res.status === 403) {
      setForbidden(true);
      setQuotes([]);
      return;
    }
    const data = await res.json().catch(() => ({}));
    setQuotes(data.ok ? data.quotes : []);
  }, [auth]);

  useEffect(() => {
    if (auth.status === 'signedIn') void load();
  }, [auth.status, load]);

  const setStatus = async (id: number, status: SavedQuote['status']) => {
    setQuotes((qs) => qs?.map((q) => (q.id === id ? { ...q, status } : q)) ?? qs);
    const res = await auth.authFetch('/api/admin/quotes', { method: 'PATCH', body: JSON.stringify({ id, status }) });
    if (!res.ok) void load();
  };

  const downloadCsv = async () => {
    const res = await auth.authFetch('/api/admin/quotes?format=csv');
    if (!res.ok) return;
    const url = URL.createObjectURL(await res.blob());
    const link = document.createElement('a');
    link.href = url;
    link.download = `solicitudes-cotizacion-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const wrap = (children: React.ReactNode) => (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={ad.title} />
        {children}
      </div>
    </section>
  );

  if (auth.status === 'loading') return wrap(<p className="text-center text-coffee-600"><Loader2 className="inline w-5 h-5 animate-spin" aria-hidden="true" /></p>);
  if (auth.status !== 'signedIn' || forbidden || (!auth.isAdmin && quotes !== null)) {
    return wrap(<p className="bg-white rounded-2xl shadow-md p-6 text-center text-coffee-700">{ad.forbidden}</p>);
  }

  const shown = (quotes ?? []).filter((q) => filter === 'all' || q.status === filter);

  return wrap(
    <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2" role="group">
          {(['all', ...QUOTE_STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              aria-pressed={filter === s}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${filter === s ? 'bg-coffee-800 text-white border-coffee-800' : 'border-coffee-300 text-coffee-800 hover:bg-coffee-50'}`}
            >
              {s === 'all' ? ad.filterAll : a.statuses[s]}
              <span className="ml-1.5 opacity-70">{(quotes ?? []).filter((q) => s === 'all' || q.status === s).length}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => void load()} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-coffee-300 text-sm font-semibold text-coffee-800 hover:bg-coffee-50">
            <RefreshCw className="w-4 h-4" aria-hidden="true" /> {ad.refresh}
          </button>
          <button onClick={() => void downloadCsv()} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coffee-800 text-white text-sm font-semibold hover:bg-coffee-700">
            <Download className="w-4 h-4" aria-hidden="true" /> {ad.exportCsv}
          </button>
        </div>
      </div>

      {quotes === null ? (
        <p className="text-coffee-600"><Loader2 className="inline w-4 h-4 animate-spin" aria-hidden="true" /></p>
      ) : shown.length === 0 ? (
        <p className="text-coffee-600">{ad.empty}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm text-coffee-800">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-coffee-500 border-b border-coffee-100">
                <th scope="col" className="px-2 py-2">{a.cols.date}</th>
                <th scope="col" className="px-2 py-2">{ad.customer}</th>
                <th scope="col" className="px-2 py-2">{a.cols.coffee}</th>
                <th scope="col" className="px-2 py-2">{a.cols.quantity}</th>
                <th scope="col" className="px-2 py-2">{a.cols.destination}</th>
                <th scope="col" className="px-2 py-2 text-right">{a.cols.total}</th>
                <th scope="col" className="px-2 py-2">{a.cols.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-100 align-top">
              {shown.map((q) => {
                const phone = q.customer?.phone.replace(/[^\d+]/g, '') ?? '';
                return (
                  <tr key={q.id}>
                    <td className="px-2 py-3 whitespace-nowrap">{dateLabel(lang, q.createdAt)}<span className="block text-xs text-coffee-400">#{q.id}</span></td>
                    <td className="px-2 py-3">
                      <span className="font-semibold text-coffee-900">{q.customer?.name}</span>
                      {q.customer?.company && <span className="block text-coffee-600">{q.customer.company}</span>}
                      <span className="block text-xs text-coffee-500">{q.customer?.country}</span>
                      <span className="flex gap-3 mt-1">
                        <a href={`mailto:${q.customer?.email}`} className="inline-flex items-center gap-1 text-xs underline"><Mail className="w-3 h-3" aria-hidden="true" />{q.customer?.email}</a>
                        {phone && (
                          <a href={`https://wa.me/${phone.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs underline text-green-700">
                            <MessageCircle className="w-3 h-3" aria-hidden="true" />{q.customer?.phone}
                          </a>
                        )}
                      </span>
                      {q.note && <span className="block text-xs text-coffee-600 mt-1">{ad.note}: {q.note}</span>}
                    </td>
                    <td className="px-2 py-3">{productLabel(lang, q)}</td>
                    <td className="px-2 py-3 whitespace-nowrap">{quantityLabel(lang, q)}</td>
                    <td className="px-2 py-3">{destinationLabel(lang, q)}</td>
                    <td className="px-2 py-3 text-right whitespace-nowrap">
                      <span className="font-semibold tabular-nums">{moneyLabel(lang, q.totalUsd)}</span>
                      <span className="block text-xs text-coffee-500 tabular-nums">{moneyLabel(lang, q.usdPerKg)}/kg</span>
                    </td>
                    <td className="px-2 py-3">
                      <label className="sr-only" htmlFor={`st-${q.id}`}>{a.cols.status}</label>
                      <select
                        id={`st-${q.id}`}
                        value={q.status}
                        onChange={(e) => void setStatus(q.id, e.target.value as SavedQuote['status'])}
                        className="rounded-lg border border-coffee-300 bg-white px-2 py-1.5 text-sm"
                      >
                        {QUOTE_STATUSES.map((s) => <option key={s} value={s}>{a.statuses[s]}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-xs text-coffee-500 mt-3">{ad.count.replace('{n}', String(shown.length))}</p>
        </div>
      )}
    </div>,
  );
}
