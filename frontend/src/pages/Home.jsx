import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import '../styles/product.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0, 4)); // Featured products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">Welcome to ShopNest</p>
          <h1>Good things<br />for every day.</h1>
          <p className="home-hero__copy">
            Take a look around and find something you’ll love. Your next favorite
            is only a few clicks away.
          </p>
          <div className="home-hero__actions">
            <Link to="/shop" className="btn">Shop all products</Link>
            <span className="home-hero__delivery">Easy browsing. Secure checkout.</span>
          </div>
        </div>
        <div className="home-hero__visual">
          {products[0] && (
            <Link to={`/product/${products[0]._id}`} className="home-hero__product">
              <img src={products[0].imageUrl} alt={products[0].name} />
              <span className="home-hero__product-note">
                <span>Featured find</span>
                <strong>{products[0].name}</strong>
                <b>₹{Number(products[0].price).toFixed(2)}</b>
              </span>
            </Link>
          )}
          {!products[0] && <div className="home-hero__visual-placeholder">ShopNest</div>}
        </div>
      </section>

      <section className="home-benefits" aria-label="ShopNest benefits">
        <div className="home-benefits__item">
          <span className="home-benefits__icon" aria-hidden="true">01</span>
          <span>Browse at your own pace</span>
        </div>
        <div className="home-benefits__item">
          <span className="home-benefits__icon" aria-hidden="true">02</span>
          <span>Simple, secure checkout</span>
        </div>
        <div className="home-benefits__item">
          <span className="home-benefits__icon" aria-hidden="true">03</span>
          <span>Keep an eye out for new finds</span>
        </div>
      </section>

      <section id="featured" className="home-featured">
        <div className="home-section-heading">
          <div>
            <p className="section-eyebrow">The collection</p>
            <h2>Popular right now</h2>
            <p>Take a look at what’s in the shop.</p>
          </div>
          <Link to="/shop">View all products <span aria-hidden="true">→</span></Link>
        </div>
      {loading ? (
        <div className="shop-empty" role="status">Loading products…</div>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? products.map((product) => (
              <ProductCard key={product._id} product={product} />
            )) : (
              <p className="shop-empty">There are no products to show right now.</p>
            )}
        </div>
      )}
      </section>
    </div>
  );
};

export default Home;
