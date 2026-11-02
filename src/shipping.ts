/**
 * Cotizador de envío: datos públicos (catálogo compartido con la función en api/) y la forma de
 * la respuesta de /api/estimate. Los precios y el tarifario DHL viven solo en el servidor.
 */
export {
  MIN_KG as SHIPPING_MIN_KG,
  KG_STEP as SHIPPING_KG_STEP,
  PRODUCTS as SHIPPING_PRODUCTS,
  DESTINATIONS as SHIPPING_DESTINATIONS,
  OTHER_COUNTRY,
  CONTAINER,
  CONTAINER_PRODUCTS,
} from '../shared/shipping-catalog.js';
export type {
  ShippingProductId,
  ShippingProductGroup,
  ContainerProductId,
  ContainerProductGroup,
} from '../shared/shipping-catalog.js';

import type { ContainerProductId, ShippingProductId } from '../shared/shipping-catalog.js';
import { DESTINATIONS } from '../shared/shipping-catalog.js';
import type { Language } from './types';

type Destination = (typeof DESTINATIONS)[number];

/** Country name in a list or table. */
export function destinationName(d: Destination, lang: Language): string {
  return d[lang];
}

/** Country name inside a sentence ("ship to the United States"). */
export function destinationInText(d: Destination, lang: Language): string {
  return lang === 'en' ? d.enIn : d[lang];
}

export interface ShippingQuote {
  currency: 'USD';
  country: string;
  product: ShippingProductId;
  netKg: number;
  grossKg: number;
  boxes: number;
  usdPerKg: number;
  coffee: number;
  prep: number;
  freight: number;
  total: number;
  landedPerKg: number;
  asOf: string;
  fx: { trm: number; date: string };
}

/** Respuesta de /api/estimate?mode=container — contenedor de 20', FOB Cartagena. */
export interface ContainerQuote {
  mode: 'container';
  currency: 'USD';
  incoterm: 'FOB Cartagena';
  product: ContainerProductId;
  bags: number;
  kg: number;
  full: boolean;
  usdPerKg: number;
  usdPerLb: number;
  total: number;
  asOf: string;
  pricesDate: string;
}
