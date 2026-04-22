function HowItWorks({ t }) {
  return (
    <section className="section how-it-works">
      <div className="container">
        <div className="centered">
          <span className="section-label">{t.how.label}</span>
          <h2 className="section-title">{t.how.title}</h2>
          <p className="section-sub">{t.how.sub}</p>
        </div>
        <div className="steps-grid">
          {t.how.steps.map((step) => (
            <article className="step-card" key={step.id}>
              <div className="step-num">{step.id}</div>
              <div className="step-icon-wrap">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
