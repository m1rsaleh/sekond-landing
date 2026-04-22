const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="store-svg" aria-hidden="true">
    <path
      fill="currentColor"
      d="M16.86 12.44C16.89 15.17 19.24 16.08 19.27 16.09C19.25 16.16 18.89 17.39 18.02 18.66C17.27 19.75 16.49 20.84 15.27 20.86C14.07 20.88 13.68 20.15 12.31 20.15C10.95 20.15 10.51 20.84 9.37 20.88C8.19 20.92 7.29 19.68 6.54 18.59C5.01 16.38 3.84 12.35 5.41 9.62C6.19 8.26 7.59 7.4 9.1 7.37C10.26 7.35 11.35 8.15 12.06 8.15C12.77 8.15 14.1 7.18 15.51 7.33C16.1 7.36 17.76 7.57 18.82 9.12C18.73 9.18 16.84 10.28 16.86 12.44ZM14.59 5.85C15.21 5.1 15.63 4.06 15.52 3C14.63 3.04 13.56 3.59 12.92 4.34C12.35 5 11.84 6.06 11.98 7.08C12.97 7.15 13.98 6.59 14.59 5.85Z"
    />
  </svg>
);

const GooglePlayIcon = () => (
  <svg viewBox="0 0 24 24" className="store-svg" aria-hidden="true">
    <path fill="currentColor" d="M4 3.8L13.73 13.5L4 20.2V3.8Z" />
    <path fill="currentColor" d="M14.89 12.32L17.85 9.37C18.84 9.93 19.57 10.38 19.96 10.62C21.35 11.46 21.35 12.54 19.96 13.38C19.57 13.62 18.84 14.07 17.85 14.63L14.89 12.32Z" />
    <path fill="currentColor" d="M4.82 3C5.07 2.96 5.38 3.04 5.74 3.24C6.86 3.86 12.31 6.94 17.13 9.67L15.7 11.1L4.82 3Z" />
    <path fill="currentColor" d="M4.82 21L15.7 12.9L17.13 14.33C12.31 17.06 6.86 20.14 5.74 20.76C5.38 20.96 5.07 21.04 4.82 21Z" />
  </svg>
);

function DownloadBanner({ t }) {
  return (
    <section className="section download-banner" id="download">
      <div className="container">
        <div className="download-inner">
          <span className="section-label">{t.download.label}</span>
          <h2>{t.download.title}</h2>
          <p>{t.download.desc}</p>
          <div className="download-actions">
            <a href="#top" className="download-btn">
              <AppleIcon />
              <span className="download-btn-inner">
                <span className="download-btn-sub">{t.download.subLabel}</span>
                {t.nav.appStore}
              </span>
            </a>
            <a href="#top" className="download-btn">
              <GooglePlayIcon />
              <span className="download-btn-inner">
                <span className="download-btn-sub">{t.download.subLabel}</span>
                {t.nav.googlePlay}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadBanner;
