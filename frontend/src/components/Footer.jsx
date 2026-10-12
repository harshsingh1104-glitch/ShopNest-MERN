import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <h3>ShopNest<span>.</span></h3>
          <p>Good finds for your everyday.</p>
        </div>

        <nav className="site-footer__links" aria-label="Footer">
          <Link to="/about">About Us</Link>
          <Link to="/return">Return Policy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </nav>

        <div className="site-footer__copyright">
          &copy; {new Date().getFullYear()} ShopNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
