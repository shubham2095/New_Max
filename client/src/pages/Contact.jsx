import { useState } from "react";
import { Link } from "react-router-dom";
import { company } from "../data/content.js";

const styles = String.raw`
.contact-page { --gold: #f6c542; --teal: #2dd4bf; }

.breadcrumb {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--body); font-size: 0.82rem; color: var(--muted-light);
  margin-top: 14px;
}
.breadcrumb a { color: var(--muted-light); transition: color 0.15s; }
.breadcrumb a:hover { color: var(--orange); }
.breadcrumb .sep { opacity: 0.5; }
.breadcrumb .current { color: var(--orange); font-weight: 600; }

.contact-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 56px; align-items: start; }

.contact-form-card {
  background: #fff; padding: 36px; border: 1px solid #eef0f4; border-radius: 12px;
  box-shadow: 0 20px 46px rgba(16,25,42,0.09); position: relative; overflow: hidden;
}
.contact-form-card::before {
  content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, var(--orange), var(--gold), var(--teal));
}
.contact-form-card h3 { font-family: var(--display); font-weight: 700; font-size: 1.3rem; color: var(--ink); margin-bottom: 6px; }
.contact-form-card .sub { color: var(--muted); font-size: 0.9rem; margin-bottom: 26px; }

.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.field { margin-bottom: 18px; }
.field label {
  display: block; font-family: var(--display); font-size: 0.76rem; font-weight: 700;
  letter-spacing: 0.05em; text-transform: uppercase; color: var(--ink); margin-bottom: 8px;
}
.field .input-wrap { position: relative; }
.field .input-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  color: var(--muted); pointer-events: none; display: flex;
}
.field input, .field select, .field textarea {
  width: 100%; background: #fbfcfe; border: 1.5px solid #dfe2e8; border-radius: 6px;
  color: var(--ink); padding: 13px 15px; font-family: var(--body); font-size: 0.95rem;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
}
.field input.has-icon { padding-left: 42px; }
.field input:hover, .field textarea:hover { border-color: #bec7d4; }
.field input:focus, .field select:focus, .field textarea:focus {
  outline: none; border-color: var(--orange); background: #fff;
  box-shadow: 0 0 0 4px rgba(255,106,26,0.12);
}
.field textarea { resize: vertical; min-height: 130px; }
.field-hint { display: flex; justify-content: flex-end; margin-top: 6px; font-size: 0.76rem; color: var(--muted-light); }

.form-msg {
  display: flex; align-items: flex-start; gap: 12px;
  font-family: var(--body); font-size: 0.88rem; padding: 15px 16px; border-radius: 8px; margin-bottom: 20px;
}
.form-msg .icon { flex: 0 0 22px; margin-top: 1px; }
.form-msg.ok { border: 1px solid #b6e3c2; color: #1f6a37; background: #ecf8ef; }
.form-msg.err { border: 1px solid #f0bcb8; color: #a5342f; background: #fceceb; }

.submit-btn { display: inline-flex; align-items: center; gap: 10px; }
.spinner {
  width: 15px; height: 15px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.contact-info-card {
  display: flex; align-items: flex-start; gap: 14px;
  background: #fff; border: 1px solid #eef0f4; border-radius: 10px;
  padding: 20px 20px; margin-bottom: 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.contact-info-card:hover {
  transform: translateY(-3px); box-shadow: 0 14px 30px rgba(16,25,42,0.08);
  border-color: rgba(255,106,26,0.25);
}
.contact-info-icon {
  flex: 0 0 42px; height: 42px; border-radius: 9px;
  background: rgba(255,106,26,0.1); color: var(--orange);
  display: flex; align-items: center; justify-content: center;
}
.contact-info-card .k {
  font-family: var(--display); font-size: 0.74rem; font-weight: 700;
  letter-spacing: 0.07em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px;
}
.contact-info-card .v { font-size: 0.98rem; color: var(--ink); line-height: 1.5; }
.contact-info-card a.v:hover { color: var(--orange); }

.contact-map {
  overflow: hidden; margin-top: 6px; border: 1px solid #eef0f4; border-radius: 12px;
  background: #fff; box-shadow: 0 16px 36px rgba(16,25,42,0.1); position: relative;
}
.map-directions {
  position: absolute; right: 14px; bottom: 14px; z-index: 2;
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff; color: var(--ink); font-family: var(--display); font-weight: 700;
  font-size: 0.78rem; padding: 10px 16px; border-radius: 999px;
  box-shadow: 0 10px 24px rgba(16,25,42,0.22);
  transition: background 0.15s, color 0.15s, transform 0.15s;
}
.map-directions:hover { background: var(--orange); color: #fff; transform: translateY(-2px); }

@media (max-width: 960px) {
  .contact-grid { grid-template-columns: 1fr; gap: 36px; }
}
@media (max-width: 640px) {
  .contact-form-card { padding: 22px; }
  .field-row { grid-template-columns: 1fr; gap: 0; }
}
`;

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };
const MAX_MESSAGE = 600;

