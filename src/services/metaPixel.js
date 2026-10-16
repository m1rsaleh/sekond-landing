import { META_PIXEL_ID } from '../config';
import { storeClickFrom } from './storeClick';

// Meta (Facebook) Pixel for ad tracking. Does nothing until META_PIXEL_ID is set in config.js,
// and only runs in production builds.
// PageView fires on load; the pixel also fires PageView by itself on pushState/popstate,
// so the in-app page switches (terms, privacy, support) are counted without extra code.

let ready = false;

export function track(event, params) {
  if (!ready || typeof window.fbq !== 'function') return;
  if (params) window.fbq('track', event, params);
  else window.fbq('track', event);
}

// One listener for every store link on the page (navbar, hero, sell, download, footer).
const onStoreClick = (e) => {
  const click = storeClickFrom(e);
  if (!click) return;
  track('Lead', {
    content_name: click.name,
    content_category: 'app_download',
    placement: click.placement,
  });
};

export function initMetaPixel() {
  // Dev servers and local tests must not send events to the live ad account
  if (!META_PIXEL_ID || ready || import.meta.env.DEV) return;

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
