import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { company, products } from "../data/content.js";

const EMPTY = { name: "", email: "", phone: "", product: "", message: "" };

export default function Quote() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  useEffect(() => {
    const slug = searchParams.get("product");
    if (!slug) return;
    const match = products.find((p) => p.slug === slug);
    if (match) setForm((f) => ({ ...f, product: match.name }));
  }, [searchParams]);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: "sending", msg: "" });
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setStatus({ state: "ok", msg: "Thanks — your request has been received. We'll be in touch shortly." });
      setForm(EMPTY);
    } catch (err) {
      setStatus({ state: "err", msg: err.message });
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">No Obligation</span>
          <h1>Get Your Free Quote</h1>
          <p>Tell us which machine you need and how to reach you. We'll respond with pricing and specifications.</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container quote-grid">
          <form onSubmit={submit}>
            {status.state === "ok" && <div className="form-msg ok">{status.msg}</div>}
            {status.state === "err" && <div className="form-msg err">{status.msg}</div>}

            <div className="field">
              <label htmlFor="name">Name *</label>
              <input id="name" value={form.name} onChange={update("name")} required />
            </div>
            <div className="field">
              <label htmlFor="email">Email *</label>
              <input id="email" type="email" value={form.email} onChange={update("email")} required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" value={form.phone} onChange={update("phone")} />
            </div>
            <div className="field">
              <label htmlFor="product">Select a product *</label>
              <select id="product" value={form.product} onChange={update("product")} required>
                <option value="">— Select a product —</option>
                {products.map((p) => (<option key={p.slug} value={p.name}>{p.name}</option>))}
                <option value="Other / General enquiry">Other / General enquiry</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" value={form.message} onChange={update("message")} placeholder="Specifications, quantities, or questions…" />
            </div>
            <button className="btn btn-primary" type="submit" disabled={status.state === "sending"}>
              {status.state === "sending" ? "Sending…" : "Request a quote"}
            </button>
          </form>

          <div>
            <div className="contact-block">
              <div className="k">Prefer to call?</div>
              <div className="v"><a href={`tel:${company.phone}`}>{company.phone}</a></div>
            </div>
            <div className="contact-block">
              <div className="k">Email</div>
              <div className="v">{company.emails.map((e) => (<div key={e}><a href={`mailto:${e}`}>{e}</a></div>))}</div>
            </div>
            <div className="contact-block">
              <div className="k">Address</div>
              <div className="v">{company.address}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}