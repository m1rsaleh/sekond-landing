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

function App() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('az');
  const [page, setPage] = useState('home');

  const t = useMemo(() => translations[language] ?? translations.az, [language]);

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

  const goHome = () => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLegalPage = (targetPage) => {
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <LegalPages t={t} page={page} onBackHome={goHome} />
        )}
      </main>
      <Footer t={t} onNavigate={openLegalPage} />
    </>
  );
}

export default App;
