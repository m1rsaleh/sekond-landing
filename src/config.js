// Single place for links and numbers that the landing copy depends on.

export const STORE_LINKS = {
  ios: 'https://apps.apple.com/az/app/sekond/id6760208632',
  // Not published on Google Play yet. Put the Play Store URL here when it is live
  // and the "Coming soon" state disappears everywhere automatically.
  android: null,
};

// Avans percent comes live from the admin panel ("Tətbiq Xidmət Haqqı", GET /api/settings/app-fee),
// see services/appFee.service.js. This is only used until that loads or if the request fails
// (matches the backend default).
export const AVANS_PERCENT_FALLBACK = 10;

// Seller has this many hours to accept or decline an avans (avans.controller.js).
export const SELLER_REPLY_HOURS = 24;

// Buyer can open a dispute this many days after the seller accepts (dispute.controller.js).
export const DISPUTE_DAYS = 7;

// Meta (Facebook) Pixel from Events Manager, see services/metaPixel.js. null turns tracking off.
export const META_PIXEL_ID = '1727219888353027';

export const SUPPORT_EMAIL = 'support@sekond.az';
export const INSTAGRAM_URL = 'https://www.instagram.com/sekond_az/';
