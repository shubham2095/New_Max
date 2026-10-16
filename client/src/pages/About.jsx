import { Link } from "react-router-dom";
import { company, products } from "../data/content.js";

const styles = String.raw`
.about-page { --gold: #f6c542; --teal: #2dd4bf; }

.breadcrumb {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--body); font-size: 0.82rem; color: var(--muted-light);
  margin-top: 14px;
}
.breadcrumb a { color: var(--muted-light); transition: color 0.15s; }
.breadcrumb a:hover { color: var(--orange); }
.breadcrumb .sep { opacity: 0.5; }
.breadcrumb .current { color: var(--orange); font-weight: 600; }

.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.about-media { position: relative; }
.about-photo {
  width: 100%; border-radius: 12px; display: block;
  box-shadow: 20px 20px 0 rgba(15,140,140,0.16), 0 20px 42px rgba(16,25,42,0.13);
}
.about-badge {
  position: absolute; bottom: -22px; left: -22px;
  background: var(--orange); color: #fff;
  width: 116px; height: 116px; border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; box-shadow: 0 14px 32px rgba(255,106,26,0.35);
  border: 4px solid #fff;
}
.about-badge .n { font-family: var(--display); font-weight: 800; font-size: 1.6rem; line-height: 1; }
.about-badge .l { font-family: var(--body); font-size: 0.62rem; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 4px; }

.about-copy { border-left: 3px solid var(--orange); padding-left: 30px; }
.about-copy p { color: var(--muted); margin-bottom: 16px; line-height: 1.75; }

.story-list { list-style: none; margin-top: 24px; display: flex; flex-direction: column; gap: 14px; }
.story-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 0.94rem; color: var(--ink); font-weight: 500; }
.story-list .check {
  flex: 0 0 22px; height: 22px; border-radius: 50%;
  background: rgba(255,106,26,0.12); color: var(--orange);
  display: flex; align-items: center; justify-content: center; margin-top: 1px;
}

.value-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.value-card {
  background: #fff; border: 1px solid #e7e9ee; border-radius: 10px;
  padding: 30px 24px; text-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.value-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(16,25,42,0.1);
  border-color: rgba(255,106,26,0.3);
}
.value-icon {
  width: 56px; height: 56px; border-radius: 50%;
  background: rgba(255,106,26,0.1); color: var(--orange);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 18px;
}
.value-card h3 { font-family: var(--display); font-weight: 700; font-size: 1.02rem; color: var(--ink); margin-bottom: 8px; }
.value-card p { font-size: 0.86rem; color: var(--muted); line-height: 1.55; }

.fact-plate { border-radius: 12px; overflow: hidden; box-shadow: 0 16px 36px rgba(16,25,42,0.08); }
.fact-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.fact-cell {
  background: #fff; padding: 30px 20px; text-align: center;
  border-right: 1px solid #eef0f4; transition: background 0.18s ease;
}
.fact-cell:last-child { border-right: none; }
.fact-cell:hover { background: #fff8f3; }
.fact-icon {
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(15,140,140,0.1); color: var(--teal);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px;
}
.fact-cell .v { font-family: var(--display); font-weight: 800; font-size: 1.4rem; color: var(--ink); display: block; }
.fact-cell .k { font-family: var(--body); font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin-top: 6px; display: block; }

@media (max-width: 960px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .about-copy { padding-left: 20px; }
  .value-grid { grid-template-columns: 1fr 1fr; }
  .fact-grid { grid-template-columns: 1fr 1fr; }
  .fact-cell { border-bottom: 1px solid #eef0f4; }
}
@media (max-width: 560px) {
  .value-grid { grid-template-columns: 1fr; }
}
`;

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);
const GearIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);
const MapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 20l-6 3V7l6-3 6 3 6-3v16l-6 3-6-3z"/>
    <path d="M9 4v16M15 7v16"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);
const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const LayersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2l9 5-9 5-9-5 9-5z"/>
    <path d="M3 12l9 5 9-5M3 17l9 5 9-5"/>
  </svg>
);
const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>
  </svg>
);

const strengths = [
  "Machines engineered to your exact specification",
  "Decades of hands-on manufacturing experience",
  "Serving clients across many market segments",
  "Reliable, long-lasting industrial-grade builds",
];

const values = [
  { icon: <GearIcon />, title: "Custom Engineering", text: "Every machine is configured to the client's exact process and output requirement." },
  { icon: <ShieldIcon />, title: "Quality You Can Trust", text: "Decades of manufacturing discipline behind every unit that leaves our facility." },
  { icon: <MapIcon />, title: "Pan-Market Reach", text: "Trusted by clients across a wide range of cable and wire manufacturing segments." },
  { icon: <ClockIcon />, title: "Decades Of Experience", text: `Manufacturing cable machinery since ${company.founded}, refined over the years.` },
];

export default function About() {
  return (
    <div className="about-page">
      <style>{styles}</style>

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Since {company.founded}</span>
          <h1>About Newmax Industries Pvt. Ltd.</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">About</span>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container about-grid">
          <div className="about-media">
            <img src="/images/building.webp" alt="Newmax Industries Pvt. Ltd. facility" className="about-photo" />
            <div className="about-badge">
              <span className="n">{new Date().getFullYear() - company.founded}+</span>
              <span className="l">Years Strong</span>
            </div>
          </div>

          <div className="about-copy">
            <span className="eyebrow">Our Story</span>
            <p style={{ marginTop: 14 }}>{company.about}</p>
            <p>
              With long years of experience and knowledge in the industry, we stay close
              to our clients and their exact product requirements — which we meet with
              high satisfaction. Today we work with a large pool of clients across many
              market segments.
            </p>

            <ul className="story-list">
              {strengths.map((s) => (
                <li key={s}>
                  <span className="check"><CheckIcon /></span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" style={{ justifyContent: "center" }}>Why Newmax</span>
            <h2>What Sets Us Apart</h2>
          </div>
          <div className="value-grid">
            {values.map((v) => (
              <div className="value-card" key={v.title}>
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="fact-plate">
            <div className="fact-grid">
              <div className="fact-cell">
                <div className="fact-icon"><CalendarIcon /></div>
                <span className="v">{company.founded}</span>
                <span className="k">Established</span>
              </div>
              <div className="fact-cell">
                <div className="fact-icon"><PinIcon /></div>
                <span className="v">Ghaziabad</span>
                <span className="k">Uttar Pradesh</span>
              </div>
              <div className="fact-cell">
                <div className="fact-icon"><LayersIcon /></div>
                <span className="v">{products.length}</span>
                <span className="k">Machine Lines</span>
              </div>
              <div className="fact-cell">
                <div className="fact-icon"><TargetIcon /></div>
                <span className="v">Cable & Wire</span>
                <span className="k">Core Focus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Want to see the machines up close?</h2>
            <Link to="/contact" className="btn btn-dark">Request A Free Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}