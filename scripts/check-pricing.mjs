/**
 * Verifica el cotizador de envío. Solo corre en el computador que tiene config/pricing.local.json
 * (confidencial, fuera de git): este script no contiene tarifas ni montos.
 *
 *   node scripts/check-pricing.mjs
 *
 * 1. El tarifario de la config contra el PDF de DHL (si el PDF y python con pypdf están disponibles).
 * 2. Las filas ancla de 40/50/60/70 kg se reproducen con las bandas por kilo.
 * 3. El flete nunca queda por debajo del costo DHL estimado, para todo país × producto × kg.
 * 4. Calibración contra ofertas reales de la config: nunca por debajo de su costo y a ±10 % de lo cobrado.
 * 5. Validaciones de entrada, conversión COP→USD, selección de TRM y sincronía catálogo ↔ config ↔ textos.
 * 6. Contenedor de 20' FOB: margen 6 % → 4 %, total creciente, precio por kilo decreciente, vigencia.
 */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadConfig } from '../api/_config.js';
import { PRICES_COP, containerMargin, dhlBase, estimate, estimateContainer, freightCharged, freightCost, grossKgFor, toUsdPerKg } from '../api/_pricing.js';
import { bogotaToday, pickTrm } from '../api/_trm.js';
import { CONTAINER, CONTAINER_PRODUCTS, DESTINATIONS, KG_STEP, MIN_KG, PRODUCTS } from '../shared/shipping-catalog.js';

const config = loadConfig();
assert.ok(config, 'falta config/pricing.local.json (o está incompleta)');
const { tariff } = config;
const today = bogotaToday();
const ctx = { trm: config.trmFallback.value, trmDate: config.trmFallback.date, today: '2026-10-28' };
const warnings = [];

// 1) Tarifario contra el PDF
// El PDF vive en la carpeta de logística del proyecto (fuera del repo). Se busca por nombre para no
// escribir aquí el número de cuenta DHL, que va en el nombre del archivo.
const PDF_DIR = fileURLToPath(new URL('../../../../08_Logistica_Aduana/01_DHL_FedEx_UPS/Cuenta_Propia_2026/', import.meta.url));
const pdfName = existsSync(PDF_DIR) ? readdirSync(PDF_DIR).find((f) => /tarifario.*\.pdf$/i.test(f)) : undefined;
const PDF = pdfName ? PDF_DIR + pdfName : '';
const PY = `
import json, re, sys, pypdf
r = pypdf.PdfReader(sys.argv[1])
lines = '\\n'.join(p.extract_text() for p in r.pages[:3]).split('\\n')
start = next(i for i, l in enumerate(lines) if l.startswith('Paquetes desde'))
rows, inc, mode = {}, {'half': [], 'one': []}, None
for l in lines[start:]:
    if l.startswith('Tarifa adicional por incremento 0.5'): mode = 'half'; continue
    if l.startswith('Tarifa adicional por incremento 1 KG'): mode = 'one'; continue
    if l.startswith('Premium'): break
    m = re.match(r'^([\\d\\.]+)(?: ([\\d,]+))? ((?:[\\d\\.]+ ){6}[\\d\\.]+)$', l)
    if not m: continue
    vals = [float(x) for x in m.group(3).split()]
    if mode is None: rows[m.group(1)] = vals
    else: inc[mode].append([float(m.group(1)), float(m.group(2).replace(',', ''))] + vals)
print(json.dumps({'rows': rows, 'inc': inc}))
`;
if (PDF) {
  const py = spawnSync('python', ['-I', '-c', PY, PDF], { encoding: 'utf8' });
  if (py.status === 0) {
    const pdf = JSON.parse(py.stdout);
    const fromPdf = Object.entries(pdf.rows).filter(([k]) => Number(k) <= 30).map(([k, v]) => [Number(k), ...v]);
    assert.deepEqual(tariff.baseRows, fromPdf, 'baseRows difiere del PDF');
    assert.deepEqual(tariff.stepHalfKg, pdf.inc.half, 'stepHalfKg difiere del PDF');
    assert.deepEqual(tariff.stepOneKg, pdf.inc.one.slice(0, tariff.stepOneKg.length), 'stepOneKg difiere del PDF');
    for (const [k, v] of Object.entries(pdf.rows).filter(([k]) => Number(k) > 30)) {
      assert.deepEqual(tariff.checkRows[String(Number(k))], v, `fila ancla ${k} difiere del PDF`);
    }
    console.log('1) tarifario idéntico al PDF');
  } else warnings.push(`no se pudo leer el PDF con python/pypdf: ${py.stderr.trim().split('\n').pop()}`);
} else warnings.push('PDF del tarifario no encontrado: se omite la comparación');

