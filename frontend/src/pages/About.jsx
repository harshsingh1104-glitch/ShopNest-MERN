import React from 'react';

const About = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px',
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #eee3eb',
    boxShadow: '0 10px 40px rgba(69, 48, 89, 0.1)',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <img
        src="/dp.jpg"
        alt="Harsh"
        style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #8055e8', marginBottom: '20px', boxShadow: '0 4px 20px rgba(128, 85, 232, 0.24)' }}
      />
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#302a42' }}>About Me</h2>
      <h3 style={{ fontSize: '1.5rem', color: '#8055e8', marginBottom: '15px' }}>Harsh</h3>

      <p style={{ color: '#716b7d', fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto 30px auto' }}>
        Welcome to ShopNest, my online store.
      </p>
    </div>
  );
};

export default About;
