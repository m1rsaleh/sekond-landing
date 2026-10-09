import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { languages } from '../i18n';
import { STORE_LINKS } from '../config';
import logoMark from '../assets/logo-mark.webp';
import { Icon, StoreButtons, ease } from './ui';

const SECTIONS = ['how', 'avans', 'sell', 'faq'];

function LangSwitch({ language, onLanguageChange, label }) {
  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          className={item.code === language ? 'is-active' : ''}
          aria-pressed={item.code === language}
          onClick={() => onLanguageChange(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function ThemeButton({ theme, onToggle, t }) {
  const label = theme === 'light' ? t.nav.themeDark : t.nav.themeLight;
  return (
    <button type="button" className="icon-btn" onClick={onToggle} aria-label={label} title={label}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.3, ease }}
          style={{ display: 'grid' }}
        >
          {theme === 'light' ? <Icon.Moon size={20} /> : <Icon.Sun size={20} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function Navbar({ t, theme, onThemeToggle, language, onLanguageChange, onNavigateHome, isHome }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // On legal pages the section anchors live on the home page.
  const hrefFor = (id) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className={`nav ${scrolled || !isHome ? 'nav--solid' : ''}`}>
      <div className="container nav__inner">
        <button type="button" className="logo" aria-label={t.nav.ariaHome} onClick={onNavigateHome}>
          <img className="logo__mark" src={logoMark} alt="" width="34" height="34" />
          SEKOND
        </button>

        <nav className="nav__links" aria-label={t.nav.ariaMain}>
          {SECTIONS.map((id) => (
            <a key={id} href={hrefFor(id)}>
              {t.nav.links[id]}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <LangSwitch language={language} onLanguageChange={onLanguageChange} label={t.nav.languageLabel} />
          <ThemeButton theme={theme} onToggle={onThemeToggle} t={t} />
          <a className="btn btn--primary btn--sm nav__cta" href={STORE_LINKS.ios} target="_blank" rel="noopener noreferrer">
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="icon-btn nav__burger"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Icon.Close size={22} /> : <Icon.Menu size={22} />}
          </button>
        </div>
      </div>

      {isHome && <motion.div className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />}

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.55, ease }}
          >
            <motion.nav
              className="mobile-menu__links"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
            >
              {SECTIONS.map((id, i) => (
                <motion.a
                  key={id}
                  href={hrefFor(id)}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                  }}
                >
                  <span className="mobile-menu__num">0{i + 1}</span>
                  {t.nav.links[id]}
                </motion.a>
              ))}
            </motion.nav>
            <motion.div
              className="mobile-menu__foot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5, ease } }}
            >
              <div className="mobile-menu__row">
                <LangSwitch language={language} onLanguageChange={onLanguageChange} label={t.nav.languageLabel} />
                <ThemeButton theme={theme} onToggle={onThemeToggle} t={t} />
              </div>
              <StoreButtons t={t} variant="light" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
