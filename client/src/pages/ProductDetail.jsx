import { useParams, Link, Navigate } from "react-router-dom";
import { products, company } from "../data/content.js";
import ProductCard from "../components/ProductCard.jsx";

const styles = String.raw`
.detail-page { --gold: #f6c542; --teal: #2dd4bf; }

.breadcrumb {
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
  font-family: var(--body); font-size: 0.82rem; color: var(--muted-light);
  margin-top: 14px;
}
.breadcrumb a { color: var(--muted-light); transition: color 0.15s; }
.breadcrumb a:hover { color: var(--orange); }
.breadcrumb .sep { opacity: 0.5; }
.breadcrumb .current { color: var(--orange); font-weight: 600; }

.detail-hero-tag {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,106,26,0.15); color: var(--orange);
  font-family: var(--display); font-weight: 700; font-size: 0.76rem;
  letter-spacing: 0.06em; text-transform: uppercase;
  padding: 6px 14px; border-radius: 999px; margin-top: 18px;
}
.detail-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
.detail-hero-actions .btn { padding: 12px 22px; font-size: 0.85rem; }
.detail-hero-actions .btn-wa {
  display: inline-flex; align-items: center; gap: 8px;
  background: #25d366; color: #fff; border: 2px solid #25d366;
  font-family: var(--display); font-weight: 600; font-size: 0.85rem;
  padding: 12px 22px; border-radius: 4px; transition: background 0.15s, transform 0.15s;
}
.detail-hero-actions .btn-wa:hover { background: #1eb955; transform: translateY(-2px); }

.detail { padding: 64px 0 90px; background: #fff; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }

.detail-media { position: relative; }
.detail-photo {
  width: 100%; border-radius: 10px; display: block;
  box-shadow: 18px 18px 0 rgba(246,196,83,0.55), 0 22px 42px rgba(16,25,42,0.14);
}
.detail-media-badge {
  position: absolute; top: 16px; left: 16px;
  background: var(--navy); color: #fff;
  font-family: var(--display); font-weight: 700; font-size: 0.8rem;
  letter-spacing: 0.06em; padding: 7px 14px; border-radius: 6px;
}

.detail-summary { color: var(--muted); font-size: 1.05rem; line-height: 1.7; margin-bottom: 8px; }

.spec-list-title {
  font-family: var(--display); font-weight: 700; font-size: 1.05rem;
  color: var(--ink); margin: 32px 0 16px;
  display: flex; align-items: center; gap: 10px;
}
.spec-list-title::before { content: ""; width: 24px; height: 3px; background: var(--orange); border-radius: 2px; }

.spec-list {
  background: #fff; padding: 4px 24px; border: 1px solid #eef0f4;
  border-radius: 10px; box-shadow: 0 12px 32px rgba(16,25,42,0.06);
}
.spec-list li {
  list-style: none; display: flex; gap: 18px; padding: 18px 0;
  border-bottom: 1px solid #eef0f4; align-items: flex-start;
  transition: transform 0.18s ease, background 0.18s ease;
}
.spec-list li:last-child { border-bottom: none; }
.spec-list li:hover { background: #fff8f3; transform: translateX(7px); }
.spec-list .k {
  flex: 0 0 32px; height: 32px; border-radius: 50%;
  background: var(--navy); color: var(--gold);
  font-family: var(--display); font-weight: 700; font-size: 0.82rem;
  display: flex; align-items: center; justify-content: center; margin-top: 2px;
}
.spec-list .v { color: var(--ink); padding-top: 4px; line-height: 1.55; }

.detail-quote-box {
  margin-top: 36px; padding: 26px; border-radius: 10px;
  background: var(--offwhite); border: 1px solid #eef0f4;
}
.detail-quote-box p { font-size: 0.9rem; color: var(--muted); margin-bottom: 16px; }
.detail-quote-box .row { display: flex; gap: 12px; flex-wrap: wrap; }

.detail-nav {
  display: flex; justify-content: space-between; gap: 20px; margin-top: 56px;
  padding-top: 28px; border-top: 1px solid #eef0f4;
}
.detail-nav a {
  font-family: var(--display); font-weight: 600; font-size: 0.85rem;
  color: var(--muted); display: flex; align-items: center; gap: 8px;
  transition: color 0.15s;
}
.detail-nav a:hover { color: var(--orange); }
.detail-nav .next { margin-left: auto; text-align: right; }

@media (max-width: 900px) {
  .detail-grid { grid-template-columns: 1fr; gap: 36px; }
}
`;

export default function ProductDetail() {
  const { slug } = useParams();
  const index = products.findIndex((p) => p.slug === slug);
  const product = products[index];
  if (!product) return <Navigate to="/products" replace />;

  const prev = products[(index - 1 + products.length) % products.length];
  const next = products[(index + 1) % products.length];
  const related = products.filter((p) => p.slug !== slug).slice(0, 3);

  const waMessage = encodeURIComponent(
    `Hi ${company.name}, I'd like to know more about the ${product.name}.`
  );

  return (
    <div className="detail-page">
      <style>{styles}</style>

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{product.tagline}</span>
          <h1>{product.name}</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/products">Products</Link>
            <span className="sep">/</span>
            <span className="current">{product.name}</span>
          </div>
          <div className="detail-hero-tag">Machine {String(index + 1).padStart(2, "0")} of {String(products.length).padStart(2, "0")}</div>
          <div className="detail-hero-actions">
            <Link to="/contact" className="btn btn-primary">Request A Quote</Link>
            <a href={`tel:${company.phone}`} className="btn btn-ghost">Call {company.phone}</a>
            <a
              href={`https://wa.me/${company.whatsapp}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa"
            >
              💬 WhatsApp Enquiry
            </a>
          </div>
        </div>
      </section>

      <section className="detail">
        <div className="container">
          <div className="detail-grid">
            <div className="detail-media">
              <span className="detail-media-badge">{product.name.toUpperCase()}</span>
              <img src={product.image} alt={product.name} className="detail-photo" loading="lazy" />
            </div>

            <div>
              <p className="detail-summary">{product.summary}</p>

              <div className="spec-list-title">Technical Specifications</div>
              <ul className="spec-list">
                {product.details.map((d, i) => (
                  <li key={i}>
                    <span className="k">{i + 1}</span>
                    <span className="v">{d}</span>
                  </li>
                ))}
              </ul>

              <div className="detail-quote-box">
                <p>Need pricing, lead time, or a custom spec for the {product.name}? Reach out directly and we'll get back to you fast.</p>
                <div className="row">
                  <Link to="/contact" className="btn btn-primary">Get A Free Quote</Link>
                  <Link to="/contact" className="btn btn-dark">Ask A Question</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-nav">
            <Link to={`/products/${prev.slug}`}>← {prev.name}</Link>
            <Link to={`/products/${next.slug}`} className="next">{next.name} →</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" style={{ justifyContent: "center" }}>Explore More</span>
            <h2>Related Machines</h2>
          </div>
          <div className="service-grid">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
