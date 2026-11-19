import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gallery, galleryCategories, company } from "../data/content.js";

const styles = String.raw`
.gallery-page { --gold: #f6c542; }

.breadcrumb {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--body); font-size: 0.82rem; color: var(--muted-light);
  margin-top: 14px;
}
.breadcrumb a { color: var(--muted-light); transition: color 0.15s; }
.breadcrumb a:hover { color: var(--orange); }
.breadcrumb .sep { opacity: 0.5; }
.breadcrumb .current { color: var(--orange); font-weight: 600; }

/* filter pills */
.gallery-filters { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 40px; }
.filter-pill {
  display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
  font-family: var(--display); font-weight: 700; font-size: 0.82rem; letter-spacing: 0.03em;
  padding: 10px 20px; border-radius: 999px; border: 1.5px solid var(--line-soft);
  background: #fff; color: var(--ink);
  transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.15s;
}
.filter-pill:hover { border-color: var(--orange); color: var(--orange); transform: translateY(-1px); }
.filter-pill.active { background: var(--orange); border-color: var(--orange); color: #fff; box-shadow: 0 8px 20px rgba(255,106,26,0.3); }
.filter-pill .count {
  font-size: 0.72rem; min-width: 22px; padding: 2px 7px; border-radius: 999px;
  background: rgba(16,25,42,0.08); text-align: center;
}
.filter-pill.active .count { background: rgba(255,255,255,0.25); }

/* masonry: photos keep their own proportions */
.gallery-grid { column-count: 3; column-gap: 24px; }
.gallery-item {
  display: block; width: 100%; padding: 0; margin: 0 0 24px; border: 0;
  break-inside: avoid; position: relative; overflow: hidden; cursor: zoom-in;
  background: #fff; border-radius: 12px;
  box-shadow: 0 10px 28px rgba(16,25,42,0.1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  animation: gallery-in 0.45s ease both;
}
@keyframes gallery-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
.gallery-item:hover { transform: translateY(-5px); box-shadow: 0 22px 44px rgba(16,25,42,0.2); }
.gallery-item img { display: block; width: 100%; height: auto; transition: transform 0.5s ease; }
.gallery-item:hover img { transform: scale(1.05); }
.gallery-badge {
  position: absolute; top: 12px; left: 12px; z-index: 1;
  background: var(--gold); color: var(--navy);
  font-family: var(--display); font-weight: 700; font-size: 0.68rem;
  letter-spacing: 0.06em; text-transform: uppercase; padding: 5px 10px; border-radius: 4px;
}
.gallery-zoom {
  position: absolute; top: 12px; right: 12px; z-index: 1; width: 36px; height: 36px; border-radius: 50%;
  background: rgba(16,25,42,0.78); color: #fff; display: flex; align-items: center; justify-content: center;
  opacity: 0; transform: scale(0.8); transition: opacity 0.25s, transform 0.25s;
}
.gallery-item:hover .gallery-zoom, .gallery-item:focus-visible .gallery-zoom { opacity: 1; transform: none; }
.gallery-caption {
  position: absolute; left: 0; right: 0; bottom: 0; text-align: left;
  padding: 44px 16px 14px; color: #fff;
  background: linear-gradient(to top, rgba(16,25,42,0.9), transparent);
  opacity: 0; transform: translateY(8px); transition: opacity 0.25s, transform 0.25s;
}
.gallery-caption strong { display: block; font-family: var(--display); font-weight: 700; font-size: 0.98rem; }
.gallery-caption span { display: block; font-size: 0.8rem; color: var(--muted-light); margin-top: 2px; }
.gallery-item:hover .gallery-caption, .gallery-item:focus-visible .gallery-caption { opacity: 1; transform: none; }
.gallery-item:focus-visible { outline: 3px solid var(--orange); outline-offset: 2px; }

/* closing call-to-action */
.gallery-cta {
  background: linear-gradient(118deg, var(--orange), #f28117); color: #fff;
  border-radius: 12px; padding: 48px; display: flex; align-items: center; justify-content: space-between;
  gap: 28px; flex-wrap: wrap; position: relative; overflow: hidden;
  box-shadow: 0 18px 36px rgba(226,87,13,0.2);
}
.gallery-cta::after {
  content: ""; position: absolute; width: 190px; height: 190px; border: 26px solid rgba(255,255,255,0.12);
  border-radius: 50%; right: -68px; bottom: -100px;
}
.gallery-cta > * { position: relative; z-index: 1; }
.gallery-cta h2 { font-family: var(--display); font-weight: 800; font-size: clamp(1.4rem, 3vw, 2rem); max-width: 24ch; line-height: 1.2; }
.gallery-cta p { margin-top: 8px; opacity: 0.92; }
.gallery-cta-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.gallery-cta .btn-dark { border-color: #fff; color: #fff; }
.gallery-cta .btn-dark:hover { background: #fff; color: var(--orange); }

/* lightbox */
.lightbox {
  position: fixed; inset: 0; z-index: 100; background: rgba(8,13,24,0.95);
  display: flex; align-items: center; justify-content: center; padding: 56px 72px;
  animation: lb-in 0.2s ease both;
}
@keyframes lb-in { from { opacity: 0; } to { opacity: 1; } }
.lightbox figure { margin: 0; max-width: 100%; max-height: 100%; display: flex; flex-direction: column; align-items: center; gap: 14px; }
.lightbox img { max-width: 100%; max-height: calc(100vh - 190px); object-fit: contain; border-radius: 6px; display: block; background: #fff; }
.lightbox figcaption { color: #fff; font-family: var(--display); font-weight: 600; text-align: center; }
.lightbox figcaption small { display: block; color: var(--muted-light); font-weight: 400; margin-top: 4px; }
.lightbox-link {
  display: inline-block; margin-top: 10px; font-size: 0.8rem; font-weight: 700; color: #fff;
  background: var(--orange); padding: 8px 18px; border-radius: 999px; transition: background 0.15s;
}
.lightbox-link:hover { background: var(--orange-dark); }
.lightbox-btn {
  position: absolute; width: 46px; height: 46px; border-radius: 50%; border: 0;
  background: rgba(255,255,255,0.12); color: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: background 0.15s;
}
.lightbox-btn:hover { background: var(--orange); }
.lightbox-close { top: 16px; right: 16px; }
.lightbox-prev { left: 14px; top: 50%; transform: translateY(-50%); }
.lightbox-next { right: 14px; top: 50%; transform: translateY(-50%); }

@media (max-width: 960px) { .gallery-grid { column-count: 2; } }
@media (max-width: 560px) {
  .gallery-grid { column-count: 1; }
  .gallery-caption, .gallery-zoom { opacity: 1; transform: none; }
  .gallery-cta { padding: 32px 24px; }
  .lightbox { padding: 64px 12px 24px; }
  .lightbox-prev, .lightbox-next { top: auto; bottom: 14px; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .gallery-item, .lightbox { animation: none; }
}
`;

