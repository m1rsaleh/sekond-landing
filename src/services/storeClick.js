// Store links on the page (navbar, hero, sell, download, footer). Shared by
// the Meta Pixel and our own visit counter so both see the same clicks.

const STORES = {
  'apps.apple.com': { name: 'App Store', platform: 'ios' },
  'play.google.com': { name: 'Google Play', platform: 'android' },
};

// Which part of the page the click came from, so results can be split by button.
const placementOf = (el) => {
  if (el.closest('footer')) return 'footer';
  if (el.closest('header')) return 'navbar';
  const section = el.closest('section[id]');
  return section ? section.id : 'page';
};

// { name, platform, placement } when the click hit a store link, else null
export function storeClickFrom(e) {
  const link = e.target.closest?.('a[href]');
  if (!link) return null;
  let host;
  try {
    host = new URL(link.href).hostname;
  } catch {
    return null;
  }
  const store = STORES[host];
  return store ? { ...store, placement: placementOf(link) } : null;
}
