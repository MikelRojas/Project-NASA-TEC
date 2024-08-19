import React, { useEffect, useState } from "react";
import './NavBar.css';
import {setUserInfo } from "./userInfo";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appFirebase from "../credentials";

export const NavBar: React.FC<{}> = () => {
  const[userLog,setUserLog] = useState(false);
  const [activeRoute] = useState(window.location.pathname);
  
  useEffect(() => {
    const auth = getAuth(appFirebase);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setUserInfo(user);
        setUserLog(true);
      } else {
        setUserLog(false);
      }
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand fs-2 fw-bold" href="/">
        <img src="/public/images/Logo.png" alt="Logo" className="navbar-logo" />
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
        <ul className="navbar-nav fs-3 fw-bold">
          <li className="nav-item">
            <a className={`nav-link ${activeRoute === "/" ? "active" : ""}`} href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeRoute === "/picture" ? "active" : ""}`} href="/picture">
              Imagen of the day
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${activeRoute === "/events" ? "active" : ""}`} href="/events">
              Eclipses/Asteroids
            </a>
          </li> 
          <li className="nav-item">
            <a className={`nav-link ${activeRoute === "/map" ? "active" : ""}`} href="/map">
              Universe
            </a>
          </li>
        </ul>
      </div>
      <li className="nav-item dropdown">
        <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Options
        </button>
        <ul className="dropdown-menu dropdown-menu-dark">
          {userLog ?(
            <>
            <li><a className="dropdown-item" href="#">My Events</a></li>
            <li><a className="dropdown-item" href="/Configuration">Profile and settings</a></li>
            </>
          ):(
            <>
            <li><a className="dropdown-item" href="/login">Login</a></li>
            </>
          )}
        </ul>
      </li>
    </nav>
  );
};
