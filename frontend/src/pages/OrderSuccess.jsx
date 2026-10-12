import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '50px 30px',
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #eee3eb',
    boxShadow: '0 10px 40px rgba(69, 48, 89, 0.1)',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#21866e' }}>Payment Successful!</h2>
      <p style={{ color: '#716b7d', fontSize: '1.2rem', marginBottom: '40px' }}>
        Thank you for your order. We have securely received your payment and will process your shipment shortly.
      </p>
      <Link to="/shop" className="btn">Continue Shopping</Link>
    </div>
  );
};

export default OrderSuccess;
