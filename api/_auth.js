// Sesión de Clerk verificada en el servidor. El navegador manda el token de sesión en
// `Authorization: Bearer …`; aquí se valida la firma con CLERK_SECRET_KEY (variable de entorno de
// Vercel, nunca en el repositorio) y se lee el correo del usuario desde Clerk.
import { createClerkClient, verifyToken } from '@clerk/backend';

let client;
const clerk = () => (client ??= createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY }));

/** Orígenes desde los que se aceptan tokens: el dominio, los despliegues de Vercel y local. */
function authorizedParties() {
  const hosts = [
    'www.entrecafescolombianos.coffee',
    'entrecafescolombianos.coffee',
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ].filter(Boolean);
  return [...new Set(hosts)].map((h) => `https://${h}`).concat(['http://localhost:3000', 'http://localhost:4173']);
}

export function authConfigured() {
  return Boolean(process.env.CLERK_SECRET_KEY);
}

/** Correos de administrador (variable ADMIN_EMAILS, separados por coma). */
function adminEmails() {
  return String(process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * @returns {Promise<{ userId: string, email: string | null, emailVerified: boolean, isAdmin: boolean } | null>}
 *   null si no hay sesión válida.
 */
export async function authenticate(req) {
  if (!authConfigured()) return null;
  const header = String(req.headers?.authorization ?? '');
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) return null;
  try {
    const result = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
      authorizedParties: authorizedParties(),
    });
    const payload = result && 'data' in result ? result.data : result;
    if (!payload?.sub || (result && result.errors)) return null;
    const user = await clerk().users.getUser(payload.sub);
    const primary = user.primaryEmailAddress ?? user.emailAddresses?.[0] ?? null;
    const email = primary?.emailAddress?.toLowerCase() ?? null;
    const emailVerified = primary?.verification?.status === 'verified';
    return { userId: payload.sub, email, emailVerified, isAdmin: Boolean(email && emailVerified && adminEmails().includes(email)) };
  } catch (e) {
    console.error('[auth]', e instanceof Error ? e.message : e);
    return null;
  }
}
