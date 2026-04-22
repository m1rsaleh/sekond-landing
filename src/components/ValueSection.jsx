function ValueSection({ t }) {
  return (
    <section className="section value-section">
      <div className="container">
        <div className="centered">
          <span className="section-label">{t.value.label}</span>
          <h2 className="section-title">{t.value.title}</h2>
          <p className="section-sub">{t.value.sub}</p>
        </div>

        <div className="value-grid">
          {t.value.cards.map((card) => (
            <article className="value-card" key={card.title}>
              <div className="value-icon" aria-hidden="true">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValueSection;
