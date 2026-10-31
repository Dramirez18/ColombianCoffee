import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { parsePath } from './router';

const container = document.getElementById('root')!;
const path = window.location.pathname;
const { lang, tab } = parsePath(path);
// Client-only views (customer account, admin) are not pre-rendered: the server sends the home page
// HTML as a fallback, so hydrating it would mismatch. Render them from scratch instead.
const clientOnly = tab === 'account' || tab === 'admin';

const app = (
  <StrictMode>
    <App initialPath={path} initialLang={lang ?? 'en'} />
  </StrictMode>
);

// Production pages are pre-rendered (scripts/prerender.mjs) → hydrate.
// The Vite dev server serves an empty #root → render from scratch.
if (container.hasChildNodes() && !clientOnly) {
  hydrateRoot(container, app);
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}
