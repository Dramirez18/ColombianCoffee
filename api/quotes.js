// /api/quotes — cotizaciones guardadas del cliente con sesión iniciada.
//   GET  → sus cotizaciones (las más recientes primero).
//   POST → guarda una cotización y la deja como solicitud de proforma. El total SE RECALCULA aquí,
//          con la misma lógica del cotizador: el navegador solo manda qué café, a dónde y cuánto.
import { authenticate } from './_auth.js';
import { loadConfig } from './_config.js';
import { dbConfigured, ensureSchema, sql } from './_db.js';
import { cleanText, readJson, send } from './_http.js';
import { publicQuote } from './_quotes.js';
import { estimate, estimateContainer } from './_pricing.js';
import { bogotaToday, getTrm } from './_trm.js';

const MAX_PER_DAY = 30;

export default async function handler(req, res) {
  try {
    if (!dbConfigured()) return send(res, 503, { ok: false, error: 'unavailable' });
    const me = await authenticate(req);
    if (!me) return send(res, 401, { ok: false, error: 'unauthenticated' });
    await ensureSchema();
    const db = sql();

    if (req.method === 'GET') {
      const rows = await db`SELECT * FROM quote_requests WHERE user_id = ${me.userId} ORDER BY created_at DESC LIMIT 100`;
      return send(res, 200, { ok: true, quotes: rows.map(publicQuote) });
    }

    if (req.method === 'POST') {
      const [customer] = await db`SELECT user_id FROM customers WHERE user_id = ${me.userId}`;
      if (!customer) return send(res, 409, { ok: false, error: 'profile_required' });
      const [{ count }] = await db`
        SELECT count(*)::int AS count FROM quote_requests
        WHERE user_id = ${me.userId} AND created_at > now() - interval '1 day'`;
      if (count >= MAX_PER_DAY) return send(res, 429, { ok: false, error: 'too_many' });

      const config = loadConfig();
      if (!config) return send(res, 503, { ok: false, error: 'unavailable' });
      const body = await readJson(req);
      const product = cleanText(body.product, 40);
      const note = cleanText(body.note, 500);
      const today = bogotaToday();

      let result;
      let row;
      if (body.mode === 'container') {
        const bags = Number(body.bags);
        result = estimateContainer(config, { product, bags }, { today });
        if (!result.ok) return send(res, 400, result);
        const q = result.quote;
        [row] = await db`
          INSERT INTO quote_requests (user_id, mode, country, product, quantity, unit, usd_per_kg, total_usd, quote, note)
          VALUES (${me.userId}, 'container', NULL, ${q.product}, ${q.bags}, 'bags', ${q.usdPerKg}, ${q.total}, ${JSON.stringify(q)}, ${note || null})
          RETURNING *`;
      } else {
        const fx = await getTrm(today, config.trmFallback);
        result = estimate(
          config,
          { country: cleanText(body.country, 8).toUpperCase(), product, kg: Number(body.kg) },
          { trm: fx.value, trmDate: fx.date, today },
        );
        if (!result.ok) return send(res, 400, result);
        const q = result.quote;
        [row] = await db`
          INSERT INTO quote_requests (user_id, mode, country, product, quantity, unit, usd_per_kg, total_usd, quote, note)
          VALUES (${me.userId}, 'courier', ${q.country}, ${q.product}, ${q.netKg}, 'kg', ${q.landedPerKg}, ${q.total}, ${JSON.stringify(q)}, ${note || null})
          RETURNING *`;
      }
      return send(res, 201, { ok: true, quote: publicQuote(row) });
    }

    res.setHeader('Allow', 'GET, POST');
    return send(res, 405, { ok: false, error: 'method_not_allowed' });
  } catch (e) {
    console.error('[quotes]', e);
    return send(res, e?.status ?? 500, { ok: false, error: e?.status === 413 ? 'body_too_large' : 'internal' });
  }
}
