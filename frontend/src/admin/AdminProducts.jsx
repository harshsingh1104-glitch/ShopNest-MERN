import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you strictly sure you want to delete this?')) {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#7650d2' }}>Manage Products</h2>
        <Link to="/admin/add-product" className="btn">+ Add Product</Link>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowStyle}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>PRICE</th>
              <th style={thStyle}>CATEGORY</th>
              <th style={thStyle}>STOCK</th>
              <th style={thStyle}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} style={rowStyle}>
                <td style={tdStyle}>{product._id.substring(0, 8)}...</td>
                <td style={tdStyle}>{product.name}</td>
                <td style={tdStyle}>₹{product.price.toFixed(2)}</td>
                <td style={tdStyle}>{product.category}</td>
                <td style={tdStyle}>{product.stock}</td>
                <td style={tdStyle}>
                  <Link to={`/admin/edit-product/${product._id}`} style={editBtn}>Edit</Link>
                  <button onClick={() => handleDelete(product._id)} style={deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const containerStyle = { maxWidth: '1200px', margin: '40px auto', padding: '30px', background: '#ffffff', borderRadius: '20px', border: '1px solid #eee3eb', color: '#302a42', boxShadow: '0 16px 45px rgba(69, 48, 89, 0.08)' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const rowStyle = { borderBottom: '1px solid #eee3eb' };
const thStyle = { padding: '15px', textAlign: 'left', color: '#81798d', fontSize: '0.82rem' };
const tdStyle = { padding: '15px', textAlign: 'left' };
const editBtn = { background: '#3b82f6', color: '#fff', padding: '6px 12px', borderRadius: '4px', marginRight: '10px' };
const deleteBtn = { background: '#ef4444', color: '#fff', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer' };

export default AdminProducts;
