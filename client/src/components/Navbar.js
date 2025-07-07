import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NotePad</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/profile">Profile</Link>
          <Link className="nav-link" to="/">Login</Link>
          <Link className="nav-link" to="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
