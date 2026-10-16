import { Link } from "react-router-dom";
import { events, certificate } from "../data/content.js";

const styles = String.raw`
.events-page { --gold: #f6c542; --teal: #2dd4bf; }

.breadcrumb {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--body); font-size: 0.82rem; color: var(--muted-light);
  margin-top: 14px;
}
.breadcrumb a { color: var(--muted-light); transition: color 0.15s; }
.breadcrumb a:hover { color: var(--orange); }
.breadcrumb .sep { opacity: 0.5; }
.breadcrumb .current { color: var(--orange); font-weight: 600; }

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px;
}
.event-card {
  background: #fff; border: 1px solid #e7e9ee; border-radius: 10px;
  overflow: hidden; transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.event-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(16,25,42,0.12); }
.event-media { aspect-ratio: 4/3; overflow: hidden; position: relative; background: var(--offwhite); }
.event-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
.event-card:hover .event-media img { transform: scale(1.06); }
.event-tag {
  position: absolute; bottom: 12px; left: 12px;
  background: var(--gold); color: var(--navy);
  font-family: var(--display); font-weight: 700; font-size: 0.76rem;
  padding: 5px 12px; border-radius: 4px;
}
.event-body { padding: 18px 20px; }
.event-body h3 {
  font-family: var(--display); font-weight: 700; font-size: 1.05rem;
  color: var(--ink); text-transform: uppercase; letter-spacing: 0.02em;
}

.cert-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
.cert-media { position: relative; display: flex; justify-content: center; }
.cert-media::before {
  content: ""; position: absolute; top: -16px; right: -16px;
  width: 100%; height: 100%; background: var(--orange);
  border-radius: 10px; z-index: 0; transform: rotate(4deg);
}
.cert-photo {
  position: relative; z-index: 1; max-width: 360px; width: 100%;
  border-radius: 8px; box-shadow: 0 22px 44px rgba(16,25,42,0.18);
  display: block;
}
.cert-copy p { color: var(--muted); margin-bottom: 16px; line-height: 1.7; }

@media (max-width: 900px) {
  .cert-grid { grid-template-columns: 1fr; gap: 40px; }
  .cert-media { order: -1; }
}
`;

export default function Events() {
  return (
    <div className="events-page">
      <style>{styles}</style>

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Where You've Seen Us</span>
          <h1>Events & Exhibitions</h1>
          <p>
            A look back at the trade shows and exhibitions where Newmax Industries Pvt. Ltd.
            has showcased its machines over the years.
          </p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Events</span>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="events-grid">
            {events.map((e) => (
              <div className="event-card" key={`${e.city}-${e.year}`}>
                <div className="event-media">
                  <img src={e.image} alt={`${e.city} ${e.year}`} loading="lazy" />
                  <span className="event-tag">{e.city} {e.year}</span>
                </div>
                <div className="event-body">
                  <h3>{e.city} {e.year}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cert-grid">
          <div className="cert-copy">
            <span className="eyebrow">Our Certification</span>
            <h2 style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: "2.1rem", marginTop: 12, marginBottom: 18, lineHeight: 1.2 }}>
              {certificate.title}
            </h2>
            <p>
              Newmax Industries Pvt. Ltd. is an ISO 9001:2015 certified company, reflecting our
              commitment to consistent quality management across every machine we build.
            </p>
            <Link to="/contact" className="btn btn-dark">Request A Free Quote</Link>
          </div>
          <div className="cert-media">
            <img src={certificate.image} alt={certificate.subtitle} className="cert-photo" />
          </div>
        </div>
      </section>
    </div>
  );
}