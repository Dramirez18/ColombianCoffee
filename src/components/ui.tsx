import { ReactNode } from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { SpecRow } from '../content';
import { COMPANY } from '../constants';

/** Centered page header used by every content page. */
export function PageHeader({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <div className="text-center mb-14 lg:mb-16">
      {eyebrow && (
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-gold-500 font-semibold mb-4">
          {eyebrow}
        </span>
      )}
      <h1 className="text-3xl md:text-5xl font-display font-bold text-coffee-900 mb-5 leading-tight">
        {title}
      </h1>
      {lead && (
        <p className="text-coffee-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">{lead}</p>
      )}
      <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-8" aria-hidden="true" />
    </div>
  );
}

export function SectionTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-coffee-900">{children}</h2>
      {sub && <p className="text-coffee-500 mt-2 max-w-2xl">{sub}</p>}
    </div>
  );
}

/** Label / value rows as a definition list — readable by people and crawlers alike. */
export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <dl className="bg-white rounded-2xl shadow-md overflow-hidden divide-y divide-coffee-100">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr] gap-1 sm:gap-6 px-5 sm:px-6 py-4">
          <dt className="text-xs uppercase tracking-wider text-coffee-400 font-semibold sm:pt-0.5">{row.label}</dt>
          <dd className="text-sm md:text-[15px] text-coffee-800 leading-relaxed m-0">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** WhatsApp + email buttons with an optional prefilled message. */
export function ContactButtons({
  whatsappLabel,
  emailLabel,
  message,
  subject,
  dark = false,
}: {
  whatsappLabel: string;
  emailLabel: string;
  message?: string;
  subject?: string;
  dark?: boolean;
}) {
  const wa = message
    ? `${COMPANY.contact.whatsappLink}?text=${encodeURIComponent(message)}`
    : COMPANY.contact.whatsappLink;
  const mail = subject
    ? `mailto:${COMPANY.contact.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${COMPANY.contact.email}`;
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg"
      >
        <MessageCircle className="w-5 h-5" />
        {whatsappLabel} {COMPANY.contact.whatsapp}
      </a>
      <a
        href={mail}
        className={`inline-flex items-center justify-center gap-2 ${dark ? 'bg-gold-500 hover:bg-gold-400 text-coffee-900' : 'bg-coffee-800 hover:bg-coffee-700 text-white'} px-6 py-3 rounded-full text-sm font-semibold transition-colors shadow-md hover:shadow-lg`}
      >
        <Mail className="w-5 h-5" />
        {emailLabel}: {COMPANY.contact.email}
      </a>
    </div>
  );
}
