import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { translations } from './src/i18n.js';
import { PAGE_PATHS, SITE_URL } from './src/seo.js';

// Paths served as real files (dist/<path>.html), each a copy of index.html with its own
// title, description and canonical so crawlers and link previews see them without JS.
// Flat files, not <path>/index.html: nginx would 301 /privacy to /privacy/ for a directory.
// Any other path gets dist/404.html (see the nginx config). Add new routes here.
const STATIC_PAGES = [
  { path: '/privacy', page: 'privacy' },
  { path: '/terms', page: 'terms' },
  { path: '/support', page: 'support' },
  { path: '/delete-account', page: 'account-deletion' },
  { path: '/account-deletion', page: 'account-deletion' },
  // Epoint sends buyers back here after paying: keep them working, keep them out of search.
  { path: '/payment-success', robots: 'noindex' },
  { path: '/payment-error', robots: 'noindex' },
  { path: '/payment-result', robots: 'noindex' },
];

const NOT_FOUND = { title: 'Səhifə tapılmadı · SEKOND', robots: 'noindex' };

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Sets the attribute value captured right after `prefix` (a literal start of a one-line tag).
const setAttr = (html, prefix, value) => html.replace(new RegExp(`(${prefix})[^"]*`), (_, start) => start + esc(value));

function withHead(html, { title, description, canonical, robots }) {
  // Structured data describes the home page only.
  let out = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  if (title) {
    out = out.replace(/<title>.*<\/title>/, () => `<title>${esc(title)}</title>`);
    out = setAttr(out, '<meta property="og:title" content="', title);
  }
  if (description) {
    out = setAttr(out, '<meta name="description" content="', description);
    out = setAttr(out, '<meta property="og:description" content="', description);
  }
  if (canonical) {
    out = setAttr(out, '<link rel="canonical" href="', canonical);
    out = setAttr(out, '<meta property="og:url" content="', canonical);
  } else {
    out = out.replace(/\s*<link rel="canonical"[^>]*>/, '');
  }
  if (robots) out = out.replace('</title>', `</title>\n    <meta name="robots" content="${robots}" />`);
  return out;
}

function staticPages() {
  return {
    name: 'sekond-static-pages',
    apply: 'build',
    writeBundle({ dir }) {
      const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
      const write = (file, head) => {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, withHead(html, head));
      };
      for (const { path: urlPath, page, robots } of STATIC_PAGES) {
        write(path.join(dir, `${urlPath}.html`), {
          ...(page && translations.az.meta.pages[page]),
          canonical: page && SITE_URL + PAGE_PATHS[page],
          robots,
        });
      }
      write(path.join(dir, '404.html'), NOT_FOUND);
    },
  };
}

export default defineConfig({
  plugins: [react(), staticPages()],
  server: {
    historyApiFallback: true,
    // Dev only: same-origin /api like production (avans percent, etc.)
    proxy: {
      // API_PROXY_TARGET=http://localhost:5001 to test against a local backend
      '/api': { target: process.env.API_PROXY_TARGET || 'https://sekond.az', changeOrigin: true },
    },
  },
  preview: {
    cors: true,
  },
});
