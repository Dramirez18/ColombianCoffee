/**
 * Serves dist/ the way Vercel does: static files first, `/route` →
 * `dist/route/index.html`, trailing slash redirected away, and index.html as
 * the SPA fallback for anything else. Only for local verification of the
 * pre-rendered build (`vite preview` ignores the per-route index.html files).
 *
 *   node scripts/serve-dist.mjs [port]
 */
import { createServer } from 'node:http';
import { existsSync, statSync, createReadStream } from 'node:fs';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const port = Number(process.argv[2] || process.env.PORT || 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
};

function send(res, file, status = 200) {
  res.writeHead(status, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
}

createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname.length > 1 && pathname.endsWith('/')) {
    res.writeHead(308, { Location: pathname.slice(0, -1) + url.search });
    return res.end();
  }

  const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const direct = join(dist, safe);
  if (existsSync(direct) && statSync(direct).isFile()) return send(res, direct);

  const indexInDir = join(direct, 'index.html');
  if (existsSync(indexInDir)) return send(res, indexInDir);

  return send(res, join(dist, 'index.html'));
}).listen(port, () => {
  console.log(`serving ${dist} at http://localhost:${port}`);
});
