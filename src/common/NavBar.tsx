import React from "react";
import './NavBar.css';

export const NavBar: React.FC<{}> = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand fs-2 fw-bold" href="/">NASA</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
        <ul className="navbar-nav fs-3 fw-bold">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/picture">Astronomy-Picture</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/events">Events</a>
          </li> 
          <li className="nav-item">
            <a className="nav-link" href="/map">Map</a>
          </li> 
          
        </ul>
      </div>
      <li className="nav-item dropdown">
        <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Profile
        </button>
        <ul className="dropdown-menu dropdown-menu-dark">
          <li><a className="dropdown-item" href="#">Login</a></li>
          <li><a className="dropdown-item" href="#">My Events</a></li>
          <li><a className="dropdown-item" href="#">Personalization</a></li>
        </ul>
      </li>
    </nav>
  );
};
