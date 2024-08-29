import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css';

export const AsteroidMap: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const src = queryParams.get('src') || 'https://eyes.nasa.gov/apps/asteroids/'; // Valor por defecto si no hay parámetro

  return (
    <div className="map-container">
      <h1 className='title'>Interactive Map</h1>
      <p className="map-description">
        Explore the interactive map to discover celestial bodies and their positions in the universe. Click on planets or other objects to learn more about them.
      </p>
      <div className="map-iframe-container">
        <iframe src={src} width="100%" height="600px" className="map-iframe" title="Interactive Map"></iframe>
      </div>
    </div>
  );
};
