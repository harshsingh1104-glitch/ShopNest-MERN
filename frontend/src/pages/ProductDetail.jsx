import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/product.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1
      }));
      alert('Successfully added to your cart!');
    }
  };

  if (loading) return <div className="product-loading" role="status">Loading product…</div>;
  if (!product) return <div className="product-not-found">Product not found.</div>;

  return (
    <div className="product-detail-wrapper">
      <nav className="product-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop">Shop</Link>
        {product.category && <><span aria-hidden="true">/</span><span>{product.category}</span></>}
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="product-detail">
        <div className="detail-image-container">
          <img src={product.imageUrl} alt={product.name} className="detail-image" />
        </div>

        <div className="detail-info">
          <h2>{product.name}</h2>
          <p className="detail-price">₹{Number(product.price).toFixed(2)}</p>

          <div>
            <h4>Product description</h4>
            <p>{product.description}</p>
          </div>

          <button onClick={handleAddToCart} className="btn">
            Add to shopping cart
          </button>

          <p className={`detail-stock ${product.stock > 0 ? 'detail-stock--available' : 'detail-stock--unavailable'}`}>
            {product.stock > 0 ? `● In stock (${product.stock} units available)` : '● Temporarily out of stock'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
