import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css';
import { useTranslation } from 'react-i18next';
import { getUserSettings, loadUserFromSessionStorage, setUserInfo, useTheme } from "../../common/userInfo";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appFirebase from '../../credentials'; 

export const AsteroidMap: React.FC = () => {
  const [t] = useTranslation("global");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const src = queryParams.get('src') || 'https://eyes.nasa.gov/apps/asteroids/'; // Valor por defecto si no hay parámetro
  const [userLog, setUserLog] = useState<boolean>(() => {
    const user = loadUserFromSessionStorage();
    return user !== null;
  });
  const [theme, setTheme] = useTheme();

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

  const stylesMap= theme === 'dark'
  ? 'map-container'
  : 'map-container-light';

  return (
    <div className={stylesMap}>
      <h1>{t("header.Interactive")}</h1>
      <p className="map-description">
        {t("header.Map_text")}
      </p>
      <div className="map-iframe-container">
        <iframe src={src} width="100%" height="600px" className="map-iframe" title="Interactive Map"></iframe>
      </div>
    </div>
  );
};
