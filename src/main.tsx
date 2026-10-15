import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { parsePath } from './router';

const container = document.getElementById('root')!;
const path = window.location.pathname;
const { lang } = parsePath(path);

const app = (
  <StrictMode>
    <App initialPath={path} initialLang={lang ?? 'en'} />
  </StrictMode>
);

// Production pages are pre-rendered (scripts/prerender.mjs) → hydrate.
// The Vite dev server serves an empty #root → render from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
