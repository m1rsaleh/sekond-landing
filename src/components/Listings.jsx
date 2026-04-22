function Listings({ t }) {
  return (
    <section className="section listings">
      <div className="container">
        <h2 className="section-title centered">{t.listings.title}</h2>

        <div className="listings-grid">
          {t.listings.products.map((item) => (
            <article className="listing-card" key={item.title}>
              <div className="listing-image-wrap">
                <img src={item.image} alt={item.title} className="listing-image" loading="lazy" />
                <span className="active-badge">{t.listings.badge}</span>
              </div>
              <div className="listing-content">
                <p className="listing-brand">{item.brand}</p>
                <h3>{item.title}</h3>
                <div className="price-row">
                  <span className="price">{item.price}</span>
                  <span className="old-price">{item.original}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="centered-cta">
          <a href="#download" className="btn btn-primary">{t.listings.cta}</a>
        </div>
      </div>
    </section>
  );
}

export default Listings;
