// Cálculo del cotizador de envío (servidor). Lo usan api/estimate.js, `vite dev` / `vite preview`
// y scripts/serve-dist.mjs. Este archivo está en un repositorio PÚBLICO: los parámetros
// confidenciales (tarifario DHL, combustible, colchón, preparación) llegan en `config`
// (ver api/_config.js); aquí no se escriben tarifas, costos, clientes ni proveedores.
//
// Total DAP = café + preparación y empaque + flete DHL Express puerta a puerta.
import { KG_STEP, MIN_KG, PRODUCTS, DESTINATIONS, CONTAINER, CONTAINER_PRODUCTS } from '../shared/shipping-catalog.js';

// Precios de VENTA en COP/kg (fijados por David el 28-oct-2026). Se convierten a USD con la TRM del día.
export const PRICES_COP = {
  'green-basic': 28800,
  'green-excelso': 60000,
  'green-supremo': 99000,
  'roasted-castillo': 55000,
  'roasted-bourbon': 95000,
  'roasted-fermented': 180000,
};

const round2 = (x) => Math.round(x * 100) / 100;
// Redondeo a 6 decimales antes de ceil: evita que un 55,00000000000001 de coma flotante suba un escalón.
const ceilClean = (x) => Math.ceil(Math.round(x * 1e6) / 1e6);

/** COP/kg → USD/kg con la TRM, redondeado al centavo hacia arriba (criterio de las proformas). */
export function toUsdPerKg(cop, trm) {
  return ceilClean((cop / trm) * 100) / 100;
}

function stepRate(table, kg, z) {
  const band = table.find(([from, to]) => kg >= from - 1e-9 && kg <= to + 1e-9) ?? table[table.length - 1];
  return band[2 + z];
}

/** Tarifa base DHL (sin combustible ni recargos) para `kg` facturables en la zona `zone` (1-7). */
export function dhlBase(tariff, zone, kg) {
  const z = zone - 1;
  if (!(zone >= 1 && zone <= 7) || !(kg > 0) || kg > 70) throw new RangeError('peso o zona fuera del tarifario');
  const row = (w) => tariff.baseRows.find(([k]) => k >= w - 1e-9)[1 + z];
  if (kg <= 10) return round2(row(ceilClean(kg * 2) / 2));
  if (kg <= 30) {
    const steps = ceilClean((kg - 10) * 2);
    let total = row(10);
    for (let s = 1; s <= steps; s++) total += stepRate(tariff.stepHalfKg, 10 + s / 2 - 0.25, z);
    return round2(total);
  }
  const steps = ceilClean(kg - 30);
  let total = row(30);
  for (let s = 1; s <= steps; s++) total += stepRate(tariff.stepOneKg, 30 + s - 0.5, z);
  return round2(total);
}

/** Peso bruto facturable: neto × factor + kg de empaque, redondeado al kg superior. */
export function grossKgFor(config, netKg) {
  return ceilClean(netKg * config.gross.factor + config.gross.extraKg);
}

/**
 * Costo DHL estimado: (tarifa + entrega residencial) con combustible, más la protección del envío.
 * La entrega residencial se suma siempre: DHL la ha cobrado incluso a empresas.
 */
export function freightCost(config, zone, grossKg, declaredValue) {
  const protection = Math.max(config.protection.min, declaredValue * config.protection.rate);
  return (dhlBase(config.tariff, zone, grossKg) + config.residential) * (1 + config.fuel.rate) + protection;
}

/** Flete cobrado: costo + colchón (repeso y variación semanal del combustible), redondeado hacia arriba. */
export function freightCharged(config, cost) {
  return ceilClean(round2(cost * (1 + config.cushion)) / config.roundTo) * config.roundTo;
}

/**
 * @param {object} config parámetros confidenciales (api/_config.js)
 * @param {{country: string, product: string, kg: number}} input
 * @param {{trm: number, trmDate: string, today: string}} ctx today = YYYY-MM-DD en Bogotá
 */
