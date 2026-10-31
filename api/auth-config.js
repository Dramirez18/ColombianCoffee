// GET /api/auth-config → clave PÚBLICA de Clerk (publishable key). Es pública por diseño; se sirve
// desde aquí para no depender de variables de compilación. Sin clave, la web oculta el login.
import { loginEnabled, publishableKey } from './_auth.js';
import { send } from './_http.js';

export default function handler(req, res) {
  const enabled = loginEnabled();
  send(res, 200, { ok: true, enabled, publishableKey: enabled ? publishableKey() : null }, { 'Cache-Control': 'public, max-age=300' });
}
