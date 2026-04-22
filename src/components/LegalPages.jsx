function LegalPages({ t, page, onBackHome }) {
  const pageMap = {
    terms: { title: t.legal.termsTitle, body: t.legal.termsBody },
    privacy: { title: t.legal.privacyTitle, body: t.legal.privacyBody },
    support: { title: t.legal.supportTitle, body: t.legal.supportBody },
  };

  const current = pageMap[page] ?? pageMap.terms;

  return (
    <section className="section legal-page">
      <div className="container legal-container">
        <button type="button" className="btn btn-ghost" onClick={onBackHome}>
          {t.legal.backHome}
        </button>
        <article className="legal-card">
          <h1>{current.title}</h1>
          <p>{current.body}</p>
          {page === 'support' ? (
            <p>
              <a href="mailto:support@sekond.az" className="legal-mail">
                support@sekond.az
              </a>
            </p>
          ) : null}
        </article>
      </div>
    </section>
  );
}

export default LegalPages;
