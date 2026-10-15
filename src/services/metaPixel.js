import { META_PIXEL_ID } from '../config';

// Meta (Facebook) Pixel for ad tracking. Does nothing until META_PIXEL_ID is set in config.js.
// PageView fires on load; the pixel also fires PageView by itself on pushState/popstate,
// so the in-app page switches (terms, privacy, support) are counted without extra code.

const STORE_HOSTS = {
  'apps.apple.com': 'App Store',
  'play.google.com': 'Google Play',
};

let ready = false;

export function track(event, params) {
  if (!ready || typeof window.fbq !== 'function') return;
  if (params) window.fbq('track', event, params);
  else window.fbq('track', event);
}

// Which part of the page the click came from, so ad results can be split by button.
const placementOf = (el) => {
  if (el.closest('footer')) return 'footer';
  if (el.closest('header')) return 'navbar';
  const section = el.closest('section[id]');
  return section ? section.id : 'page';
};

// One listener for every store link on the page (navbar, hero, sell, download, footer).
const onStoreClick = (e) => {
  const link = e.target.closest?.('a[href]');
  if (!link) return;
  let host;
  try {
    host = new URL(link.href).hostname;
  } catch {
    return;
  }
  const store = STORE_HOSTS[host];
  if (!store) return;
  track('Lead', {
    content_name: store,
    content_category: 'app_download',
    placement: placementOf(link),
  });
};

export function initMetaPixel() {
  if (!META_PIXEL_ID || ready) return;

  /* eslint-disable */
  // Meta's standard base code (loads fbevents.js asynchronously).
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
  ready = true;

  document.addEventListener('click', onStoreClick, true);
}