// 2) Bandas: todas las filas de 11-30 kg y las anclas de 40-70 kg salen de la regla de incrementos
for (const [kg, ...vals] of tariff.baseRows) vals.forEach((v, i) => assert.equal(dhlBase(tariff, i + 1, kg), v));
for (const [kg, vals] of Object.entries(tariff.checkRows)) {
  vals.forEach((v, i) => assert.equal(dhlBase(tariff, i + 1, Number(kg)), v, `ancla ${kg} kg zona ${i + 1}`));
}
console.log('2) bandas y anclas OK');

// 3) Piso: flete cobrado >= costo estimado, en todas las combinaciones
let combos = 0;
for (const d of DESTINATIONS) {
  for (const p of PRODUCTS) {
    for (let kg = MIN_KG; kg <= p.maxKg; kg += KG_STEP) {
      const r = estimate(config, { country: d.code, product: p.id, kg }, ctx);
      assert.ok(r.ok, `${d.code} ${p.id} ${kg}: ${r.error}`);
      const cost = freightCost(config, config.zones[d.code], r.quote.grossKg, r.quote.coffee);
      assert.ok(r.quote.freight >= cost, `${d.code} ${p.id} ${kg} kg: flete ${r.quote.freight} < costo ${cost.toFixed(2)}`);
      assert.ok(r.quote.grossKg <= 70, 'bruto fuera del tarifario');
      combos++;
    }
  }
}
console.log(`3) piso de costo OK en ${combos} combinaciones`);

// 4) Calibración contra ofertas reales
for (const c of config.calibration ?? []) {
  const gross = grossKgFor(config, c.kg);
  const freight = freightCharged(config, freightCost(config, config.zones[c.country], gross, 0));
  const gap = (freight - c.freight) / c.freight;
  console.log(`4) ${c.ref}: estimador ${freight} · cobrado ${c.freight} (${(gap * 100).toFixed(1)} %) · costo documentado ${c.cost}`);
  assert.ok(freight >= c.cost, `${c.ref}: el estimador queda por debajo del costo documentado`);
  assert.ok(Math.abs(gap) <= 0.1, `${c.ref}: se aleja más de 10 % de lo cobrado`);
}

// 5) Validaciones de entrada
const err = (input) => estimate(config, input, ctx).error;
assert.equal(err({ country: 'XX', product: 'green-basic', kg: 20 }), 'unknown_country');
assert.equal(err({ country: 'OTHER', product: 'green-basic', kg: 20 }), 'unknown_country');
for (const bad of ['constructor', '__proto__', 'toString', 'hasOwnProperty', '']) {
  assert.equal(err({ country: 'ES', product: bad, kg: 20 }), 'unknown_product', `producto "${bad}"`);
  assert.equal(err({ country: bad.toUpperCase(), product: 'green-basic', kg: 20 }), 'unknown_country', `país "${bad}"`);
}
assert.equal(err({ country: 'ES', product: 'green-basic', kg: NaN }), 'invalid_kg');
assert.equal(err({ country: 'ES', product: 'green-basic', kg: MIN_KG - 1 }), 'below_min');
assert.equal(err({ country: 'ES', product: 'green-basic', kg: 60.5 }), 'above_max');
assert.equal(err({ country: 'ES', product: 'roasted-castillo', kg: 50.5 }), 'above_max');
assert.ok(estimate(config, { country: 'ES', product: 'green-basic', kg: 60.2 }, ctx).ok, '60,2 redondea a 60');
assert.equal(estimate(config, { country: 'ES', product: 'green-basic', kg: 10 }, { ...ctx, today: '2099-01-01' }).error, 'stale');

// Conversión COP→USD (criterio de las proformas: al centavo, hacia arriba)
assert.equal(toUsdPerKg(28800, 3148.02), 9.15);
assert.equal(toUsdPerKg(60000, 3148.02), 19.06);
assert.equal(toUsdPerKg(43000, 3181.74), 13.52);

// TRM: la SFC publica la de mañana por adelantado; el fin de semana vale la del viernes
const rows = [
  { valor: '3162.35', vigenciadesde: '2026-10-29T00:00:00.000', vigenciahasta: '2026-10-29T00:00:00.000' },
  { valor: '3148.02', vigenciadesde: '2026-10-28T00:00:00.000', vigenciahasta: '2026-10-28T00:00:00.000' },
  { valor: '3150.00', vigenciadesde: '2026-10-24T00:00:00.000', vigenciahasta: '2026-10-27T00:00:00.000' },
];
assert.deepEqual(pickTrm(rows, '2026-10-28'), { value: 3148.02, date: '2026-10-28' });
assert.deepEqual(pickTrm(rows, '2026-10-26'), { value: 3150, date: '2026-10-24' });
assert.equal(pickTrm([{ valor: 'x', vigenciadesde: '2026-10-28' }], '2026-10-28'), null);

