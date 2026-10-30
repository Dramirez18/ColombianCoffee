// TRM oficial (Superintendencia Financiera, publicada en datos.gov.co) para convertir a USD los
// precios de venta en COP. Se guarda en memoria; cuando vence se sigue respondiendo con la guardada
// mientras se refresca en segundo plano. Si nunca se pudo consultar, se usa la de respaldo de la config.
const API = 'https://www.datos.gov.co/resource/32sa-8pi3.json?$limit=7&$order=vigenciadesde%20DESC';
const TTL_MS = 3 * 60 * 60 * 1000;
// datos.gov.co tarda a veces más de 3 s solo en el saludo TLS (medido el 30-oct-2026).
const TIMEOUT_MS = 6000;

let cache = null; // { value, date, forDay, fetchedAt, source }
let refreshing = null;

/** Fecha de hoy en Bogotá, YYYY-MM-DD. */
export function bogotaToday(now = new Date()) {
  return now.toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });
}

/** Elige la TRM vigente para `today` entre las filas de la API (la SFC publica la del día siguiente por adelantado). */
export function pickTrm(rows, today) {
  const day = (s) => String(s ?? '').slice(0, 10);
  const row =
    rows.find((r) => day(r.vigenciadesde) <= today && day(r.vigenciahasta) >= today) ??
    rows.find((r) => day(r.vigenciadesde) <= today);
  const value = Number(row?.valor);
  if (!row || !(value > 1000 && value < 10000)) return null;
  return { value, date: day(row.vigenciadesde) };
}

async function fetchTrm(today) {
  const res = await fetch(API, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const picked = pickTrm(await res.json(), today);
  if (!picked) throw new Error('respuesta sin TRM válida');
  cache = { ...picked, forDay: today, fetchedAt: Date.now(), source: 'datos.gov.co' };
  return cache;
}

function refresh(today) {
  refreshing ??= fetchTrm(today)
    .catch((e) => {
      console.error('[estimate] TRM no disponible:', e instanceof Error ? e.message : e);
      return null;
    })
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

/**
 * @param {string} today YYYY-MM-DD en Bogotá
 * @param {{value: number, date: string}} fallback
 */
export async function getTrm(today, fallback) {
  const fresh = cache && cache.forDay === today && Date.now() - cache.fetchedAt < TTL_MS;
  if (fresh) return cache;
  // Con una TRM guardada del mismo día se responde ya y se refresca en segundo plano. Si es de
  // otro día hay que esperar la nueva, para no cotizar con la de ayer.
  if (cache && cache.forDay === today) {
    void refresh(today);
    return cache;
  }
  const got = await refresh(today);
  if (got) return got;
  if (cache) return { ...cache, source: 'cache' };
  return { value: fallback.value, date: fallback.date, source: 'fallback' };
}
