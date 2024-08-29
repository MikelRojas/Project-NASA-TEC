// NavBar.tsx
import React, { useEffect, useState } from "react";
import './NavBar.css';
import { setUserInfo, loadUserFromSessionStorage, getUserSettings } from "./userInfo";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appFirebase from "../credentials";

// Hook personalizado para manejar el tema
const useTheme = () => {
  const [theme, setTheme] = useState<string>(() => {
    // Intenta cargar el tema desde localStorage al iniciar
    return localStorage.getItem('theme') || 'dark';
  });

  // Actualiza el tema en localStorage cuando se cambie
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme] as const;
};

export const NavBar: React.FC<{}> = () => {
  const [userLog, setUserLog] = useState<boolean>(() => {
    const user = loadUserFromSessionStorage();
    return user !== null;
  });
  const [theme, setTheme] = useTheme();

  const [activeRoute] = useState(window.location.pathname);

  useEffect(() => {
    const auth = getAuth(appFirebase);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setUserInfo(user);
        setUserLog(true);
        const userSettings = getUserSettings();
        if (userSettings) {
          setTheme(userSettings.color || 'dark');
        }
      } else {
        setUserLog(false);
      }
    });

    return () => unsubscribe();
  }, [setTheme]);

  const navBarClass = theme === 'dark'
    ? 'navbar navbar-expand-lg navbar-dark bg-dark'
    : 'navbar navbar-expand-lg navbar-light bg-light';

  return (
    <nav className={navBarClass}>
      <a className="navbar-brand fs-2 fw-bold" href="/">
        <img src="/public/images/Logo.png" alt="Logo" className="navbar-logo" />
      </a>

      <div id='google_translate_e'></div>

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
          {userLog ? (
            <>
            <li><a className="dropdown-item" href="/myevents">My Events</a></li>
            <li><a className="dropdown-item" href="/Configuration">Profile and settings</a></li>
            </>
          ) : (
            <>
            <li><a className="dropdown-item" href="/login">Login</a></li>
            </>
          )}
        </ul>
      </li>
    </nav>
  );
};
