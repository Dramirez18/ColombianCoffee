/**
 * Pre-renders every public page (English + Spanish) to static HTML after the
 * client build, so search engines and AI crawlers that do not execute
 * JavaScript get the full content. Also writes sitemap.xml.
 *
 * Runs as the last step of `npm run build`:
 *   vite build                                  → dist/ (client)
 *   vite build --ssr src/entry-server.tsx       → dist-ssr/entry-server.js
 *   node scripts/prerender.mjs                  → dist/<route>/index.html
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const template = readFileSync(join(dist, 'index.html'), 'utf8')
  // The template carries a default <title>/<meta description> for the dev
  // server; the per-page head replaces them.
  .replace(/\s*<title>[\s\S]*?<\/title>/, '')
  .replace(/\s*<meta name="description"[^>]*>/, '');

const mod = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const pages = mod.prerenderPages();

for (const page of pages) {
  const html = mod.render(page.path, page.lang);
  const head = mod.head(page.tab, page.lang);
  const out = template
    .replace('<html lang="en">', `<html lang="${page.lang}">`)
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const file = page.path === '/' ? join(dist, 'index.html') : join(dist, page.path.slice(1), 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, out);
  console.log(`prerendered ${page.path}`);
}

writeFileSync(join(dist, 'sitemap.xml'), mod.sitemap());
console.log('wrote sitemap.xml');

rmSync(ssrDir, { recursive: true, force: true });
