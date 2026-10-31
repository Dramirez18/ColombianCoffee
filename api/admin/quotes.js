// /api/admin/quotes — panel del administrador (solo correos en ADMIN_EMAILS, verificado en Clerk).
//   GET   → todas las solicitudes con los datos del cliente. ?format=csv las descarga en CSV.
//   PATCH → { id, status } cambia el estado (new, proforma_sent, won, lost).
import { authenticate } from '../_auth.js';
import { QUOTE_STATUSES, dbConfigured, ensureSchema, sql } from '../_db.js';
import { readJson, send } from '../_http.js';
import { publicQuote } from '../_quotes.js';

function csvCell(v) {
  const s = v == null ? '' : String(v);
  // Evita que Excel interprete fórmulas (=, +, -, @) y escapa comillas.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
}

export default async function handler(req, res) {
  try {
    if (!dbConfigured()) return send(res, 503, { ok: false, error: 'unavailable' });
    const me = await authenticate(req);
    if (!me) return send(res, 401, { ok: false, error: 'unauthenticated' });
    if (!me.isAdmin) return send(res, 403, { ok: false, error: 'forbidden' });
    await ensureSchema();
    const db = sql();

    if (req.method === 'GET') {
      const rows = await db`
        SELECT q.*, c.email, c.name, c.company, c.country AS customer_country, c.phone
        FROM quote_requests q JOIN customers c ON c.user_id = q.user_id
        ORDER BY q.created_at DESC LIMIT 1000`;
      const items = rows.map((r) => ({
        ...publicQuote(r),
        customer: { email: r.email, name: r.name, company: r.company ?? '', country: r.customer_country ?? '', phone: r.phone ?? '' },
      }));
      const params = new URL(req.url ?? '/', 'http://localhost').searchParams;
      if (params.get('format') === 'csv') {
        const header = ['id', 'fecha', 'estado', 'modo', 'producto', 'cantidad', 'unidad', 'pais_destino', 'usd_por_kg', 'total_usd', 'nombre', 'empresa', 'correo', 'pais_cliente', 'telefono', 'nota'];
        const lines = items.map((i) => [i.id, new Date(i.createdAt).toISOString(), i.status, i.mode, i.product, i.quantity, i.unit, i.country ?? '', i.usdPerKg, i.totalUsd, i.customer.name, i.customer.company, i.customer.email, i.customer.country, i.customer.phone, i.note].map(csvCell).join(','));
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="solicitudes-cotizacion.csv"');
        res.setHeader('Cache-Control', 'no-store');
        return res.end('\uFEFF' + [header.join(','), ...lines].join('\r\n'));
      }
      return send(res, 200, { ok: true, quotes: items });
    }

    if (req.method === 'PATCH') {
      const body = await readJson(req);
      const id = Number(body.id);
      if (!Number.isInteger(id) || !QUOTE_STATUSES.includes(body.status)) return send(res, 400, { ok: false, error: 'invalid' });
      const [row] = await db`UPDATE quote_requests SET status = ${body.status}, updated_at = now() WHERE id = ${id} RETURNING *`;
      if (!row) return send(res, 404, { ok: false, error: 'not_found' });
      return send(res, 200, { ok: true, quote: publicQuote(row) });
    }

    res.setHeader('Allow', 'GET, PATCH');
    return send(res, 405, { ok: false, error: 'method_not_allowed' });
  } catch (e) {
    console.error('[admin/quotes]', e);
    return send(res, e?.status ?? 500, { ok: false, error: 'internal' });
  }
}
