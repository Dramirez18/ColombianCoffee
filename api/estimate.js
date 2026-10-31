// GET /api/estimate?country=ES&product=green-excelso&kg=50          lote courier, DAP
// GET /api/estimate?mode=container&product=washed-84-antioquia&bags=275   contenedor de 20', FOB Cartagena
// GET /api/estimate?warm                                             solo precarga la TRM
// Función de Vercel (Node). El mismo handler lo montan `vite dev`, `vite preview` y scripts/serve-dist.mjs.
// Devuelve solo totales: el tarifario y los parámetros de cálculo se quedan en el servidor.
// Cotizar exige cuenta: sesión de Clerk + perfil con la autorización de datos vigente. Sin login
// configurado (por ejemplo, en local sin claves) el cotizador queda abierto como antes.
import { loginEnabled, verifySession } from './_auth.js';
import { hasCurrentProfile } from './_db.js';
import { loadConfig } from './_config.js';
import { estimate, estimateContainer } from './_pricing.js';
import { bogotaToday, getTrm } from './_trm.js';

const KG_PATTERN = /^\d{1,6}(?:[.,]\d{1,3})?$/;
const BAGS_PATTERN = /^\d{1,5}$/;

function send(res, status, body) {
  res.statusCode = status;
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return send(res, 405, { ok: false, error: 'method_not_allowed' });
  }

  try {
    const config = loadConfig();
    if (!config) return send(res, 503, { ok: false, error: 'unavailable' });

    const params = new URL(req.url ?? '/', 'http://localhost').searchParams;
    if (!params.has('warm') && loginEnabled()) {
      const userId = await verifySession(req);
      if (!userId) return send(res, 401, { ok: false, error: 'unauthenticated' });
      if (!(await hasCurrentProfile(userId))) return send(res, 409, { ok: false, error: 'profile_required' });
    }
    const kgText = String(params.get('kg') ?? '').trim();
    const today = bogotaToday();

    // Contenedor de 20' FOB Cartagena: precios del proveedor en USD, no necesita TRM.
    if (params.get('mode') === 'container') {
      const bagsText = String(params.get('bags') ?? '').trim();
      const result = estimateContainer(
        config,
        { product: String(params.get('product') ?? '').trim(), bags: BAGS_PATTERN.test(bagsText) ? Number(bagsText) : NaN },
        { today },
      );
      return send(res, result.ok ? 200 : result.error === 'stale' || result.error === 'unavailable' ? 503 : 400, result);
    }

    const fx = await getTrm(today, config.trmFallback);

    // La página llama ?warm al cargar: deja la TRM en memoria antes de que el cliente cotice.
    if (params.has('warm')) return send(res, 200, { ok: true, warm: true });

    const result = estimate(
      config,
      {
        country: String(params.get('country') ?? '').trim().toUpperCase(),
        product: String(params.get('product') ?? '').trim(),
        kg: KG_PATTERN.test(kgText) ? Number(kgText.replace(',', '.')) : NaN,
      },
      { trm: fx.value, trmDate: fx.date, today },
    );
    return send(res, result.ok ? 200 : result.error === 'stale' ? 503 : 400, result);
  } catch (e) {
    console.error('[estimate]', e);
    return send(res, 500, { ok: false, error: 'internal' });
  }
}
