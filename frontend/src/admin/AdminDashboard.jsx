import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || !['admin', 'productManager'].includes(user.role)) {
      navigate('/');
      return;
    }

    if (user.role !== 'admin') return;

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate('/login');
          }
          setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, [user, navigate]);

  const cardStyle = {
    padding: '25px',
    background: '#ffffff',
    border: '1px solid #eee3eb',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(69, 48, 89, 0.07)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px'
  };

  const numberStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#7650d2'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
        <img src="/ShopNestLogo.png" alt="Logo" style={{ height: '40px', width: '40px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 0px 10px rgba(249, 115, 22, 0.3))' }} />
        <h2 style={{ margin: 0 }}>{user?.role === 'admin' ? 'Admin Dashboard' : 'Product Management'}</h2>
      </div>
      <p style={{ color: '#716b7d', marginBottom: '30px', fontSize: '1.1rem' }}>Welcome back, <span style={{color: '#302a42'}}>{user?.name}</span></p>
      
      {user?.role === 'admin' && stats ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={cardStyle}>
            <h4 style={{ color: '#81798d', fontSize: '1rem' }}>Total Orders</h4>
            <div style={numberStyle}>{stats.totalOrders}</div>
          </div>
          <div style={cardStyle}>
            <h4 style={{ color: '#81798d', fontSize: '1rem' }}>Total Products</h4>
            <div style={numberStyle}>{stats.totalProducts}</div>
          </div>
          <div style={cardStyle}>
            <h4 style={{ color: '#81798d', fontSize: '1rem' }}>Total Users</h4>
            <div style={numberStyle}>{stats.totalUsers}</div>
          </div>
          <div style={cardStyle}>
            <h4 style={{ color: '#81798d', fontSize: '1rem' }}>Total Revenue</h4>
            <div style={numberStyle}>₹{stats.totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      ) : user?.role === 'admin' ? (
        <div style={{ textAlign: 'center', margin: '50px 0', color: '#7650d2' }}>Loading metrics...</div>
      ) : null}

      <div style={{ marginTop: '40px', padding: '30px', background: '#ffffff', borderRadius: '18px', border: '1px solid #eee3eb', boxShadow: '0 8px 24px rgba(69, 48, 89, 0.07)' }}>
        <h3 style={{ marginBottom: '25px', color: '#7650d2' }}>{user?.role === 'admin' ? 'Administrative Controls' : 'Product Controls'}</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => navigate('/admin/add-product')}>+ Add Product</button>
          <button className="btn" onClick={() => navigate('/admin/products')} style={{ background: 'linear-gradient(120deg, #9a7bef, #7650d2)' }}>📦 Manage Products</button>
          {user?.role === 'admin' && <button className="btn" onClick={() => navigate('/admin/orders')} style={{ background: 'linear-gradient(120deg, #9a7bef, #7650d2)' }}>🚚 Manage Orders</button>}
          {user?.role === 'admin' && <button className="btn" onClick={() => navigate('/admin/users')} style={{ background: 'linear-gradient(120deg, #9a7bef, #7650d2)' }}>👥 Users Directory</button>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
