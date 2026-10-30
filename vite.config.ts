import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// En producción /api/estimate es una función de Vercel (api/estimate.js); en `vite dev` y
// `vite preview` la sirve este middleware con el mismo handler.
const apiEstimate: Plugin = {
  name: 'api-estimate',
  configureServer(server) {
    server.middlewares.use('/api/estimate', (req, res, next) => {
      server.ssrLoadModule('/api/estimate.js').then((m) => m.default(req, res)).catch(next)
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use('/api/estimate', (req, res, next) => {
      import(/* @vite-ignore */ new URL('./api/estimate.js', import.meta.url).href).then((m) => m.default(req, res)).catch(next)
    })
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiEstimate],
  server: {
    fs: {
      // Los valores por defecto de Vite + las carpetas del servidor: con `--host 0.0.0.0` cualquier
      // equipo de la red podría pedir /api/_pricing.js o /config/pricing.local.json como módulo.
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/api/**', '**/config/**', '**/scripts/**'],
    },
  },
  resolve: {
    alias: {
      '@': new URL('./', import.meta.url).pathname,
    },
  },
})
