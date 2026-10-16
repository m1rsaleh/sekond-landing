import { motion } from 'framer-motion';
import { INSTAGRAM_URL, STORE_LINKS, SUPPORT_EMAIL } from '../config';
import { Icon, ease } from './ui';

function Footer({ t, onNavigate, isHome }) {
  const legalLinks = [
    { page: 'terms', href: '/terms', label: t.footer.terms },
    { page: 'privacy', href: '/privacy', label: t.footer.privacy },
    { page: 'support', href: '/support', label: t.footer.support },
    { page: 'account-deletion', href: '/delete-account', label: t.footer.accountDeletion },
  ];
  const sectionHref = (id) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__tagline">{t.footer.tagline}</p>
            <p className="footer__sub">{t.footer.sub}</p>
          </div>

          <nav className="footer__col" aria-label={t.footer.colProduct}>
            <h2>{t.footer.colProduct}</h2>
            <a href={sectionHref('how')}>{t.nav.links.how}</a>
            <a href={sectionHref('avans')}>{t.nav.links.avans}</a>
            <a href={sectionHref('sell')}>{t.nav.links.sell}</a>
            <a href={STORE_LINKS.ios} target="_blank" rel="noopener noreferrer">
              {t.store.ios}
            </a>
          </nav>

          <nav className="footer__col" aria-label={t.footer.linksAria}>
            <h2>{t.footer.colLegal}</h2>
            {legalLinks.map((link) => (
              <a
                key={link.page}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.page);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer__col">
            <h2>{t.footer.colContact}</h2>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="footer__icon-link">
              <Icon.Mail size={18} />
              {SUPPORT_EMAIL}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer__icon-link">
              <Icon.Instagram size={18} />
              @sekond_az
            </a>
          </div>
        </div>

        <motion.p
          className="footer__wordmark"
          aria-hidden="true"
          initial={{ backgroundPositionX: '100%' }}
          whileInView={{ backgroundPositionX: '0%' }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease }}
        >
          SEKOND
        </motion.p>

        <div className="footer__bottom">
          <p>{t.footer.rights}</p>
          <button type="button" className="footer__top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {t.footer.backTop}
            <Icon.ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
