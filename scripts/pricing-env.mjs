/**
 * Imprime el valor de la variable de entorno PRICING_CONFIG para Vercel (JSON minificado de
 * config/pricing.local.json, sin las partes que solo sirven para las pruebas locales).
 *
 *   node scripts/pricing-env.mjs
 *
 * Pegar la salida en Vercel → Project → Settings → Environment Variables → PRICING_CONFIG
 * (Production y Preview) y volver a desplegar. Repetirlo cada vez que cambie la config.
 * No pegar la salida en chats, correos ni issues: es el tarifario confidencial.
 */
import { loadConfig } from '../api/_config.js';

const config = loadConfig();
if (!config) {
  console.error('falta config/pricing.local.json (o está incompleta)');
  process.exit(1);
}
const { _readme, calibration, ...rest } = config;
const { checkRows, ...tariff } = rest.tariff;
// Las notas internas del contenedor (proveedor, mapeo de lotes) no hacen falta en Vercel.
const container = rest.container && (({ source, costMap, originNote, ...c }) => c)(rest.container);
process.stdout.write(JSON.stringify({ ...rest, tariff, ...(container && { container }) }) + '\n');
