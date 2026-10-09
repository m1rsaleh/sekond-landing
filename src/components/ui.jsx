import { motion } from 'framer-motion';
import { STORE_LINKS } from '../config';

/* ---------- Icons (custom strokes, no icon library) ---------- */

const Svg = ({ children, size = 22, className = '', ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`icon ${className}`}
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

export const Icon = {
  Search: (p) => (
    <Svg {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </Svg>
  ),
  Wallet: (p) => (
    <Svg {...p}>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" />
      <rect x="4" y="8" width="16" height="11" rx="2.5" />
      <path d="M15.5 13.5h1.5" />
    </Svg>
  ),
  Handshake: (p) => (
    <Svg {...p}>
      <path d="m3 11 4-4 3 1.5L13 6l4 1 4 4" />
      <path d="m7 13 3.5 3.5a1.4 1.4 0 0 0 2-2L10 12" />
      <path d="m11 15.5 1.5 1.5a1.4 1.4 0 0 0 2-2l-1-1" />
      <path d="m14 16 .5.5a1.4 1.4 0 0 0 2-2L13 11" />
      <path d="M3 11v2l4 4" />
    </Svg>
  ),
  Shield: (p) => (
    <Svg {...p}>
      <path d="M12 3.5 19 6v5.5c0 4.2-3 7.6-7 9-4-1.4-7-4.8-7-9V6l7-2.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </Svg>
  ),
  Chat: (p) => (
    <Svg {...p}>
      <path d="M5 18.5V7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6a2.5 2.5 0 0 1-2.5 2.5H9l-4 2.5Z" />
      <path d="M9 10.5h6" />
    </Svg>
  ),
  Headset: (p) => (
    <Svg {...p}>
      <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
      <rect x="3.5" y="13" width="4" height="6" rx="1.6" />
      <rect x="16.5" y="13" width="4" height="6" rx="1.6" />
      <path d="M18.5 19c0 1.2-1.5 2-4 2h-1.5" />
    </Svg>
  ),
  Camera: (p) => (
    <Svg {...p}>
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H8l1.5-2h5L16 6h1.5A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-8Z" />
      <circle cx="12" cy="12.5" r="3.5" />
    </Svg>
  ),
  Tag: (p) => (
    <Svg {...p}>
      <path d="M3.5 12.2V5a1.5 1.5 0 0 1 1.5-1.5h7.2l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-7 7a1.5 1.5 0 0 1-2.1 0l-7.9-7.9Z" />
      <circle cx="8" cy="8" r="1.4" />
    </Svg>
  ),
  Check: (p) => (
    <Svg {...p}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  ),
  Undo: (p) => (
    <Svg {...p}>
      <path d="M9 7 4.5 11.5 9 16" />
      <path d="M4.5 11.5H15a4.5 4.5 0 0 1 0 9h-3" />
    </Svg>
  ),
  Flag: (p) => (
    <Svg {...p}>
      <path d="M5.5 21V4" />
      <path d="M5.5 4.5h11l-2 4 2 4h-11" />
    </Svg>
  ),
  Arrow: (p) => (
    <Svg {...p}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Svg>
  ),
  ArrowUp: (p) => (
    <Svg {...p}>
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </Svg>
  ),
  Plus: (p) => (
    <Svg {...p}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  ),
  Sun: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </Svg>
  ),
  Moon: (p) => (
    <Svg {...p}>
      <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" />
    </Svg>
  ),
  Menu: (p) => (
    <Svg {...p}>
      <path d="M4 8h16M4 16h10" />
    </Svg>
  ),
  Close: (p) => (
    <Svg {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Svg>
  ),
  Mail: (p) => (
    <Svg {...p}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </Svg>
  ),
  Instagram: (p) => (
    <Svg {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </Svg>
  ),
  Leaf: (p) => (
    <Svg {...p}>
      <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
      <path d="M5 19c3-4 6-7 10-9" />
    </Svg>
  ),
};

export const AppleLogo = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="icon">
    <path
      fill="currentColor"
      d="M16.86 12.44c.03 2.73 2.38 3.64 2.41 3.65-.02.07-.38 1.3-1.25 2.57-.75 1.09-1.53 2.18-2.75 2.2-1.2.02-1.59-.71-2.96-.71-1.36 0-1.8.69-2.94.73-1.18.04-2.08-1.2-2.83-2.29-1.53-2.21-2.7-6.24-1.13-8.97.78-1.36 2.18-2.22 3.69-2.25 1.16-.02 2.25.78 2.96.78.71 0 2.04-.97 3.45-.82.59.03 2.25.24 3.31 1.79-.09.06-1.98 1.16-1.96 3.32ZM14.59 5.85c.62-.75 1.04-1.79.93-2.85-.89.04-1.96.59-2.6 1.34-.57.66-1.08 1.72-.94 2.74.99.07 2-.49 2.61-1.23Z"
    />
  </svg>
);

export const PlayLogo = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="icon">
    <path fill="currentColor" d="M4 3.8 13.73 13.5 4 20.2V3.8Z" opacity="0.9" />
    <path fill="currentColor" d="m14.89 12.32 2.96-2.95c.99.56 1.72 1.01 2.11 1.25 1.39.84 1.39 1.92 0 2.76-.39.24-1.12.69-2.11 1.25l-2.96-2.31Z" opacity="0.7" />
    <path fill="currentColor" d="M4.82 3c.25-.04.56.04.92.24 1.12.62 6.57 3.7 11.39 6.43L15.7 11.1 4.82 3Z" opacity="0.8" />
    <path fill="currentColor" d="M4.82 21 15.7 12.9l1.43 1.43c-4.82 2.73-10.27 5.81-11.39 6.43-.36.2-.67.28-.92.24Z" opacity="0.6" />
  </svg>
);

/* ---------- Store buttons ---------- */

export function StoreButtons({ t, variant = 'solid', className = '' }) {
  const android = STORE_LINKS.android;
  return (
    <div className={`store-row ${className}`}>
      <a
        className={`store-btn store-btn--${variant}`}
        href={STORE_LINKS.ios}
        target="_blank"
        rel="noopener noreferrer"
      >
        <AppleLogo size={26} />
        <span className="store-btn__text">
          <small>{t.store.iosSub}</small>
          <strong>{t.store.ios}</strong>
        </span>
      </a>
      {android ? (
        <a className={`store-btn store-btn--${variant}`} href={android} target="_blank" rel="noopener noreferrer">
          <PlayLogo size={24} />
          <span className="store-btn__text">
            <small>{t.store.androidGet}</small>
            <strong>{t.store.android}</strong>
          </span>
        </a>
      ) : (
        <span className={`store-btn store-btn--${variant} store-btn--soon`} aria-disabled="true">
          <PlayLogo size={24} />
          <span className="store-btn__text">
            <small>{t.store.androidSub}</small>
            <strong>{t.store.android}</strong>
          </span>
        </span>
      )}
    </div>
  );
}

/* ---------- Phone frame with a real simulator screenshot ---------- */

export function Phone({ src, alt, className = '', children, eager = false }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone__screen">
        {src ? (
          <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable="false" />
        ) : null}
        {children}
        <span className="phone__island" aria-hidden="true" />
      </div>
    </div>
  );
}

