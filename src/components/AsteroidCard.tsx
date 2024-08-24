import React from 'react';
import { NearEarthObject } from '../common/interfaces';
import { FavoriteButton } from './FavoriteButton';
import { useNavigate } from 'react-router-dom';

interface AsteroidCardProps {
  asteroid: NearEarthObject;
}

const AsteroidCard: React.FC<AsteroidCardProps> = ({ asteroid }) => {
  const navigate = useNavigate();

  // Función para generar la URL del mapa
  const getFormattedSrc = () => {
    if (!asteroid.name) {
      console.error('Asteroid name is missing');
      return '';
    }

    // Intentar separar el ID y el nombre
    const match = asteroid.name.match(/(\d+)\s?\((.+)\)/);

    if (match) {
      const [_, asteroidId, asteroidName] = match;
      const formattedAsteroidName = asteroidName.toLowerCase().replace(/ /g, '_');
      return `https://eyes.nasa.gov/apps/asteroids/#/${asteroidId}_${formattedAsteroidName}`;
    } else {
      // Manejar nombres con formato simple
      const simpleMatch = asteroid.name.match(/\((.+)\)/);
      if (simpleMatch) {
        const asteroidName = simpleMatch[1];
        const formattedAsteroidName = asteroidName.toLowerCase().replace(/ /g, '_');
        return `https://eyes.nasa.gov/apps/asteroids/#/${formattedAsteroidName}`;
      }
      
      console.error('Asteroid name is not in the expected format:', asteroid.name);
      return ''; // URL de respaldo o un valor predeterminado
    }
  };

  const formattedSrc = getFormattedSrc();

  // Función para manejar el clic y redirigir
  const handleMoreInfoClick = () => {
    if (formattedSrc) {
      navigate(`/map?src=${encodeURIComponent(formattedSrc)}`);
    } else {
      console.warn('No valid URL format available');
    }
  };

  return (
    <div className="card asteroid-card text-center">
      <img 
        src="/images/asteroid.png" // URL de prueba de imagen
        className="card-img-top card-image" 
        alt={asteroid.name} 
      />
      <div className="card-body">
        <h3 className="card-title">{asteroid.name}</h3>
        <p className="card-text"><strong>Magnitude:</strong> {asteroid.absolute_magnitude_h}</p>
        <p className="card-text"><strong>Diameter:</strong> {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
        <p className="card-text"><strong>Hazardous:</strong> {asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
        {asteroid.close_approach_data.map((approach, index) => (
          <div key={index}>
            <p className="card-text"><strong>Close Approach Date:</strong> {approach.close_approach_date}</p>
            <p className="card-text"><strong>Velocity:</strong> {parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(2)} km/h</p>
            <p className="card-text"><strong>Miss Distance:</strong> {parseFloat(approach.miss_distance.kilometers).toFixed(2)} km</p>
          </div>
        ))}
        <button onClick={handleMoreInfoClick} className="btn btn-primary">More Info</button>
        <FavoriteButton event={asteroid} />
      </div>
    </div>
  );
};

export default AsteroidCard;
