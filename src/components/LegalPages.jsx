import { useEffect, useState } from 'react';
import { getLegalDocument } from '../services/legal.service';
import ContactForm from './ContactForm';

function LegalPages({ t, page, onBackHome, language = 'az' }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(page !== 'support');

  const pageMap = {
    terms: { title: t.legal.termsTitle, defaultBody: t.legal.termsBody },
    privacy: { title: t.legal.privacyTitle, defaultBody: t.legal.privacyBody },
    support: { title: t.legal.supportTitle, defaultBody: t.legal.supportBody },
  };

  const current = pageMap[page] ?? pageMap.terms;

  // Fetch legal documents from backend on page/language change
  useEffect(() => {
    if (page === 'support') {
      setContent(null); // Support page doesn't fetch from backend
      setLoading(false);
      return;
    }

    setLoading(true);
    getLegalDocument(page, language)
      .then((body) => {
        setContent(body);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`[Legal] Error fetching ${page}:`, err);
        setContent(current.defaultBody);
        setLoading(false);
      });
  }, [page, language, current.defaultBody]);

  const displayBody = content || current.defaultBody;

  return (
    <section className="section legal-page">
      <div className="container legal-container">
        <article className="legal-card">
          <h1>{current.title}</h1>
          {loading ? (
            <p style={{ opacity: 0.6, fontStyle: 'italic' }}>Yüklənir...</p>
          ) : (
            <p>{displayBody}</p>
          )}
          {page === 'support' ? (
            <div className="support-content">
              <div className="contact-form-wrapper">
                <h2>{language === 'az' ? 'Bizimlə Əlaqə Saxlayın' : language === 'en' ? 'Contact Us' : 'Свяжитесь с нами'}</h2>
                <p className="support-email-hint">
                  {language === 'az' ? 'Və ya birbaşa yazın: ' : language === 'en' ? 'Or email us directly: ' : 'Или напишите напрямую: '}
                  <a href="mailto:support@sekond.az" className="legal-mail">support@sekond.az</a>
                </p>
                <ContactForm t={t} language={language} />
              </div>
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}

export default LegalPages;