/* ---------- Clothes hanger (hooks on a rail, holds a phone like a garment) ---------- */

// Children (e.g. a price tag) are positioned against the hanger box, so they can hang from a shoulder.
export function Hanger({ className = '', children }) {
  return (
    <div className={`hanger ${className}`}>
      <svg viewBox="0 0 220 96" aria-hidden="true">
        <path
          className="hanger__hook"
          d="M110 44V33c0-6 9-8.5 9-17.5C119 8 113 3 106.5 3 100 3 95 7.5 95 13.5"
        />
        <path className="hanger__body" d="M110 44 16 86c-6 2.8-4.5 7 2 7h184c6.5 0 8-4.2 2-7L110 44Z" />
        <circle className="hanger__knot" cx="110" cy="44" r="4" />
      </svg>
      {children}
    </div>
  );
}

/* ---------- Hang tag (price / label tag with a punched hole and string) ---------- */

export function HangTag({ children, className = '', string = 44, tone = 'paper', style, as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`hangtag hangtag--${tone} ${className}`} style={{ '--string': `${string}px`, ...style }} {...rest}>
      <span className="hangtag__string" aria-hidden="true" />
      <span className="hangtag__body">{children}</span>
    </Tag>
  );
}

/* ---------- Motion helpers ---------- */

export const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
};

export const stagger = (gap = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export function Reveal({ children, className = '', as = 'div', delay = 0, amount = 0.3, ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: fadeUp.hidden,
        show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } },
      }}
      {...rest}
    >
      {children}
    </M>
  );
}

export function SectionLabel({ children, tone }) {
  return (
    <span className={`section-label ${tone ? `section-label--${tone}` : ''}`}>
      <span className="section-label__hole" aria-hidden="true" />
      {children}
    </span>
  );
}

// ₼30, ₼8.50 (whole amounts without decimals, the way the app shows prices).
export const money = (value) =>
  `₼${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value)}`;
