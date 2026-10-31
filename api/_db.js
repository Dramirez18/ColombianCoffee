// Base de datos Neon (Postgres). La URL llega en DATABASE_URL (la carga la integración de Neon en
// Vercel). Las tablas se crean solas la primera vez que la función arranca.
import { neon } from '@neondatabase/serverless';

/** Versión vigente de la política de tratamiento de datos que el cliente acepta al registrarse. */
export const POLICY_VERSION = '2026-10-31';

export const QUOTE_STATUSES = ['new', 'proforma_sent', 'won', 'lost'];

let sqlClient;
let schemaReady;

export function dbConfigured() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

export function sql() {
  sqlClient ??= neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);
  return sqlClient;
}

const profileSeen = new Map();
const PROFILE_TTL_MS = 5 * 60 * 1000;

/**
 * ¿El usuario completó su perfil y aceptó la política vigente? Es la condición para cotizar.
 * Los "sí" quedan 5 minutos en memoria para no consultar la base en cada cálculo.
 */
export async function hasCurrentProfile(userId) {
  const seen = profileSeen.get(userId);
  if (seen && Date.now() - seen < PROFILE_TTL_MS) return true;
  await ensureSchema();
  const [row] = await sql()`SELECT 1 FROM customers WHERE user_id = ${userId} AND consent_version = ${POLICY_VERSION}`;
  if (row) profileSeen.set(userId, Date.now());
  else profileSeen.delete(userId);
  return Boolean(row);
}

export function ensureSchema() {
  schemaReady ??= (async () => {
    const db = sql();
    await db`
      CREATE TABLE IF NOT EXISTS customers (
        user_id         text PRIMARY KEY,
        email           text NOT NULL,
        name            text NOT NULL,
        company         text,
        country         text,
        phone           text,
        consent_version text NOT NULL,
        consent_at      timestamptz NOT NULL,
        created_at      timestamptz NOT NULL DEFAULT now(),
        updated_at      timestamptz NOT NULL DEFAULT now()
      )`;
    await db`
      CREATE TABLE IF NOT EXISTS quote_requests (
        id          bigserial PRIMARY KEY,
        user_id     text NOT NULL REFERENCES customers(user_id) ON DELETE CASCADE,
        mode        text NOT NULL CHECK (mode IN ('courier', 'container')),
        country     text,
        product     text NOT NULL,
        quantity    numeric NOT NULL,
        unit        text NOT NULL CHECK (unit IN ('kg', 'bags')),
        usd_per_kg  numeric(10, 2) NOT NULL,
        total_usd   numeric(12, 2) NOT NULL,
        quote       jsonb NOT NULL,
        note        text,
        status      text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'proforma_sent', 'won', 'lost')),
        created_at  timestamptz NOT NULL DEFAULT now(),
        updated_at  timestamptz NOT NULL DEFAULT now()
      )`;
    await db`CREATE INDEX IF NOT EXISTS quote_requests_user_idx ON quote_requests (user_id, created_at DESC)`;
    await db`CREATE INDEX IF NOT EXISTS quote_requests_created_idx ON quote_requests (created_at DESC)`;
  })().catch((e) => {
    schemaReady = undefined; // reintentar en la próxima petición
    throw e;
  });
  return schemaReady;
}
