import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { company } from "../data/content.js";

const styles = String.raw`
.site-header {
  --gold: #f6c542;
  --teal: #2dd4bf;
  position: sticky;
  top: 0;
  z-index: 60;
  background: rgba(16,25,42,0.97);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
  transition: box-shadow 0.25s;
}
.site-header.scrolled { box-shadow: 0 12px 30px rgba(0,0,0,0.35); }
.site-header::after {
  content: "";
  position: absolute; left: 0; right: 0; bottom: -1px; height: 2px;
  background: linear-gradient(90deg, var(--orange), var(--gold), var(--teal));
  opacity: 0; transition: opacity 0.25s;
}
.site-header.scrolled::after { opacity: 1; }

.header-top {
  background: var(--navy-2);
  font-family: var(--body);
  font-size: 0.82rem;
  color: var(--muted-light);
}
.header-top .container {
  display: flex; justify-content: flex-end; align-items: center;
  gap: 22px; height: 40px;
}
.header-top .mail-link { display: inline-flex; align-items: center; gap: 7px; transition: color 0.15s; }
.header-top .mail-link:hover { color: var(--orange); }
.call-now-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--orange); color: #fff !important; font-weight: 600;
  padding: 6px 16px; border-radius: 999px;
  transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
}
.call-now-btn:hover { background: var(--orange-dark); transform: translateY(-1px); box-shadow: 0 6px 16px rgba(255,106,26,0.3); }
.whatsapp-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: #25d366; color: #fff !important; font-weight: 600;
  padding: 6px 16px; border-radius: 999px;
  transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
}
.whatsapp-btn:hover { background: #1eb955; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(37,211,102,0.35); }

.header-inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 82px;
}
.brand { display: flex; align-items: center; gap: 14px; }
.brand-logo { height: 52px; display: block; transition: transform 0.2s; }
.brand:hover .brand-logo { transform: scale(1.05); }
.brand-text { display: flex; flex-direction: column; line-height: 1.15; }
.brand-text-top { font-family: var(--display); font-weight: 800; font-size: 1.12rem; color: #fff; letter-spacing: 0.01em; }
.brand-text-bottom { font-family: var(--display); font-weight: 600; font-size: 0.66rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--orange); margin-top: 3px; }

.nav { display: flex; align-items: center; gap: 6px; }
.nav a {
  font-family: var(--display); font-size: 0.85rem; font-weight: 600;
  color: #fff; text-transform: uppercase; letter-spacing: 0.04em;
  padding: 10px 16px; border-radius: 6px; position: relative;
  transition: color 0.15s, background 0.15s;
}
.nav a:hover { color: var(--gold); background: rgba(255,255,255,0.05); }
.nav a.active { color: var(--orange); }
.nav a.active::after {
  content: ""; position: absolute; left: 16px; right: 16px; bottom: 4px;
  height: 2px; background: var(--orange); border-radius: 2px;
}
.nav .cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--orange); color: #fff; margin-left: 8px;
  padding: 12px 22px; border-radius: 6px;
  box-shadow: 0 8px 20px rgba(255,106,26,0.25);
  transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
}
.nav .cta:hover { background: var(--orange-dark); color: #fff; transform: translateY(-2px); box-shadow: 0 10px 24px rgba(255,106,26,0.35); }
.nav .cta.active { color: #fff; }
.nav .cta::after { display: none; }

.menu-toggle {
  display: none; position: relative; width: 42px; height: 42px;
  background: none; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px;
  cursor: pointer; flex-direction: column; align-items: center; justify-content: center; gap: 5px;
}
.menu-toggle span {
  display: block; width: 18px; height: 2px; background: #fff;
  transition: transform 0.25s, opacity 0.2s;
}
.menu-toggle.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.menu-toggle.open span:nth-child(2) { opacity: 0; }
.menu-toggle.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.nav-backdrop { display: none; }

@media (max-width: 860px) {
  .header-top .container { justify-content: center; gap: 12px; }
  .call-now-btn span.label,
  .whatsapp-btn span.label { display: none; }
  .call-now-btn, .whatsapp-btn { padding: 8px; width: 34px; height: 34px; justify-content: center; }
  .header-top .mail-link { display: none; }
  .header-inner { height: 74px; }
  .brand-logo { height: 42px; }
  .brand-text-top { font-size: 1rem; }
  .menu-toggle { display: flex; }
  .nav {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: min(78vw, 320px);
    flex-direction: column; align-items: stretch; gap: 4px;
    background: var(--navy-2);
    padding: 100px 24px 30px;
    transform: translateX(100%);
    pointer-events: none;
    transition: transform 0.3s ease;
    box-shadow: -10px 0 40px rgba(0,0,0,0.4);
    z-index: 58;
  }
  .nav.open { transform: translateX(0); pointer-events: auto; }
  .nav a { padding: 14px 4px; border-bottom: 1px solid rgba(255,255,255,0.08); border-radius: 0; }
  .nav a.active::after { display: none; }
  .nav .cta { margin-left: 0; margin-top: 14px; justify-content: center; }
  .nav-backdrop {
    display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.5);
    opacity: 0; pointer-events: none; transition: opacity 0.25s; z-index: 55;
  }
  .nav-backdrop.open { opacity: 1; pointer-events: auto; }
}
`;

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M22 6l-10 7L2 6"/>
    <rect x="2" y="4" width="20" height="16" rx="2"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.47 14.38c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.58-.9-2.16-.24-.57-.48-.49-.65-.5-.17-.01-.36-.01-.56-.01-.19 0-.51.07-.78.36-.26.29-1.02 1-1.02 2.43 0 1.43 1.05 2.82 1.2 3.01.15.19 2.06 3.14 4.98 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z"/>
    <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12.02 22C17.55 22 22.02 17.52 22.02 12S17.55 2 12.02 2zm0 18.2c-1.7 0-3.28-.5-4.62-1.35l-.33-.2-3 .79.8-2.93-.21-.3A8.18 8.18 0 0 1 3.82 12c0-4.53 3.68-8.2 8.2-8.2 4.53 0 8.2 3.67 8.2 8.2 0 4.53-3.67 8.2-8.2 8.2z"/>
  </svg>
);
const QuoteIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/>
    <path d="M9 13h6M9 17h4"/>
  </svg>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <style>{styles}</style>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-top">
          <div className="container">
            <a href={`tel:${company.phone}`} className="call-now-btn">
              <PhoneIcon />
              <span className="label">Call Now: {company.phone}</span>
            </a>
            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <WhatsAppIcon />
              <span className="label">WhatsApp</span>
            </a>
            <a href={`mailto:${company.emails[0]}`} className="mail-link">
              <MailIcon />
              {company.emails[0]}
            </a>
          </div>
        </div>

        <div className="container header-inner">
          <Link to="/" className="brand" onClick={close}>
            <img src="/images/logo.png" alt="Newmax Industries Pvt. Ltd." className="brand-logo" />
            <span className="brand-text">
              <span className="brand-text-top">Newmax</span>
              <span className="brand-text-bottom">Industries Pvt. Ltd.</span>
            </span>
          </Link>

          <button
            className={`menu-toggle ${open ? "open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>

          <nav className={`nav ${open ? "open" : ""}`}>
            <NavLink to="/" end onClick={close}>Home</NavLink>
            <NavLink to="/products" onClick={close}>Products</NavLink>
            <NavLink to="/about" onClick={close}>About</NavLink>
            <NavLink to="/events" onClick={close}>Events</NavLink>
            <NavLink to="/contact" onClick={close}>Contact</NavLink>
            <NavLink to="/contact" className="cta" onClick={close}>
              Get A Quote
            </NavLink>
          </nav>
        </div>
      </header>
      <div className={`nav-backdrop ${open ? "open" : ""}`} onClick={close} />
    </>
  );
}