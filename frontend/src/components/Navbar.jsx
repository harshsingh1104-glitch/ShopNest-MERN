import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/shop${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="/ShopNestLogo.png" alt="" />
          ShopNest
        </Link>
      </div>
      <form className="navbar-search" role="search" onSubmit={handleSearch}>
        <label className="sr-only" htmlFor="site-search">Search products</label>
        <input
          id="site-search"
          type="search"
          placeholder="Search products and brands"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" strokeWidth="1.8" />
            <path d="m15.5 15.5 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </form>
      <ul className="navbar-links">
        <li><Link to="/shop">Shop</Link></li>
        <li>
          <Link to="/cart" className="navbar-cart">
            Cart <span className="navbar-cart-count">{cartCount}</span>
          </Link>
        </li>
        {user ? (
          <>
            <li><Link to="/profile" className="navbar-account">{user.name}</Link></li>
            {['admin', 'productManager'].includes(user.role) && <li><Link to="/admin">{user.role === 'admin' ? 'Admin' : 'Products'}</Link></li>}
            <li className="navbar-logout"><button onClick={handleLogout} className="btn-logout">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
