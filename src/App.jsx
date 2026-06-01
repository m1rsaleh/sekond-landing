import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import WhySekond from './components/WhySekond';
import ValueSection from './components/ValueSection';
import DownloadBanner from './components/DownloadBanner';
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

function App() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('az');
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
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

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

  return (
    <>
      <Navbar
        t={t}
        theme={theme}
        onThemeToggle={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
        language={language}
        onLanguageChange={setLanguage}
        onNavigateHome={goHome}
      />
      <main>
        {page === 'home' ? (
          <>
            <Hero t={t} />
            <HowItWorks t={t} />
            <WhySekond t={t} />
            <ValueSection t={t} />
            <DownloadBanner t={t} />
          </>
        ) : (
          <LegalPages t={t} page={page} onBackHome={goHome} language={language} />
        )}
      </main>
      <Footer t={t} onNavigate={navigateTo} />
    </>
  );
}

export default App;
