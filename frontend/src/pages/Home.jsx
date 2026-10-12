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
          <h1>Good finds.<br /><span>Better living.</span></h1>
          <p className="home-hero__copy">
            Discover everyday essentials and standout picks, all in one place.
            Find something you love and make it yours.
          </p>
          <div className="home-hero__actions">
            <Link to="/shop" className="btn">Explore the shop</Link>
            <a href="#featured" className="home-hero__secondary">See featured picks ↓</a>
          </div>
        </div>
        <div className="home-hero__art" aria-hidden="true">
          <div className="home-hero__orb" />
          <div className="home-hero__note">A little something for every day</div>
        </div>
      </section>

      <section className="home-benefits" aria-label="ShopNest benefits">
        <div className="home-benefits__item">
          <span className="home-benefits__icon" aria-hidden="true">✦</span>
          <span>Handpicked everyday finds</span>
        </div>
        <div className="home-benefits__item">
          <span className="home-benefits__icon" aria-hidden="true">♡</span>
          <span>Shopping made simple</span>
        </div>
        <div className="home-benefits__item">
          <span className="home-benefits__icon" aria-hidden="true">↗</span>
          <span>New favorites to discover</span>
        </div>
      </section>

      <section id="featured" className="home-featured">
        <div className="home-section-heading">
          <div>
            <p className="section-eyebrow">Picked for you</p>
            <h2>Featured finds</h2>
            <p>A few favorites to get your next discovery started.</p>
          </div>
          <Link to="/shop">Browse everything →</Link>
        </div>
      {loading ? (
        <div className="shop-empty" role="status">Finding something good for you…</div>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? products.map((product) => (
              <ProductCard key={product._id} product={product} />
            )) : (
              <p className="shop-empty">New finds are on their way. Check back soon.</p>
            )}
        </div>
      )}
      </section>
    </div>
  );
};

export default Home;
