import { Language } from './types';
import { content } from './content';
import { SHIPPING_DESTINATIONS } from './shipping';
import type { ContainerProductId, ShippingProductId } from './shipping';

/** A saved quote as returned by /api/quotes and /api/admin/quotes. */
export interface SavedQuote {
  id: number;
  mode: 'courier' | 'container';
  country: string | null;
  product: string;
  quantity: number;
  unit: 'kg' | 'bags';
  usdPerKg: number;
  totalUsd: number;
  note: string;
  status: 'new' | 'proforma_sent' | 'won' | 'lost';
  createdAt: string;
  customer?: { email: string; name: string; company: string; country: string; phone: string };
}

export const QUOTE_STATUSES: SavedQuote['status'][] = ['new', 'proforma_sent', 'won', 'lost'];

export function productLabel(lang: Language, q: Pick<SavedQuote, 'mode' | 'product'>): string {
  const s = content(lang).shipping;
  if (q.mode === 'container') return s.container.products[q.product as ContainerProductId] ?? q.product;
  return s.products[q.product as ShippingProductId]?.name ?? q.product;
}

export function destinationLabel(lang: Language, q: Pick<SavedQuote, 'mode' | 'country'>): string {
  const s = content(lang).account;
  if (q.mode === 'container') return s.fob;
  const d = SHIPPING_DESTINATIONS.find((x) => x.code === q.country);
  return d ? (lang === 'es' ? d.es : d.en) : (q.country ?? '');
}

export function quantityLabel(lang: Language, q: Pick<SavedQuote, 'unit' | 'quantity'>): string {
  const n = new Intl.NumberFormat(lang === 'es' ? 'es-CO' : 'en-US').format(q.quantity);
  return q.unit === 'bags' ? content(lang).account.bags.replace('{n}', n) : `${n} kg`;
}

export function moneyLabel(lang: Language, n: number): string {
  return new Intl.NumberFormat(lang === 'es' ? 'es-CO' : 'en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);
}

export function dateLabel(lang: Language, iso: string): string {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', { dateStyle: 'medium', timeZone: 'America/Bogota' }).format(new Date(iso));
}
