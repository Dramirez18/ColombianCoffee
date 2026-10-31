// /api/me — perfil del cliente con sesión iniciada.
//   GET    → { email, isAdmin, customer | null }
//   PUT    → crea o actualiza el perfil; exige la autorización de tratamiento de datos (Ley 1581).
//   DELETE → borra el perfil, sus cotizaciones y la cuenta de Clerk (derecho de supresión).
import { createClerkClient } from '@clerk/backend';
import { authenticate } from './_auth.js';
import { POLICY_VERSION, dbConfigured, ensureSchema, sql } from './_db.js';
import { cleanText, readJson, send } from './_http.js';

function publicCustomer(row) {
  if (!row) return null;
  return {
    name: row.name,
    company: row.company ?? '',
    country: row.country ?? '',
    phone: row.phone ?? '',
    consentVersion: row.consent_version,
    consentAt: row.consent_at,
    policyCurrent: row.consent_version === POLICY_VERSION,
  };
}

export default async function handler(req, res) {
  try {
    if (!dbConfigured()) return send(res, 503, { ok: false, error: 'unavailable' });
    const me = await authenticate(req);
    if (!me) return send(res, 401, { ok: false, error: 'unauthenticated' });
    await ensureSchema();
    const db = sql();

    if (req.method === 'GET') {
      const [row] = await db`SELECT * FROM customers WHERE user_id = ${me.userId}`;
      return send(res, 200, { ok: true, email: me.email, isAdmin: me.isAdmin, policyVersion: POLICY_VERSION, customer: publicCustomer(row) });
    }

    if (req.method === 'PUT') {
      if (!me.email || !me.emailVerified) return send(res, 403, { ok: false, error: 'email_not_verified' });
      const body = await readJson(req);
      const name = cleanText(body.name, 120);
      const company = cleanText(body.company, 120);
      const country = cleanText(body.country, 60);
      const phone = cleanText(body.phone, 40);
      if (name.length < 2) return send(res, 400, { ok: false, error: 'name_required' });
      if (body.consent !== true) return send(res, 400, { ok: false, error: 'consent_required' });
      const [row] = await db`
        INSERT INTO customers (user_id, email, name, company, country, phone, consent_version, consent_at)
        VALUES (${me.userId}, ${me.email}, ${name}, ${company || null}, ${country || null}, ${phone || null}, ${POLICY_VERSION}, now())
        ON CONFLICT (user_id) DO UPDATE SET
          email = EXCLUDED.email, name = EXCLUDED.name, company = EXCLUDED.company, country = EXCLUDED.country,
          phone = EXCLUDED.phone, consent_version = EXCLUDED.consent_version, consent_at = EXCLUDED.consent_at,
          updated_at = now()
        RETURNING *`;
      return send(res, 200, { ok: true, customer: publicCustomer(row) });
    }

    if (req.method === 'DELETE') {
      await db`DELETE FROM customers WHERE user_id = ${me.userId}`;
      await createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }).users.deleteUser(me.userId);
      return send(res, 200, { ok: true, deleted: true });
    }

    res.setHeader('Allow', 'GET, PUT, DELETE');
    return send(res, 405, { ok: false, error: 'method_not_allowed' });
  } catch (e) {
    console.error('[me]', e);
    return send(res, e?.status ?? 500, { ok: false, error: e?.status === 413 ? 'body_too_large' : 'internal' });
  }
}
