import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="shop-container">
      <header className="shop-heading">
        <div>
          <p className="section-eyebrow">Shop all</p>
          <h1>Everyday finds, all in one place.</h1>
          <p>Browse the latest products and find what you need.</p>
        </div>
      </header>
      <label className="sr-only" htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={(event) => setSearchParams(event.target.value ? { search: event.target.value } : {}, { replace: true })}
        className="search-bar"
      />
      {loading ? (
        <div className="shop-empty" role="status">Loading the collection…</div>
      ) : (
        <>
          <p className="shop-results" aria-live="polite">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="shop-empty">No products match “{search}”. Try another search.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Shop;
