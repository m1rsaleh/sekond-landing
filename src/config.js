// Single place for links and numbers that the landing copy depends on.

export const STORE_LINKS = {
  ios: 'https://apps.apple.com/az/app/sekond/id6760208632',
  // Not published on Google Play yet. Put the Play Store URL here when it is live
  // and the "Coming soon" state disappears everywhere automatically.
  android: null,
};

// Avans = this percent of the listing price (backend: AppSettings.appFee, default 10).
// If the admin changes it, update it here too.
export const AVANS_PERCENT = 10;

// Seller has this many hours to accept or decline an avans (avans.controller.js).
export const SELLER_REPLY_HOURS = 24;

// Buyer can open a dispute this many days after the seller accepts (dispute.controller.js).
export const DISPUTE_DAYS = 7;

export const SUPPORT_EMAIL = 'support@sekond.az';
export const INSTAGRAM_URL = 'https://www.instagram.com/sekond_az/';
