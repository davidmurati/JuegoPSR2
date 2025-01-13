import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
     
      <ul>
        <li><a href="/" exact>Menu</a></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;