export function estimate(config, { country, product, kg }, { trm, trmDate, today }) {
  const zone = Object.hasOwn(config.zones, country) && DESTINATIONS.some((d) => d.code === country)
    ? config.zones[country]
    : undefined;
  const prod = PRODUCTS.find((p) => p.id === product);
  if (!zone) return { ok: false, error: 'unknown_country' };
  if (!prod || !Object.hasOwn(PRICES_COP, product)) return { ok: false, error: 'unknown_product' };
  if (today > config.tariff.validUntil) return { ok: false, error: 'stale' };

  if (!Number.isFinite(kg)) return { ok: false, error: 'invalid_kg', minKg: MIN_KG, maxKg: prod.maxKg };
  const netKg = Math.round(kg / KG_STEP) * KG_STEP;
  if (netKg < MIN_KG) return { ok: false, error: 'below_min', minKg: MIN_KG, maxKg: prod.maxKg };
  if (netKg > prod.maxKg) return { ok: false, error: 'above_max', minKg: MIN_KG, maxKg: prod.maxKg };

  const usdPerKg = toUsdPerKg(PRICES_COP[product], trm);
  const coffee = round2(netKg * usdPerKg);
  const prepRule = config.prep[prod.group];
  const prep = ceilClean(prepRule.fixed + prepRule.perKg * netKg);
  const grossKg = grossKgFor(config, netKg);
  const freight = freightCharged(config, freightCost(config, zone, grossKg, coffee));
  const total = round2(coffee + prep + freight);

  return {
    ok: true,
    quote: {
      currency: 'USD',
      country,
      product,
      netKg,
      grossKg,
      boxes: Math.ceil(grossKg / config.boxMaxKg),
      usdPerKg,
      coffee,
      prep,
      freight,
      total,
      landedPerKg: round2(total / netKg),
      asOf: today,
      fx: { trm, date: trmDate },
    },
  };
}

const KG_PER_LB = 0.45359237;

/** Días entre dos fechas YYYY-MM-DD. */
function daysBetween(from, to) {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000);
}

/**
 * Margen del contenedor: baja en línea recta desde el mínimo de sacos hasta el contenedor lleno.
 * Así el total siempre sube con la cantidad y el precio por kilo siempre baja (sin saltos).
 */
export function containerMargin(cfg, bags) {
  const { atMinBags, atFullBags } = cfg.margin;
  const t = (bags - CONTAINER.minBags) / (CONTAINER.fullBags - CONTAINER.minBags);
  return atMinBags - (atMinBags - atFullBags) * t;
}

/**
 * Contenedor de 20' de café verde, FOB Cartagena:
 *   (1 + margen) × (café EXW del proveedor + costos de origen fijos + contribución FNC por libra).
 * El costo del proveedor y los costos de origen vienen de la config confidencial; aquí no se escriben.
 * @param {object} config
 * @param {{product: string, bags: number}} input
 * @param {{today: string}} ctx
 */
export function estimateContainer(config, { product, bags }, { today }) {
  const cfg = config.container;
  if (!cfg) return { ok: false, error: 'unavailable' };
  const prod = CONTAINER_PRODUCTS.find((p) => p.id === product);
  if (!prod || !Object.hasOwn(cfg.costUsdPerKg, product)) return { ok: false, error: 'unknown_product' };
  if (daysBetween(cfg.pricesDate, today) > cfg.validDays) return { ok: false, error: 'stale' };
  const limits = { minBags: CONTAINER.minBags, fullBags: CONTAINER.fullBags };
  if (!Number.isInteger(bags)) return { ok: false, error: 'invalid_bags', ...limits };
  if (bags < CONTAINER.minBags) return { ok: false, error: 'below_min', ...limits };
  if (bags > CONTAINER.fullBags) return { ok: false, error: 'above_max', ...limits };

  const kg = bags * CONTAINER.bagKg;
  const originFixed = cfg.originFixed.reduce((sum, [, usd]) => sum + usd, 0);
  const cost = kg * cfg.costUsdPerKg[product] + originFixed + (kg / KG_PER_LB) * cfg.fncUsdPerLb;
  const usdPerKg = ceilClean(((1 + containerMargin(cfg, bags)) * cost / kg) * 100) / 100;
  const total = round2(usdPerKg * kg);

  return {
    ok: true,
    quote: {
      mode: 'container',
      currency: 'USD',
      incoterm: 'FOB Cartagena',
      product,
      bags,
      kg,
      full: bags === CONTAINER.fullBags,
      usdPerKg,
      usdPerLb: ceilClean(usdPerKg * KG_PER_LB * 100) / 100,
      total,
      asOf: today,
      pricesDate: cfg.pricesDate,
    },
  };
}
