// Carga los parámetros CONFIDENCIALES del cotizador (tarifario DHL, combustible, colchón,
// preparación). En Vercel vienen en la variable de entorno PRICING_CONFIG (JSON minificado);
// en local, del archivo config/pricing.local.json, que está en .gitignore y .vercelignore.
// El repositorio es público: estos valores nunca se escriben en archivos versionados.
import { existsSync, readFileSync } from 'node:fs';

// La ruta se arma en tiempo de ejecución a propósito: así el trazador de Vercel (@vercel/nft) no la
// sigue y el archivo local nunca entra en el paquete de la función, aunque se despliegue desde aquí.
const LOCAL_FILE = new URL(['..', 'config', 'pricing.local.json'].map(String).join('/'), import.meta.url);

let cached;

function isValid(c) {
  return Boolean(
    c &&
      Array.isArray(c.tariff?.baseRows) &&
      Array.isArray(c.tariff?.stepHalfKg) &&
      Array.isArray(c.tariff?.stepOneKg) &&
      typeof c.tariff?.validUntil === 'string' &&
      c.zones &&
      typeof c.fuel?.rate === 'number' &&
      typeof c.residential === 'number' &&
      typeof c.protection?.min === 'number' &&
      typeof c.protection?.rate === 'number' &&
      typeof c.gross?.factor === 'number' &&
      typeof c.gross?.extraKg === 'number' &&
      typeof c.boxMaxKg === 'number' &&
      typeof c.cushion === 'number' &&
      typeof c.roundTo === 'number' &&
      c.prep?.green &&
      c.prep?.roasted &&
      typeof c.trmFallback?.value === 'number',
  );
}

/** @returns {object | null} la configuración, o null si falta o está incompleta. */
export function loadConfig() {
  if (cached !== undefined) return cached;
  let raw = process.env.PRICING_CONFIG;
  if (!raw && existsSync(LOCAL_FILE)) raw = readFileSync(LOCAL_FILE, 'utf8');
  try {
    const parsed = raw ? JSON.parse(raw) : null;
    cached = isValid(parsed) ? parsed : null;
  } catch {
    cached = null;
  }
  if (!cached) console.error('[estimate] PRICING_CONFIG ausente o inválida');
  return cached;
}
