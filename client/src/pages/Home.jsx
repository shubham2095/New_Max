import { Link } from "react-router-dom";
import { company, products } from "../data/content.js";
import ProductCard from "../components/ProductCard.jsx";

const styles = String.raw`
.hero.hero { background: linear-gradient(115deg, #0b1322 0%, var(--navy) 52%, #18335a 100%); } .hero::after { content: ""; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 44px 44px; pointer-events: none; } .hero-inner { z-index: 1; } .hero h1 { text-shadow: 0 4px 26px rgba(0,0,0,0.2); } .hero h1 span { color: var(--gold); } .stats-bar.stats-bar { background: linear-gradient(90deg, var(--orange), #ee7d19); } .stats-grid .stat { transition: background 0.2s; } .stats-grid .stat:hover { background: rgba(16,25,42,0.12); } .home-about-photo { box-shadow: 22px 22px 0 rgba(246,196,83,0.65), 0 20px 46px rgba(16,25,42,0.16); } .process-step { padding: 26px 22px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.035); transition: transform 0.2s, background 0.2s; } .process-step:hover { transform: translateY(-6px); background: rgba(255,255,255,0.07); } .process-icon { display: block; font-size: 1.45rem; margin-bottom: 12px; } .process-badge { width: 40px; height: 40px; font-size: 0.82rem; margin-bottom: 16px; background: var(--teal); } .home-cta-banner { background: linear-gradient(118deg, var(--orange), #f28117); box-shadow: 0 18px 36px rgba(226,87,13,0.2); position: relative; overflow: hidden; } .home-cta-banner::after { content: ""; position: absolute; width: 190px; height: 190px; border: 26px solid rgba(255,255,255,0.12); border-radius: 50%; right: -68px; bottom: -100px; } .home-cta-banner > * { position: relative; z-index: 1; }
.hero { position: relative; background: linear-gradient(120deg, var(--navy) 45%, var(--navy-2) 100%); overflow: hidden; } .hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center right; opacity: 0.35; mask-image: linear-gradient(90deg, transparent 0%, black 55%); -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 55%); } .hero-inner { position: relative; padding: 110px 0 90px; color: #fff; } .hero h1 { font-family: var(--display); font-weight: 800; font-size: clamp(2.4rem, 5.4vw, 4rem); line-height: 1.08; max-width: 16ch; margin-top: 20px; } .hero h1 span { color: var(--orange); } .hero p.lead { margin-top: 22px; max-width: 52ch; color: var(--muted-light); font-size: 1.08rem; } .hero-actions { margin-top: 36px; display: flex; gap: 16px; flex-wrap: wrap; } .hero-diagonal { position: relative; margin-top: -1px; } .hero-diagonal svg { display: block; width: 100%; height: 60px; } .stats-bar { background: var(--orange); } .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); } .stats-grid .stat { padding: 34px 20px; text-align: center; border-right: 1px solid rgba(255, 255, 255, 0.25); } .stats-grid .stat:last-child { border-right: none; } .stats-grid .num { font-family: var(--display); font-weight: 800; font-size: 2.1rem; color: #fff; line-height: 1; } .stats-grid .label { margin-top: 8px; font-family: var(--body); font-size: 0.8rem; letter-spacing: 0.04em; text-transform: uppercase; color: rgba(255, 255, 255, 0.9); font-weight: 600; } .home-service-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 26px; } .home-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; } .home-about-photo { width: 100%; border-radius: 10px; display: block; } .home-about-grid p { color: var(--muted); margin-bottom: 16px; } .process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 30px; } .process-step { text-align: left; } .process-badge { width: 58px; height: 58px; border-radius: 50%; background: var(--orange); color: #fff; display: flex; align-items: center; justify-content: center; font-family: var(--display); font-weight: 800; font-size: 1.2rem; margin-bottom: 20px; } .process-step h3 { font-family: var(--display); font-weight: 700; font-size: 1.1rem; margin-bottom: 10px; } .process-step p { color: var(--muted-light); font-size: 0.92rem; } .home-cta-banner { background: var(--orange); border-radius: 10px; padding: 56px 48px; display: flex; align-items: center; justify-content: space-between; gap: 30px; flex-wrap: wrap; color: #fff; } .home-cta-banner h2 { font-family: var(--display); font-weight: 800; font-size: clamp(1.5rem, 3vw, 2.1rem); max-width: 24ch; } .home-cta-banner .btn-dark { border-color: #fff; color: #fff; } .home-cta-banner .btn-dark:hover { background: #fff; color: var(--orange); }
@media (max-width: 960px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .stats-grid .stat:nth-child(2) { border-right: none; } .home-about-grid { grid-template-columns: 1fr; gap: 36px; } } @media (max-width: 860px) { .home-cta-banner { flex-direction: column; align-items: flex-start; } }
`;

