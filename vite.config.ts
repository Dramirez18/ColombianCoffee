import { existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// En producción cada archivo api/<ruta>.js es una función de Vercel; en `vite dev` y `vite preview`
// este middleware sirve las mismas rutas con los mismos handlers. Los archivos con "_" son internos.
const API_ROUTE = /^\/([a-z0-9-]+(?:\/[a-z0-9-]+)*)$/
const apiFile = (url: string | undefined) => {
  const m = new URL(url ?? '/', 'http://localhost').pathname.match(API_ROUTE)
  if (!m) return null
  const file = fileURLToPath(new URL(`./api/${m[1]}.js`, import.meta.url))
  return existsSync(file) ? { file, id: `/api/${m[1]}.js` } : null
}

const apiRoutes: Plugin = {
  name: 'api-routes',
  configureServer(server) {
    server.middlewares.use('/api', (req, res, next) => {
      const route = apiFile(req.url)
      if (!route) return next()
      server.ssrLoadModule(route.id).then((m) => m.default(req, res)).catch(next)
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use('/api', (req, res, next) => {
      const route = apiFile(req.url)
      if (!route) return next()
      import(/* @vite-ignore */ pathToFileURL(route.file).href).then((m) => m.default(req, res)).catch(next)
    })
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiRoutes],
  server: {
    fs: {
      // Los valores por defecto de Vite + las carpetas del servidor: con `--host 0.0.0.0` cualquier
      // equipo de la red podría pedir /api/_pricing.js o /config/pricing.local.json como módulo.
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/api/**', '**/config/**', '**/scripts/**'],
    },
  },
  resolve: {
    alias: {
      // Solo el español de Clerk (85 KB); el paquete completo trae todos los idiomas (3,9 MB).
      'clerk-localization-es': fileURLToPath(new URL('./node_modules/@clerk/localizations/dist/es-ES.mjs', import.meta.url)),
      '@': new URL('./', import.meta.url).pathname,
    },
  },
})
