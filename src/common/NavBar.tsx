import React from "react";


export const NavBar: React.FC<{}> = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" style={{ marginLeft: '12px' }} href="/">NASA</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/picture">Astronomy Picture</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Events</a>
          </li> 
          <li className="nav-item">
            <a className="nav-link" href="/map">Map</a>
          </li> 
        </ul>
      </div>
    </nav>
  );
};
