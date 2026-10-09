import { useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import HowItWorks from './components/HowItWorks';
import Avans from './components/Avans';
import Sell from './components/Sell';
import Categories from './components/Categories';
import Planet from './components/Planet';
import FAQ from './components/FAQ';
import Download from './components/Download';
import Footer from './components/Footer';
import LegalPages from './components/LegalPages';
import PaymentStatus from './components/PaymentStatus';
import { translations } from './i18n';

const PATH = window.location.pathname.toLowerCase();

// Extract page from URL path
const getPageFromPath = () => {
  const path = window.location.pathname.toLowerCase().split('/').filter(Boolean)[0];
  if (['terms', 'privacy', 'support', 'account-deletion', 'delete-account'].includes(path)) {
    if (path === 'delete-account') {
      return 'account-deletion';
    }
    return path;
  }
  return 'home';
};

const readPref = (key, allowed, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
};

const writePref = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode: preference just isn't remembered */
  }
};

function App() {
  const [theme, setTheme] = useState(() => readPref('sekond-theme', ['light', 'dark'], 'light'));
  const [language, setLanguage] = useState(() => readPref('sekond-lang', ['az', 'en', 'ru'], 'az'));
  const [page, setPage] = useState(() => getPageFromPath());

  const t = useMemo(() => translations[language] ?? translations.az, [language]);

  // Update browser history when page changes
  const navigateTo = (newPage) => {
    setPage(newPage);
    if (newPage === 'home') {
      window.history.pushState(null, '', '/');
    } else if (newPage === 'account-deletion') {
      window.history.pushState(null, '', '/delete-account');
    } else {
      window.history.pushState(null, '', `/${newPage}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    writePref('sekond-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.title;
    writePref('sekond-lang', language);
  }, [language, t]);

  // Links like /#avans from legal pages: scroll once the home sections exist.
  useEffect(() => {
    if (page !== 'home' || !window.location.hash) return;
    const el = document.querySelector(window.location.hash);
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }, [page]);

  // Payment redirect pages — no navbar/footer needed
  if (PATH === '/payment-success' || PATH === '/payment-success/') {
    return <PaymentStatus type="success" />;
  }
  if (PATH === '/payment-error' || PATH === '/payment-error/') {
    return <PaymentStatus type="error" />;
  }
  if (PATH === '/payment-result' || PATH === '/payment-result/') {
    // Check URL params for status from Epoint
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    return <PaymentStatus type={status === 'success' ? 'success' : 'error'} />;
  }

  const goHome = () => {
    navigateTo('home');
  };

  const isHome = page === 'home';

  return (
    <MotionConfig reducedMotion="user">
      <Navbar
        t={t}
        theme={theme}
        onThemeToggle={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        language={language}
        onLanguageChange={setLanguage}
        onNavigateHome={goHome}
        isHome={isHome}
      />
      <main>
        {isHome ? (
          <>
            <Hero t={t} />
            <Marquee t={t} />
            <HowItWorks t={t} />
            <Avans t={t} />
            <Sell t={t} />
            <Categories t={t} />
            <Planet t={t} />
            <FAQ t={t} onNavigate={navigateTo} />
            <Download t={t} />
          </>
        ) : (
          <LegalPages t={t} page={page} onBackHome={goHome} language={language} />
        )}
      </main>
      <Footer t={t} onNavigate={navigateTo} isHome={isHome} />
    </MotionConfig>
  );
}

export default App;