const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 6l-10 7L2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const TagIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41L11 3.83A2 2 0 0 0 9.59 3.24L4 3v5.59a2 2 0 0 0 .59 1.41l9.58 9.58a2 2 0 0 0 2.83 0l3.59-3.59a2 2 0 0 0 0-2.83z"/>
    <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none"/>
  </svg>
);
const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01"/>
  </svg>
);
const DirectionsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M3 11l18-7-7 18-2-8-9-3z"/>
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: "sending", msg: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setStatus({
        state: "ok",
        msg: "Thanks for reaching out — we've received your message and will reply shortly.",
      });
      setForm(EMPTY);
    } catch (err) {
      setStatus({ state: "err", msg: err.message });
    }
  }

  const mapsQuery = encodeURIComponent(company.address);

  return (
    <div className="contact-page">
      <style>{styles}</style>

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Get In Touch</span>
          <h1>Contact</h1>
          <p>Have a question about a machine or a project? Send us a message and we'll get back to you.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Contact</span>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container contact-grid">
          <div className="contact-form-card">
            <h3>Send Us A Message</h3>
            <p className="sub">Fill out the form below and our team will get back to you.</p>

            <form onSubmit={submit}>
              {status.state === "ok" && (
                <div className="form-msg ok">
                  <span className="icon"><CheckCircleIcon /></span>
                  <span>{status.msg}</span>
                </div>
              )}
              {status.state === "err" && (
                <div className="form-msg err">
                  <span className="icon"><AlertIcon /></span>
                  <span>{status.msg}</span>
                </div>
              )}

              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-name">Name *</label>
                  <div className="input-wrap">
                    <span className="input-icon"><UserIcon /></span>
                    <input id="c-name" className="has-icon" value={form.name} onChange={update("name")} required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email *</label>
                  <div className="input-wrap">
                    <span className="input-icon"><MailIcon /></span>
                    <input id="c-email" className="has-icon" type="email" value={form.email} onChange={update("email")} required />
                  </div>
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-phone">Phone</label>
                  <div className="input-wrap">
                    <span className="input-icon"><PhoneIcon /></span>
                    <input id="c-phone" className="has-icon" value={form.phone} onChange={update("phone")} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="c-subject">Subject</label>
                  <div className="input-wrap">
                    <span className="input-icon"><TagIcon /></span>
                    <input
                      id="c-subject"
                      className="has-icon"
                      value={form.subject}
                      onChange={update("subject")}
                      placeholder="Machine enquiry, service…"
                    />
                  </div>
                </div>
              </div>

              <div className="field">
                <label htmlFor="c-message">Message *</label>
                <textarea
                  id="c-message"
                  value={form.message}
                  onChange={(e) => e.target.value.length <= MAX_MESSAGE && update("message")(e)}
                  placeholder="Tell us what you need…"
                  required
                />
                <div className="field-hint">{form.message.length} / {MAX_MESSAGE}</div>
              </div>

              <button className="btn btn-primary submit-btn" type="submit" disabled={status.state === "sending"}>
                {status.state === "sending" ? (
                  <>
                    <span className="spinner" /> Sending…
                  </>
                ) : (
                  <>
                    <SendIcon /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div>
            <div className="contact-info-card">
              <span className="contact-info-icon"><PhoneIcon /></span>
              <div>
                <div className="k">Phone</div>
                <a className="v" href={`tel:${company.phone}`}>{company.phone}</a>
              </div>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-icon"><MailIcon /></span>
              <div>
                <div className="k">Email</div>
                {company.emails.map((e) => (
                  <div key={e}><a className="v" href={`mailto:${e}`}>{e}</a></div>
                ))}
              </div>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-icon"><PinIcon /></span>
              <div>
                <div className="k">Address</div>
                <span className="v">{company.address}</span>
              </div>
            </div>

            <div className="contact-map">
              <iframe
                title="Newmax Industries Pvt. Ltd. location"
                width="100%"
                height="260"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1750.5493369104952!2d77.45327837941481!3d28.65676401265609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM5JzIzLjYiTiA3N8KwMjcnMTUuOCJF!5e0!3m2!1sen!2sin!4v1792149062516!5m2!1sen!2sin"
              />
              <a
                className="map-directions"
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <DirectionsIcon /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}