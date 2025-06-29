import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">NotePad</a>
        <div className="navbar-nav">
          <a className="nav-link" href="#">Profile</a>
          <a className="nav-link" href="#">Login</a>
          <a className="nav-link" href="#">Register</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;