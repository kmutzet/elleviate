import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css'; 

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link to="/" className="navbar-logo">Elleviate</Link>
        <Link to="/find-doctor" className="active-button">Find a Doctor</Link>
        <Link to="/about-us" className="active-button">About Us</Link>
      </div>
    </div>
  );
}

export default Navbar;
