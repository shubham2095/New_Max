import { products } from "../data/content.js";
import ProductCard from "../components/ProductCard.jsx";
import { Link } from "react-router-dom";

const styles = String.raw`
.products-service-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 26px; } .products-cta-banner { background: var(--orange); border-radius: 10px; padding: 56px 48px; display: flex; align-items: center; justify-content: space-between; gap: 30px; flex-wrap: wrap; color: #fff; } .products-cta-banner h2 { font-family: var(--display); font-weight: 800; font-size: clamp(1.5rem, 3vw, 2.1rem); max-width: 24ch; } .products-cta-banner .btn-dark { border-color: #fff; color: #fff; } .products-cta-banner .btn-dark:hover { background: #fff; color: var(--orange); } @media (max-width: 860px) { .products-cta-banner { flex-direction: column; align-items: flex-start; } }
`;

export default function Products() {
  return (
    <>
      <style>{styles}</style>
      <style>{String.raw`.products-service-grid { gap: 30px; } .products-cta-banner { box-shadow: 0 18px 36px rgba(226,87,13,0.2); position: relative; overflow: hidden; } .products-cta-banner::after { content: ""; position: absolute; inset: auto -70px -90px auto; width: 200px; height: 200px; border: 28px solid rgba(255,255,255,0.13); border-radius: 50%; } .products-cta-banner > * { position: relative; z-index: 1; }`}</style>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Full Catalogue</span>
          <h1>Products</h1>
          <p>
            Every machine is engineered to the client's requirement. Select a machine for
            its full specification, or request a quote directly.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="products-service-grid">
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="products-cta-banner">
            <h2>Not sure which machine fits your line?</h2>
            <Link to="/contact" className="btn btn-dark">Talk To Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
