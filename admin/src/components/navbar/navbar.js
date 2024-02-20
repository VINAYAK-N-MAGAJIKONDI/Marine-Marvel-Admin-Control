import React, { useState } from 'react';
import './navbar.css'; 
function Navbar  ()  {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`hightech-navbar ${isOpen ? 'open' : ''}`}>
      <div className="hightech-navbar-container">
        <div className="hightech-navbar-brand">
          <a href="/">Your Logo</a>
        </div>
        <button className="hightech-navbar-toggle" onClick={toggleNavbar}>
          <span className="hightech-navbar-toggle-icon"></span>
        </button>
        <div className={`hightech-navbar-links ${isOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
