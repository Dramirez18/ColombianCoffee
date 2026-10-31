// GET /api/auth-config → clave PÚBLICA de Clerk (publishable key). Es pública por diseño; se sirve
// desde aquí para no depender de variables de compilación. Sin clave, la web oculta el login.
import { send } from './_http.js';

export default function handler(req, res) {
  const publishableKey =
    process.env.CLERK_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    process.env.VITE_CLERK_PUBLISHABLE_KEY ||
    '';
  const enabled = Boolean(publishableKey && process.env.CLERK_SECRET_KEY && (process.env.DATABASE_URL || process.env.POSTGRES_URL));
  send(res, 200, { ok: true, enabled, publishableKey: enabled ? publishableKey : null }, { 'Cache-Control': 'public, max-age=300' });
}
