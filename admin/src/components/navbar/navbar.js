import React from 'react';
import './navbar.css';
import icon from '../../assets/icon.png';
import logo from '../../assets/logo.png';
import Signoutbutton from '../signout/signoutbutton';


function Navbar ()  {
  return (
    <nav className="navbar">
      <img  alt="Logo" src={logo} className="logo" />
      <div className="company-names">
        <span className="company-name">Marine Marvel</span>

      </div>
      
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/cleanups" className="nav-link">CleanUps</a>
        </li>
        <li className="nav-item">
          <a href="/registrations" className="nav-link">Registrations</a>
        </li>
        <li className="nav-item">
          <a href="/latest" className="nav-link">Latest</a>
        </li>
        <li className="nav-item">
          <a href="/fundings" className="nav-link">Funding</a>
        </li>
        <li className="nav-item">
          <a href="/products" className="nav-link">Products</a>
        </li>
        <li className="nav-item">
          <a href="/admins" className="nav-link">Admins</a>
        </li>
      </ul>
      <Signoutbutton />


    </nav>
  );
}

export default Navbar;