const process = [
  { icon: "💬", title: "Initial Consultation", text: "Share your cable-making requirement and we assess the right machine spec for your line." },
  { icon: "⚙️", title: "Custom Engineering", text: "Machines are configured to your screw diameter, speed, and compound requirements." },
  { icon: "✅", title: "Build & Quality Check", text: "Every unit is assembled and tested on the floor before it ships to you." },
  { icon: "🚀", title: "Installation Support", text: "We help you get the machine running and productive at your facility." },
];

export default function Home() {
  return (
    <>
      <style>{styles}</style>
      <style>{String.raw`.hero-inner { z-index: 1; } .hero h1 span { color: var(--gold); } .stats-grid .stat { transition: background 0.2s; } .stats-grid .stat:hover { background: rgba(16,25,42,0.12); } .home-about-photo { box-shadow: 22px 22px 0 rgba(246,196,83,0.65), 0 20px 46px rgba(16,25,42,0.16); } .process-step { padding: 26px 22px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.035); transition: transform 0.2s, background 0.2s; } .process-step:hover { transform: translateY(-6px); background: rgba(255,255,255,0.07); } .process-icon { display: block; font-size: 1.45rem; margin-bottom: 12px; } .process-badge { width: 40px; height: 40px; font-size: 0.82rem; margin-bottom: 16px; background: var(--teal); } .home-cta-banner { box-shadow: 0 18px 36px rgba(226,87,13,0.2); position: relative; overflow: hidden; } .home-cta-banner::after { content: ""; position: absolute; width: 190px; height: 190px; border: 26px solid rgba(255,255,255,0.12); border-radius: 50%; right: -68px; bottom: -100px; } .home-cta-banner > * { position: relative; z-index: 1; }`}</style>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url(/images/HERO.webp)" }} />
        <div className="container hero-inner">
          <span className="eyebrow">Cable Machinery Manufacturers Since 1993</span>
          <h1>
            Engineering the <span>finest extrusion</span> process for cable makers.
          </h1>
          <p className="lead">{company.about.split(". ")[0]}.</p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
            <Link to="/products" className="btn btn-ghost">Explore Our Machines</Link>
          </div>
        </div>
        <div className="hero-diagonal">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none"><polygon points="0,60 1440,0 1440,60" fill="#ff6a1a"/></svg>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container stats-grid">
          <div className="stat"><div className="num">{company.founded}</div><div className="label">Established</div></div>
          <div className="stat"><div className="num">{products.length}+</div><div className="label">Machine Lines</div></div>
          <div className="stat"><div className="num">32–150mm</div><div className="label">Screw Diameter Range</div></div>
          <div className="stat"><div className="num">30+</div><div className="label">Years Experience</div></div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" style={{ justifyContent: "center" }}>Product Range</span>
            <h2>Machines We Manufacture</h2>
            <p style={{ margin: "14px auto 0" }}>
              A complete line for cable and wire production — from extrusion and bunching
              to stranding, coiling and reel handling.
            </p>
          </div>
          <div className="home-service-grid">
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container home-about-grid">
          <img src="/images/about.webp" alt="Newmax Industries Pvt. Ltd. facility" className="home-about-photo" />
          <div>
            <span className="eyebrow">Who We Are</span>
            <h2 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: "2.1rem", marginTop: 12, marginBottom: 18, lineHeight: 1.2 }}>
              Engineering For Cable Makers Since {company.founded}
            </h2>
            <p>{company.about}</p>
            <Link to="/about" className="btn btn-dark" style={{ marginTop: 8 }}>More About Us</Link>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" style={{ justifyContent: "center" }}>How We Work</span>
            <h2>A Leading Manufacturer, Built On Process</h2>
          </div>
          <div className="process-grid">
            {process.map((s, i) => (
              <div className="process-step" key={s.title}>
                <span className="process-icon" aria-hidden="true">{s.icon}</span>
                <div className="process-badge">{String(i + 1).padStart(2, "0")}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="home-cta-banner">
            <h2>Ready to spec your next cable machine?</h2>
            <Link to="/contact" className="btn btn-dark">Request A Free Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
