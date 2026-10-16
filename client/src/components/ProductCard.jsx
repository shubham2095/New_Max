import { Link } from "react-router-dom";

const styles = String.raw`
.service-card {
  --gold: #f6c542;
  background: #fff;
  border: 1px solid #e7e9ee;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
  opacity: 0;
  animation: service-card-in 0.5s ease forwards;
}
@keyframes service-card-in {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
.service-card::before {
  content: "";
  position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, var(--orange), var(--gold));
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.3s ease;
  z-index: 3;
}
.service-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255,106,26,0.35);
  box-shadow: 0 24px 48px rgba(16,25,42,0.16);
}
.service-card:hover::before { transform: scaleX(1); }
.service-card:focus-within {
  box-shadow: 0 0 0 3px rgba(255,106,26,0.35);
}

.service-media {
  aspect-ratio: 4 / 3;
  background: var(--offwhite);
  overflow: hidden;
  position: relative;
}
.service-media img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.5s ease;
}
.service-card:hover .service-media img { transform: scale(1.08); }
.service-media::after {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(16,25,42,0.28));
  opacity: 0;
  transition: opacity 0.3s ease;
}
.service-card:hover .service-media::after { opacity: 1; }

.service-num {
  position: absolute; top: 14px; left: 14px; z-index: 2;
  background: var(--navy); color: #fff;
  font-family: var(--display); font-weight: 700; font-size: 0.74rem;
  letter-spacing: 0.08em;
  padding: 5px 11px; border-radius: 4px;
}

.service-quick {
  position: absolute; right: 14px; bottom: 14px; z-index: 2;
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--orange); color: #fff;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transform: translateY(10px) scale(0.9);
  transition: opacity 0.25s ease, transform 0.25s ease, background 0.15s ease;
}
.service-card:hover .service-quick { opacity: 1; transform: translateY(0) scale(1); }
.service-quick:hover { background: var(--orange-dark); }

.service-body { padding: 26px 24px 24px; flex: 1; display: flex; flex-direction: column; }
.service-body h3 {
  font-family: var(--display); font-weight: 700; font-size: 1.18rem; color: var(--ink);
  margin-bottom: 8px; line-height: 1.3;
}
.service-body .tag {
  font-family: var(--body); font-size: 0.76rem; font-weight: 700;
  letter-spacing: 0.09em; text-transform: uppercase; color: var(--orange);
  margin-bottom: 12px;
}
.service-body p {
  color: var(--muted); font-size: 0.92rem; flex: 1; line-height: 1.6;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.service-link {
  margin-top: 20px; padding-top: 16px; border-top: 1px solid #eef0f4;
  font-family: var(--display); font-weight: 700; font-size: 0.78rem;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--navy); display: inline-flex; align-items: center; gap: 8px;
  transition: color 0.15s ease;
}
.service-card:hover .service-link { color: var(--orange); }
.service-link .arrow { display: inline-flex; transition: transform 0.2s ease; }
.service-card:hover .service-link .arrow { transform: translateX(4px); }
.service-link:focus-visible { outline: 2px solid var(--orange); outline-offset: 3px; border-radius: 3px; }
`;

const ArrowIcon = () => (
  <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>
);

export default function ProductCard({ product, index }) {
  return (
    <>
      <style>{styles}</style>
      <article className="service-card" style={{ animationDelay: `${index * 70}ms` }}>
        <div className="service-media">
          <span className="service-num">{String(index + 1).padStart(2, "0")}</span>
          <img src={product.image} alt={product.name} loading="lazy" />
          <Link
            to={`/products/${product.slug}`}
            className="service-quick"
            aria-label={`View ${product.name} details`}
            tabIndex={-1}
          >
            <ArrowUpRightIcon />
          </Link>
        </div>
        <div className="service-body">
          <h3>{product.name}</h3>
          <div className="tag">{product.tagline}</div>
          <p>{product.summary}</p>
          <Link className="service-link" to={`/products/${product.slug}`}>
            View specs
            <ArrowIcon />
          </Link>
        </div>
      </article>
    </>
  );
}