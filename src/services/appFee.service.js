import { useEffect, useState } from 'react';
import { AVANS_PERCENT_FALLBACK } from '../config';

/**
 * Avans percent = the "Tətbiq Xidmət Haqqı" set in the admin panel
 * (backend AppSettings.appFee, public GET /api/settings/app-fee).
 * Same origin in production; vite proxies /api to sekond.az in dev.
 */

let cachedFee = null; // number once loaded
let inflight = null; // one shared request for every component on the page

function loadAppFee() {
  if (!inflight) {
    inflight = fetch('/api/settings/app-fee')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((json) => {
        const fee = Number(json?.data?.appFee);
        if (!Number.isFinite(fee) || fee < 0 || fee > 100) throw new Error('Invalid appFee');
        cachedFee = fee;
        return fee;
      })
      .catch((err) => {
        console.warn('[appFee] Using fallback percent:', err.message);
        inflight = null; // let a later mount retry
        return AVANS_PERCENT_FALLBACK;
      });
  }
  return inflight;
}

export function useAppFee() {
  const [fee, setFee] = useState(cachedFee ?? AVANS_PERCENT_FALLBACK);

  useEffect(() => {
    if (cachedFee !== null) return undefined;
    let alive = true;
    loadAppFee().then((value) => {
      if (alive) setFee(value);
    });
    return () => {
      alive = false;
    };
  }, []);

  return fee;
}

const round2 = (n) => Math.round(n * 100) / 100;

// Mirrors avans.controller.js: avans = price × fee / 100, rounded to 2 decimals.
export function splitPrice(price, fee) {
  const avans = round2((price * fee) / 100);
  return { avans, meet: round2(price - avans) };
}
