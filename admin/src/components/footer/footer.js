import React from 'react';
import './footer.css'

function Footer ()  {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          {/* Placeholder for logo */}
          <img src="logo.png" alt="Logo" />
        </div>
        <div className="footer-links">
          <ul className="footer-menu">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-text">© 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
