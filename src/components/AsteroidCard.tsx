import React from 'react';
import FavoriteButton from './FavoriteButton';
import {NearEarthObject } from '../common/interfaces';

interface AsteroidCardProps {
  asteroid: NearEarthObject;
}

const AsteroidCard: React.FC<AsteroidCardProps> = ({ asteroid }) => {
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
        <a href={asteroid.nasa_jpl_url} target="_blank" rel="noopener noreferrer" className="card-link">More Info</a>
        <FavoriteButton></FavoriteButton>
      </div>
    </div>
  );
};

export default AsteroidCard;
