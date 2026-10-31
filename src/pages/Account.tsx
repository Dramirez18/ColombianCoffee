import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Loader2, LogIn, LogOut, Calculator, Trash2 } from 'lucide-react';
import { Language, Tab } from '../types';
import { content } from '../content';
import { useAuth } from '../auth';
import Link from '../components/Link';
import { PageHeader } from '../components/ui';
import { SavedQuote, dateLabel, destinationLabel, moneyLabel, productLabel, quantityLabel } from '../quoteLabels';

interface Props {
  lang: Language;
  navigate: (tab: Tab) => void;
}

const STATUS_STYLE: Record<SavedQuote['status'], string> = {
  new: 'bg-gold-500/15 text-coffee-800',
  proforma_sent: 'bg-blue-100 text-blue-900',
  won: 'bg-green-100 text-green-900',
  lost: 'bg-coffee-100 text-coffee-700',
};

export default function Account({ lang, navigate }: Props) {
  const c = content(lang);
  const a = c.account;
  const auth = useAuth();
  const [editing, setEditing] = useState(false);
  const [quotes, setQuotes] = useState<SavedQuote[] | null>(null);
  const [deleted, setDeleted] = useState(false);

  const loadQuotes = useCallback(async () => {
    const res = await auth.authFetch('/api/quotes');
    const data = await res.json().catch(() => ({}));
    setQuotes(data.ok ? data.quotes : []);
  }, [auth]);

  const ready = auth.status === 'signedIn' && auth.customer?.policyCurrent;
  useEffect(() => {
    if (ready) void loadQuotes();
  }, [ready, loadQuotes]);

  const card = 'bg-white rounded-2xl shadow-md p-6 md:p-8';

  if (deleted) {
    return (
      <Shell title={a.title}>
        <p className={`${card} text-coffee-700`}>{a.deleted}</p>
      </Shell>
    );
  }

  if (auth.status === 'loading') {
    return (
      <Shell title={a.title}>
        <p className="flex items-center justify-center gap-2 text-coffee-600"><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> {a.loading}</p>
      </Shell>
    );
  }

  if (auth.status === 'disabled') {
    return (
      <Shell title={a.title}>
        <p className={`${card} text-coffee-700`}>{a.unavailable}</p>
      </Shell>
    );
  }

  if (auth.status === 'signedOut') {
    return (
      <Shell title={a.title} lead={a.lead}>
        <div className={`${card} text-center`}>
          <h2 className="font-display text-2xl font-bold text-coffee-900 mb-3">{a.signedOutTitle}</h2>
          <p className="text-coffee-600 mb-6 max-w-lg mx-auto">{a.signedOutText}</p>
          <button
            onClick={auth.openSignIn}
            className="inline-flex items-center gap-2 bg-coffee-800 hover:bg-coffee-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            <LogIn className="w-4 h-4" aria-hidden="true" /> {a.signInCta}
          </button>
        </div>
      </Shell>
    );
  }

  const needsProfile = !auth.customer || !auth.customer.policyCurrent;

  return (
    <Shell title={a.title}>
      <div className="space-y-8">
        {needsProfile || editing ? (
          <ProfileForm lang={lang} navigate={navigate} onDone={() => setEditing(false)} showCancel={!needsProfile} />
        ) : (
          <div className={`${card} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
            <div>
              <h2 className="font-display text-2xl font-bold text-coffee-900">{a.hello.replace('{name}', auth.customer!.name)}</h2>
              <p className="text-sm text-coffee-600">
                {auth.email}
                {auth.customer!.company && ` · ${auth.customer!.company}`}
                {auth.customer!.country && ` · ${auth.customer!.country}`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setEditing(true)} className="px-4 py-2 rounded-full border border-coffee-300 text-sm font-semibold text-coffee-800 hover:bg-coffee-50">
                {a.editProfile}
              </button>
              <button onClick={() => void auth.signOut()} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-coffee-300 text-sm font-semibold text-coffee-800 hover:bg-coffee-50">
                <LogOut className="w-4 h-4" aria-hidden="true" /> {a.signOut}
              </button>
            </div>
          </div>
        )}

        {!needsProfile && (
          <section className={card}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <h2 className="font-display text-2xl font-bold text-coffee-900">{a.quotesTitle}</h2>
              <Link tab="shipping" lang={lang} navigate={navigate} className="inline-flex items-center gap-2 bg-coffee-800 hover:bg-coffee-700 text-white px-4 py-2 rounded-full text-sm font-semibold">
                <Calculator className="w-4 h-4" aria-hidden="true" /> {a.newQuote}
              </Link>
            </div>
            {quotes === null ? (
              <p className="flex items-center gap-2 text-coffee-600"><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> {a.loading}</p>
            ) : quotes.length === 0 ? (
              <p className="text-coffee-600">{a.quotesEmpty}</p>
            ) : (
              <div className="overflow-x-auto -mx-2">
                <table className="w-full min-w-[640px] text-sm text-coffee-800">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-coffee-500 border-b border-coffee-100">
                      <th scope="col" className="px-2 py-2">{a.cols.date}</th>
                      <th scope="col" className="px-2 py-2">{a.cols.coffee}</th>
                      <th scope="col" className="px-2 py-2">{a.cols.quantity}</th>
                      <th scope="col" className="px-2 py-2">{a.cols.destination}</th>
                      <th scope="col" className="px-2 py-2 text-right">{a.cols.total}</th>
                      <th scope="col" className="px-2 py-2">{a.cols.status}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-coffee-100">
                    {quotes.map((q) => (
                      <tr key={q.id}>
                        <td className="px-2 py-3 whitespace-nowrap">{dateLabel(lang, q.createdAt)}</td>
                        <td className="px-2 py-3">{productLabel(lang, q)}</td>
                        <td className="px-2 py-3 whitespace-nowrap">{quantityLabel(lang, q)}</td>
                        <td className="px-2 py-3">{destinationLabel(lang, q)}</td>
                        <td className="px-2 py-3 text-right font-semibold tabular-nums whitespace-nowrap">{moneyLabel(lang, q.totalUsd)}</td>
                        <td className="px-2 py-3">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[q.status]}`}>{a.statuses[q.status]}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        <section className="border border-coffee-200 rounded-2xl p-6">
          <h2 className="font-semibold text-coffee-900 mb-1">{a.deleteTitle}</h2>
          <p className="text-sm text-coffee-600 mb-4">{a.deleteText}</p>
          <button
            onClick={async () => {
              if (!window.confirm(a.deleteConfirm)) return;
              const res = await auth.authFetch('/api/me', { method: 'DELETE' });
              if (res.ok) {
                setDeleted(true);
                await auth.signOut().catch(() => {});
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-300 text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" /> {a.deleteCta}
          </button>
        </section>
      </div>
    </Shell>
  );
}

function Shell({ title, lead, children }: { title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={title} lead={lead} />
        {children}
      </div>
    </section>
  );
}

function ProfileForm({ lang, navigate, onDone, showCancel }: { lang: Language; navigate: (tab: Tab) => void; onDone: () => void; showCancel: boolean }) {
  const a = content(lang).account;
  const auth = useAuth();
  const current = auth.customer;
  const [form, setForm] = useState({
    name: current?.name ?? '',
    company: current?.company ?? '',
    country: current?.country ?? '',
    phone: current?.phone ?? '',
  });
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError(a.nameRequired);
    if (!consent) return setError(a.consentRequired);
    setSaving(true);
    setError('');
    try {
      const res = await auth.authFetch('/api/me', { method: 'PUT', body: JSON.stringify({ ...form, consent: true }) });
      if (!res.ok) throw new Error();
      await auth.refresh();
      onDone();
    } catch {
      setError(a.saveError);
    } finally {
      setSaving(false);
    }
  };

  const input = 'w-full rounded-xl border border-coffee-300 bg-white px-4 py-3 text-coffee-900 focus:outline-none focus:border-coffee-700 focus-visible:ring-2 focus-visible:ring-coffee-700';
  const label = 'block text-xs uppercase tracking-wider text-coffee-500 font-semibold mb-2';
  const [before, after] = a.consentLabel.split('{policy}');

  return (
    <form onSubmit={submit} noValidate className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-5">
      <div>
        <h2 className="font-display text-2xl font-bold text-coffee-900">{a.profileTitle}</h2>
        <p className="text-sm text-coffee-600 mt-1">{a.profileLead}</p>
        <p className="text-sm text-coffee-500 mt-1">{auth.email}</p>
        {current && !current.policyCurrent && <p className="text-sm text-coffee-800 bg-gold-500/15 rounded-xl px-4 py-3 mt-3">{a.policyUpdated}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(['name', 'company', 'country', 'phone'] as const).map((k) => (
          <div key={k}>
            <label htmlFor={`acct-${k}`} className={label}>
              {a.fields[k]} {k !== 'name' && <span className="normal-case tracking-normal font-normal">({a.optional})</span>}
            </label>
            <input
              id={`acct-${k}`}
              value={form[k]}
              onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
              autoComplete={{ name: 'name', company: 'organization', country: 'country-name', phone: 'tel' }[k]}
              type={k === 'phone' ? 'tel' : 'text'}
              maxLength={k === 'phone' ? 40 : 120}
              required={k === 'name'}
              className={input}
            />
          </div>
        ))}
      </div>
      <label className="flex items-start gap-3 text-sm text-coffee-700">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 accent-[#7A4F2B]" required />
        <span>
          {before}
          <Link tab="privacy" lang={lang} navigate={navigate} className="underline font-semibold text-coffee-900">{a.consentLink}</Link>
          {after}
        </span>
      </label>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="bg-coffee-800 hover:bg-coffee-700 disabled:opacity-60 text-white px-6 py-3 rounded-full font-semibold">
          {saving ? a.saving : a.save}
        </button>
        {showCancel && (
          <button type="button" onClick={onDone} className="px-6 py-3 rounded-full border border-coffee-300 font-semibold text-coffee-800">
            {a.cancel}
          </button>
        )}
      </div>
    </form>
  );
}
