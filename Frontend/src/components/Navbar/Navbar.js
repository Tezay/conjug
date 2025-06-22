import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Conjug.fr</Link>
      <ul className="nav-links">
        <li><Link to="/conjugaison">Conjugaison</Link></li>
        <li><Link to="/leaderboard">Classement</Link></li>
        <li><Link to="/login">Connexion</Link></li>
        <li><Link to="/register">Inscription</Link></li>
        <li><Link to="/profile">Profil</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
