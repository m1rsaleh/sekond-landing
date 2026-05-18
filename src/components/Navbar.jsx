import { useEffect, useState } from 'react';
import { languages } from '../i18n';

const AppleStoreIcon = () => (
  <svg viewBox="0 0 24 24" className="store-icon-sm" aria-hidden="true">
    <path
      fill="currentColor"
      d="M16.86 12.44C16.89 15.17 19.24 16.08 19.27 16.09C19.25 16.16 18.89 17.39 18.02 18.66C17.27 19.75 16.49 20.84 15.27 20.86C14.07 20.88 13.68 20.15 12.31 20.15C10.95 20.15 10.51 20.84 9.37 20.88C8.19 20.92 7.29 19.68 6.54 18.59C5.01 16.38 3.84 12.35 5.41 9.62C6.19 8.26 7.59 7.4 9.1 7.37C10.26 7.35 11.35 8.15 12.06 8.15C12.77 8.15 14.1 7.18 15.51 7.33C16.1 7.36 17.76 7.57 18.82 9.12C18.73 9.18 16.84 10.28 16.86 12.44ZM14.59 5.85C15.21 5.1 15.63 4.06 15.52 3C14.63 3.04 13.56 3.59 12.92 4.34C12.35 5 11.84 6.06 11.98 7.08C12.97 7.15 13.98 6.59 14.59 5.85Z"
    />
  </svg>
);

const GooglePlayIconColored = () => (
  <svg viewBox="0 0 24 24" className="store-icon-sm" aria-hidden="true">
    {/* Green part */}
    <path fill="#34A853" d="M4 3.8L13.73 13.5L4 20.2V3.8Z" />
    {/* Blue part */}
    <path fill="#1F71B8" d="M14.89 12.32L17.85 9.37C18.84 9.93 19.57 10.38 19.96 10.62C21.35 11.46 21.35 12.54 19.96 13.38C19.57 13.62 18.84 14.07 17.85 14.63L14.89 12.32Z" />
    {/* Yellow part */}
    <path fill="#FBBC04" d="M4.82 3C5.07 2.96 5.38 3.04 5.74 3.24C6.86 3.86 12.31 6.94 17.13 9.67L15.7 11.1L4.82 3Z" />
    {/* Red part */}
    <path fill="#EA4335" d="M4.82 21L15.7 12.9L17.13 14.33C12.31 17.06 6.86 20.14 5.74 20.76C5.38 20.96 5.07 21.04 4.82 21Z" />
  </svg>
);

function ThemeIcon({ theme }) {
  if (theme === 'light') {
    return (
      <svg viewBox="0 0 24 24" className="theme-icon" aria-hidden="true">
        <path
          fill="currentColor"
          d="M21.64 13a1 1 0 0 0-1.05-.14A8.05 8.05 0 0 1 17 13.7A8.21 8.21 0 0 1 9.08 3.2A1 1 0 0 0 7.84 2A10.2 10.2 0 1 0 22 14.16A1 1 0 0 0 21.64 13Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="theme-icon" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <path
        d="M12 2.5V5.5M12 18.5V21.5M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M2.5 12H5.5M18.5 12H21.5M4.93 19.07L7.05 16.95M16.95 7.05L19.07 4.93"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Navbar({ t, theme, onThemeToggle, language, onLanguageChange, onNavigateHome }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button type="button" className="logo logo-btn" aria-label={t.nav.ariaHome} onClick={onNavigateHome}>
          SEKOND
        </button>

        <div className="nav-desktop-actions" aria-label={t.nav.ariaDownloads}>
          <a href="#download" className="store-button" title={t.nav.appStore} aria-label={t.nav.appStore}>
            <AppleStoreIcon />
            <span className="store-button-text">{t.nav.appStore}</span>
          </a>
          <a href="#download" className="store-button" title={t.nav.googlePlay} aria-label={t.nav.googlePlay}>
            <GooglePlayIconColored />
            <span className="store-button-text">{t.nav.googlePlay}</span>
          </a>
          <button
            type="button"
            className="theme-toggle icon-toggle"
            onClick={onThemeToggle}
            aria-label={theme === 'light' ? t.nav.themeDark : t.nav.themeLight}
            title={theme === 'light' ? t.nav.themeDark : t.nav.themeLight}
          >
            <ThemeIcon theme={theme} />
          </button>
          <label className="language-wrap" htmlFor="lang-select-desktop">
            <span>{t.nav.languageLabel}</span>
            <select
              id="lang-select-desktop"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
            >
              {languages.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          className={`hamburger ${open ? 'is-open' : ''}`}
          aria-label={t.nav.menuOpen}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu-overlay ${open ? 'show' : ''}`} onClick={closeMenu} />

      <aside className={`mobile-menu-panel ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu-head">
          <p>SEKOND</p>
          <button type="button" className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
            ×
          </button>
        </div>

        <div className="mobile-menu-body">
          <a href="#download" className="mobile-store-link" onClick={closeMenu}>
            <AppleStoreIcon />
            <span>{t.nav.appStore}</span>
          </a>
          <a href="#download" className="mobile-store-link" onClick={closeMenu}>
            <GooglePlayIconColored />
            <span>{t.nav.googlePlay}</span>
          </a>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => {
              onThemeToggle();
              closeMenu();
            }}
          >
            <ThemeIcon theme={theme} />
            {theme === 'light' ? t.nav.themeDark : t.nav.themeLight}
          </button>
          <label className="language-wrap" htmlFor="lang-select-mobile">
            <span>{t.nav.languageLabel}</span>
            <select
              id="lang-select-mobile"
              value={language}
              onChange={(e) => {
                onLanguageChange(e.target.value);
                closeMenu();
              }}
            >
              {languages.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </aside>
    </header>
  );
}

export default Navbar;