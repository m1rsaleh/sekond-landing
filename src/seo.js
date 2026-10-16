// Canonical URLs and per-page <head> tags.
// App.jsx keeps title, description and canonical in sync while navigating. vite.config.js writes a
// copy of index.html with the right tags for each static page, so crawlers and link previews get
// them without running JS (titles and descriptions live in i18n.js under meta).

export const SITE_URL = 'https://sekond.az';

// Canonical path of each page. 'account-deletion' also answers on /account-deletion (older link).
export const PAGE_PATHS = {
  home: '/',
  privacy: '/privacy',
  terms: '/terms',
  support: '/support',
  'account-deletion': '/delete-account',
};

// { title, description } for a page in the current language. Home uses the top-level meta.
export const pageMeta = (t, page) => t.meta.pages?.[page] ?? t.meta;
