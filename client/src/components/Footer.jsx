import { Link } from "react-router-dom";
import { company, products } from "../data/content.js";

const styles = String.raw`
.site-footer {
  --gold: #f6c542;
  --teal: #2dd4bf;
  position: relative;
  overflow: hidden;
  background: var(--navy);
  color: var(--muted-light);
}
.site-footer::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--orange), var(--gold), var(--teal));
}
.footer-top {
  padding: 64px 0 48px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.1fr;
  gap: 44px;
}
.footer-brand-logo { height: 56px; display: block; margin-bottom: 18px; }
.footer-about { font-size: 0.92rem; line-height: 1.7; color: var(--muted-light); max-width: 32ch; }
.footer-col h4 {
  font-family: var(--display); font-weight: 700; color: #fff;
  font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.06em;
  margin-bottom: 22px; position: relative; padding-bottom: 12px;
}
.footer-col h4::after {
  content: ""; position: absolute; left: 0; bottom: 0;
  width: 30px; height: 2px; background: var(--orange);
}
.footer-links { display: flex; flex-direction: column; gap: 13px; }
.footer-links a {
  font-size: 0.9rem; color: var(--muted-light);
  display: inline-flex; align-items: center; gap: 8px;
  transition: color 0.15s, transform 0.15s;
  width: fit-content;
}
.footer-links a::before {
  content: "\2192"; color: var(--orange); font-size: 0.78rem;
}
.footer-links a:hover { color: #fff; transform: translateX(3px); }
.footer-contact-item {
  display: flex; align-items: flex-start; gap: 12px;
  margin-bottom: 18px;
}
.footer-contact-icon {
  flex: 0 0 34px; height: 34px; border-radius: 8px;
  background: rgba(255,106,26,0.14); color: var(--orange);
  display: flex; align-items: center; justify-content: center;
}
.footer-contact-item .v { font-size: 0.9rem; color: var(--muted-light); line-height: 1.55; }
.footer-contact-item a.v { transition: color 0.15s; }
.footer-contact-item a.v:hover { color: #fff; }
.footer-cta {
  margin-top: 28px;
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--orange); color: #fff; font-weight: 600;
  font-family: var(--display); font-size: 0.85rem;
  padding: 12px 20px; border-radius: 6px;
  transition: background 0.15s, transform 0.15s;
}
.footer-cta:hover { background: var(--orange-dark); transform: translateY(-2px); }

.footer-bottom {
  padding: 22px 0;
  display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 14px;
  font-size: 0.82rem; color: var(--muted-light);
}
.footer-bottom .powered a { color: var(--gold); font-weight: 600; }
.footer-bottom .powered a:hover { color: #fff; }
.back-to-top {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.15); color: #fff;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; cursor: pointer; background: none; flex-shrink: 0;
}
.back-to-top:hover { background: var(--orange); border-color: var(--orange); transform: translateY(-3px); }

@media (max-width: 960px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .footer-grid { grid-template-columns: 1fr; }
  .footer-bottom { justify-content: center; text-align: center; }
}
`;

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 6l-10 7L2 6"/>
    <rect x="2" y="4" width="20" height="16" rx="2"/>
  </svg>
);
const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const ArrowUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style>{styles}</style>
      <footer className="site-footer">
        <div className="footer-top">
          <div className="container footer-grid">
            <div className="footer-col">
              <img src="/images/logo.png" alt="Newmax Industries Pvt. Ltd." className="footer-brand-logo" />
              <p className="footer-about">{company.about.slice(0, 160)}…</p>
              <Link to="/contact" className="footer-cta">Get A Free Quote →</Link>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <div className="footer-links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About Us</Link>
                <Link to="/Events">Events</Link>  
                <Link to="/contact">Contact</Link>
              </div>
            </div>

            <div className="footer-col">
              <h4>Our Products</h4>
              <div className="footer-links">
                {products.slice(0, 5).map((p) => (
                  <Link key={p.slug} to={`/products/${p.slug}`}>{p.name}</Link>
                ))}
              </div>
            </div>

            <div className="footer-col">
              <h4>Get In Touch</h4>
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><PhoneIcon /></span>
                <a className="v" href={`tel:${company.phone}`}>{company.phone}</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><MailIcon /></span>
                <div className="v">
                  {company.emails.map((e) => (
                    <div key={e}>
                      <a className="v" href={`mailto:${e}`}>{e}</a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><PinIcon /></span>
                <span className="v">{company.address}</span>
              </div>
              <div className="footer-contact-item">
                <span className="v">GSTIN: {company.gstin}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© {year} Newmax Industries Pvt. Ltd. · Cable machinery manufacturers since {company.founded}</span>
          <span className="powered">
            Powered by{" "}
            <a href="https://www.heltog.com" target="_blank" rel="noopener noreferrer">
              Heltog Technologies Pvt. Ltd.
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}