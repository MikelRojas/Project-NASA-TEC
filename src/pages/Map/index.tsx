import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css';
import { useTranslation } from 'react-i18next'; 

export const AsteroidMap: React.FC = () => {
  const [t] = useTranslation("global");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const src = queryParams.get('src') || 'https://eyes.nasa.gov/apps/asteroids/'; // Valor por defecto si no hay parámetro

  return (
    <div className="map-container">
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
