import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/auth/users', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    };
    fetchUsers();
  }, [user]);

  const toggleProductManager = async (targetUser) => {
    setError('');
    const enabled = targetUser.role !== 'productManager';
    const res = await fetch(`/api/auth/users/${targetUser._id}/product-manager`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({ enabled })
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Could not update role');
      return;
    }
    setUsers(currentUsers => currentUsers.map(existingUser =>
      existingUser._id === targetUser._id ? { ...existingUser, role: data.role } : existingUser
    ));
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#7650d2', marginBottom: '20px' }}>User Directory</h2>
      {error && <p role="alert" style={{ color: '#ef4444' }}>{error}</p>}
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowStyle}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>EMAIL</th>
              <th style={thStyle}>ROLE</th>
              <th style={thStyle}>JOINED</th>
              <th style={thStyle}>ACCESS</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={rowStyle}>
                <td style={tdStyle}>{u._id.substring(0, 8)}...</td>
                <td style={tdStyle}>{u.name}</td>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>
                  <span style={{ background: u.role === 'admin' ? '#f1eaff' : '#e7f7f0', color: u.role === 'admin' ? '#7650d2' : '#21866e', padding: '5px 9px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td style={tdStyle}>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td style={tdStyle}>
                  {u.role !== 'admin' && (
                    <button className="btn" onClick={() => toggleProductManager(u)}>
                      {u.role === 'productManager' ? 'Revoke product access' : 'Grant product access'}
                    </button>
                  )}
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

export default AdminUsers;
