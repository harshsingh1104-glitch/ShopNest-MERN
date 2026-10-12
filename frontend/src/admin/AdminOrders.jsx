import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './AdminOrders.css';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    };
    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setOrders(orders.map(order => order._id === id ? { ...order, status } : order));
    }
  };

  return (
    <main className="admin-orders">
      <header className="admin-orders__header">
        <div>
          <p className="admin-orders__eyebrow">Store operations</p>
          <h1>Manage orders</h1>
          <p className="admin-orders__description">
            Keep track of customer purchases and update delivery progress.
          </p>
        </div>
        <div className="admin-orders__total">
          <span className="admin-orders__total-label">Total orders</span>
          <strong>{orders.length}</strong>
        </div>
      </header>

      <section className="admin-orders__overview" aria-label="Order status overview">
        {[
          { label: 'Pending', value: orders.filter(order => order.status === 'Pending').length },
          { label: 'Shipped', value: orders.filter(order => order.status === 'Shipped').length },
          { label: 'Delivered', value: orders.filter(order => order.status === 'Delivered').length }
        ].map(item => (
          <article className="admin-orders__stat" key={item.label}>
            <span className={`admin-orders__stat-dot admin-orders__stat-dot--${item.label.toLowerCase()}`} />
            <span className="admin-orders__stat-label">{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="admin-orders__panel">
        <div className="admin-orders__panel-heading">
          <div>
            <h2>All orders</h2>
            <p>Review order details and change their current status.</p>
          </div>
          <span className="admin-orders__order-count">{orders.length} orders</span>
        </div>
        <div className="admin-orders__table-wrap">
          <table className="admin-orders__table">
            <thead>
              <tr>
                <th scope="col">ORDER</th>
                <th scope="col">CUSTOMER</th>
                <th scope="col">TOTAL</th>
                <th scope="col">DATE</th>
                <th scope="col">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? orders.map(order => (
                <tr key={order._id}>
                  <td data-label="Order">
                    <span className="admin-orders__order-id">#{order._id.substring(0, 8).toUpperCase()}</span>
                  </td>
                  <td data-label="Customer">
                    <span className="admin-orders__customer">{order.userId?.name || 'Deleted User'}</span>
                  </td>
                  <td data-label="Total" className="admin-orders__amount">
                    ₹{Number(order.totalAmount || 0).toFixed(2)}
                  </td>
                  <td data-label="Date">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td data-label="Status">
                    <select
                      aria-label={`Status for order ${order._id.substring(0, 8)}`}
                      className={`admin-orders__status admin-orders__status--${(order.status || 'Pending').toLowerCase()}`}
                      value={order.status || 'Pending'}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              )) : (
                <tr className="admin-orders__empty-row">
                  <td colSpan="5">
                    <div className="admin-orders__empty">
                      <span className="admin-orders__empty-icon" aria-hidden="true">—</span>
                      <strong>No orders yet</strong>
                      <span>New customer orders will appear here.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default AdminOrders;
