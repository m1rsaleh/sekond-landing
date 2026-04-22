function WhySekond({ t }) {
  return (
    <section className="section why-sekond">
      <div className="container">
        <div className="centered">
          <span className="section-label">{t.why.label}</span>
          <h2 className="section-title">{t.why.title}</h2>
          <p className="section-sub">{t.why.sub}</p>
        </div>
        <div className="features-grid">
          {t.why.items.map((item) => (
            <article className="feature-card" key={item.title}>
              <div className="feature-icon-wrap">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhySekond;
