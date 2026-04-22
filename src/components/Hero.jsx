import homeScreenShot from '../assets/images/sekond-home-real.png';

function Hero({ t }) {
  return (
    <section className="hero section" id="top">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            {t.hero.badge}
          </div>
          <h1>
            {t.hero.title1}<br />
            <span>{t.hero.title2}</span>
          </h1>
          <p>{t.hero.desc}</p>
          <div className="hero-actions">
            <a href="#download" className="btn btn-primary">{t.hero.ctaAppStore}</a>
            <a href="#download" className="btn btn-ghost">{t.hero.ctaGooglePlay}</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">5K+</span>
              <span className="stat-label">{t.hero.statListings}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2K+</span>
              <span className="stat-label">{t.hero.statUsers}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{t.hero.statFreeValue}</span>
              <span className="stat-label">{t.hero.statFree}</span>
            </div>
          </div>
        </div>

        <div className="hero-phone-wrap">
          <img
            src={homeScreenShot}
            alt={t.hero.imageAlt}
            className="hero-app-img"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
