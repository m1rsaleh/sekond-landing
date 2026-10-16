import { storeClickFrom } from './storeClick';

// Our own visit counter for the admin dashboard: page views and store-button
// clicks go to /api/analytics/event. No cookies and no IP — the visitor is a
// random id kept in localStorage; the source (UTM tags, referrer) is read once
// per browser session.

const ENDPOINT = '/api/analytics/event';
const VISITOR_KEY = 'sekond-vid';
const SOURCE_KEY = 'sekond-src';

const randomId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

let visitorId = null;
const getVisitorId = () => {
  if (visitorId) return visitorId;
  try {
    visitorId = localStorage.getItem(VISITOR_KEY);
    if (!visitorId) {
      visitorId = randomId();
      localStorage.setItem(VISITOR_KEY, visitorId);
    }
  } catch {
    visitorId = randomId(); // private mode: counted per page load
  }
  return visitorId;
};

// Where this session came from, fixed at its first page
const getSource = () => {
  try {
    const saved = sessionStorage.getItem(SOURCE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    /* fall through and read it from this page */
  }
  const q = new URLSearchParams(window.location.search);
  const source = {
    referrer: document.referrer || '',
    utm_source: q.get('utm_source') || '',
    utm_medium: q.get('utm_medium') || '',
    utm_campaign: q.get('utm_campaign') || '',
    // Only whether the ad click ids are there, not their values
    fbclid: q.has('fbclid') ? '1' : '',
    gclid: q.has('gclid') ? '1' : '',
  };
  try {
    sessionStorage.setItem(SOURCE_KEY, JSON.stringify(source));
  } catch {
    /* not remembered across pages; each page reads its own */
  }
  return source;
};

const send = (event) => {
  const body = JSON.stringify({ vid: getVisitorId(), ...getSource(), ...event });
  try {
    if (navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: 'text/plain' }))) return;
  } catch {
    /* fall back to fetch */
  }
  fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'text/plain' } }).catch(
    () => {}
  );
};

// Payment result pages open inside the app's payment flow, not real visits
const isTracked = (path) => !path.startsWith('/payment-');

let lastPath = null;
export function trackPageview() {
  const path = window.location.pathname;
  // React StrictMode runs effects twice in development; one page = one view
  if (path === lastPath || !isTracked(path)) return;
  lastPath = path;
  send({ type: 'pageview', path });
}

const onStoreClick = (e) => {
  const click = storeClickFrom(e);
  if (!click || !isTracked(window.location.pathname)) return;
  send({ type: 'store_click', path: window.location.pathname, store: click.platform, placement: click.placement });
};

let started = false;
export function initAnalytics() {
  if (started) return;
  started = true;
  document.addEventListener('click', onStoreClick, true);
}