const icon = (d) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const CloseIcon = () => icon(<path d="M18 6L6 18M6 6l12 12" />);
const PrevIcon = () => icon(<path d="M15 18l-6-6 6-6" />);
const NextIcon = () => icon(<path d="M9 18l6-6-6-6" />);
const ZoomIcon = () => icon(<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M11 8v6M8 11h6" /></>);

export default function Gallery() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null); // index into `visible`, or null
  const touchX = useRef(null);

  const visible = useMemo(
    () => (category === "All" ? gallery : gallery.filter((g) => g.category === category)),
    [category]
  );
  const counts = useMemo(
    () => Object.fromEntries(galleryCategories.map((c) => [c, c === "All" ? gallery.length : gallery.filter((g) => g.category === c).length])),
    []
  );
  const total = visible.length;

  const close = useCallback(() => setActive(null), []);
  const step = useCallback((d) => setActive((i) => (i === null ? i : (i + d + total) % total)), [total]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, step]);

  const current = active === null ? null : visible[active];

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  return (
    <div className="gallery-page">
      <style>{styles}</style>

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Our Work</span>
          <h1>Gallery</h1>
          <p>A closer look at the extrusion, stranding and bunching machines we build.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Gallery</span>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="gallery-filters" role="tablist" aria-label="Filter photos">
            {galleryCategories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                className={`filter-pill ${category === c ? "active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c} <span className="count">{counts[c]}</span>
              </button>
            ))}
          </div>

          {/* key={category} replays the fade-in whenever the filter changes */}
          <div className="gallery-grid" key={category}>
            {visible.map((g, i) => (
              <button
                type="button"
                className="gallery-item"
                key={g.image}
                style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
                onClick={() => setActive(i)}
                aria-label={`View ${g.title}`}
              >
                <span className="gallery-badge">{g.category}</span>
                <span className="gallery-zoom"><ZoomIcon /></span>
                <img src={g.image} alt={g.title} loading="lazy" />
                <span className="gallery-caption">
                  <strong>{g.title}</strong>
                  {g.tagline && <span>{g.tagline}</span>}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-cta">
            <div>
              <h2>Need a machine for your cable line?</h2>
              <p>Tell us your requirement and we'll send pricing and specifications.</p>
            </div>
            <div className="gallery-cta-actions">
              <Link to="/quote" className="btn btn-dark">Get A Free Quote</Link>
              <a className="btn btn-dark" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {current && (
        <div
          className="lightbox" role="dialog" aria-modal="true" aria-label={current.title}
          onClick={close} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        >
          <button type="button" className="lightbox-btn lightbox-close" onClick={close} aria-label="Close">
            <CloseIcon />
          </button>
          {total > 1 && (
            <button
              type="button" className="lightbox-btn lightbox-prev" aria-label="Previous photo"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
            >
              <PrevIcon />
            </button>
          )}
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={current.image} alt={current.title} />
            <figcaption>
              {current.title}
              <small>{active + 1} / {total}</small>
              {current.slug && (
                <Link className="lightbox-link" to={`/products/${current.slug}`}>View Machine Details</Link>
              )}
            </figcaption>
          </figure>
          {total > 1 && (
            <button
              type="button" className="lightbox-btn lightbox-next" aria-label="Next photo"
              onClick={(e) => { e.stopPropagation(); step(1); }}
            >
              <NextIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
