const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="social-svg" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="social-svg" aria-hidden="true">
    <path d="M14.5 4C15 6.1 16.6 7.8 18.8 8.3V11C17.3 11 15.8 10.5 14.5 9.6V15.8C14.5 18.8 12 21 9 21C6 21 3.5 18.8 3.5 15.8C3.5 12.8 6 10.6 9 10.6C9.4 10.6 9.8 10.6 10.2 10.7V13.5C9.9 13.4 9.5 13.3 9.2 13.3C7.8 13.3 6.7 14.4 6.7 15.8C6.7 17.2 7.8 18.3 9.2 18.3C10.6 18.3 11.7 17.2 11.7 15.8V4H14.5Z" fill="currentColor" />
  </svg>
);

function Footer({ t, onNavigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="footer-logo">SEKOND</p>
            <p className="footer-sub">{t.footer.sub}</p>
          </div>

          <a className="footer-email" href="mailto:support@sekond.az">
            support@sekond.az
          </a>

          <div className="footer-socials" aria-label={t.footer.socialAria}>
            <a href="#top" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#top" aria-label="TikTok"><TikTokIcon /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t.footer.rights}</p>
          <nav className="footer-links" aria-label={t.footer.linksAria}>
            <a href="/terms" className="link-button" onClick={(e) => {
              e.preventDefault();
              onNavigate('terms');
            }}>
              {t.footer.terms}
            </a>
            <a href="/privacy" className="link-button" onClick={(e) => {
              e.preventDefault();
              onNavigate('privacy');
            }}>
              {t.footer.privacy}
            </a>
            <a href="/support" className="link-button" onClick={(e) => {
              e.preventDefault();
              onNavigate('support');
            }}>
              {t.footer.support}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