// Sincronía catálogo ↔ config ↔ textos
for (const d of DESTINATIONS) assert.ok(Object.hasOwn(config.zones, d.code), `sin zona para ${d.code}`);
for (const p of PRODUCTS) assert.ok(Object.hasOwn(PRICES_COP, p.id), `sin precio para ${p.id}`);
const contentTs = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8');
for (const p of PRODUCTS) assert.equal(contentTs.split(`'${p.id}': {`).length - 1, 2, `textos EN/ES de ${p.id}`);
for (const d of DESTINATIONS) assert.equal((contentTs.match(new RegExp(`^ {6}${d.code}: '`, 'gm')) ?? []).length, 2, `nota EN/ES de ${d.code}`);
console.log('5) validaciones, conversión, TRM y sincronía OK');

// 6) Contenedor de 20' FOB Cartagena
const cc = config.container;
assert.ok(cc, 'falta config.container');
for (const p of CONTAINER_PRODUCTS) assert.ok(Object.hasOwn(cc.costUsdPerKg, p.id), `sin costo de contenedor para ${p.id}`);
assert.equal(containerMargin(cc, CONTAINER.minBags), cc.margin.atMinBags);
assert.equal(containerMargin(cc, CONTAINER.fullBags), cc.margin.atFullBags);
const cctx = { today: cc.pricesDate };
for (const p of CONTAINER_PRODUCTS) {
  let prev = null;
  for (let b = CONTAINER.minBags; b <= CONTAINER.fullBags; b++) {
    const r = estimateContainer(config, { product: p.id, bags: b }, cctx);
    assert.ok(r.ok, `${p.id} ${b}: ${r.error}`);
    const q = r.quote;
    // Nunca por debajo del costo (café + origen + FNC) y con el margen esperado.
    const cost = q.kg * cc.costUsdPerKg[p.id] + cc.originFixed.reduce((t, [, v]) => t + v, 0) + (q.kg / 0.45359237) * cc.fncUsdPerLb;
    assert.ok(q.total >= cost * (1 + containerMargin(cc, b)) - 0.01, `${p.id} ${b}: total bajo el costo + margen`);
    if (prev) {
      assert.ok(q.total > prev.total, `${p.id}: el total no sube de ${b - 1} a ${b} sacos`);
      assert.ok(q.usdPerKg <= prev.usdPerKg, `${p.id}: el precio por kilo sube de ${b - 1} a ${b} sacos`);
    }
    prev = q;
  }
}
const ce = (input, today = cc.pricesDate) => estimateContainer(config, input, { today }).error;
assert.equal(ce({ product: 'washed-79', bags: CONTAINER.minBags - 1 }), 'below_min');
assert.equal(ce({ product: 'washed-79', bags: CONTAINER.fullBags + 1 }), 'above_max');
assert.equal(ce({ product: 'washed-79', bags: 150.5 }), 'invalid_bags');
assert.equal(ce({ product: 'constructor', bags: 200 }), 'unknown_product');
assert.equal(ce({ product: 'green-excelso', bags: 200 }), 'unknown_product');
const staleDay = new Date(Date.parse(cc.pricesDate + 'T00:00:00Z') + (cc.validDays + 1) * 86400000).toISOString().slice(0, 10);
assert.equal(ce({ product: 'washed-79', bags: 200 }, staleDay), 'stale');
for (const p of CONTAINER_PRODUCTS) assert.equal(contentTs.split(`'${p.id}': '`).length - 1, 2, `nombre EN/ES de ${p.id}`);
const ref = estimateContainer(config, { product: 'washed-84-antioquia', bags: CONTAINER.fullBags }, cctx).quote;
console.log(`6) contenedor OK · lavado SCA 84, 275 sacos: USD ${ref.usdPerKg}/kg FOB · total ${ref.total}`);

// Vigencias
if (today > config.fuel.validUntil) warnings.push(`el combustible (${config.fuel.note}) venció el ${config.fuel.validUntil}: actualizar fuel.rate`);
if (cc && Date.parse(today) > Date.parse(cc.pricesDate) + cc.validDays * 86400000) {
  warnings.push(`los precios de contenedor (${cc.pricesDate}) vencieron: actualizar container.costUsdPerKg desde el menú del proveedor`);
}
if (today > tariff.validUntil) warnings.push(`el tarifario venció el ${tariff.validUntil}: la API responde "stale" hasta cargar el nuevo`);

for (const w of warnings) console.warn('AVISO:', w);
console.log('check-pricing: OK');
