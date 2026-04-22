import { useEffect, useState } from 'react';
import { languages } from '../i18n';

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
          <a href="#download" className="store-pill">{t.nav.appStore}</a>
          <a href="#download" className="store-pill">{t.nav.googlePlay}</a>
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
          <a href="#download" className="store-pill" onClick={closeMenu}>{t.nav.appStore}</a>
          <a href="#download" className="store-pill" onClick={closeMenu}>{t.nav.googlePlay}</a>
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