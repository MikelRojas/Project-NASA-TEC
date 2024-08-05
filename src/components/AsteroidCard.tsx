import React from 'react';

interface NearEarthObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }>;
}

interface AsteroidCardProps {
  asteroid: NearEarthObject;
}

const AsteroidCard: React.FC<AsteroidCardProps> = ({ asteroid }) => {
  return (
    <div className="event-card">
      <h3>{asteroid.name}</h3>
      <p><strong>Magnitude:</strong> {asteroid.absolute_magnitude_h}</p>
      <p><strong>Diameter:</strong> {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
      <p><strong>Hazardous:</strong> {asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
      {asteroid.close_approach_data.map((approach, index) => (
        <div key={index}>
          <p><strong>Close Approach Date:</strong> {approach.close_approach_date}</p>
          <p><strong>Velocity:</strong> {parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(2)} km/h</p>
          <p><strong>Miss Distance:</strong> {parseFloat(approach.miss_distance.kilometers).toFixed(2)} km</p>
        </div>
      ))}
      <a href={asteroid.nasa_jpl_url} target="_blank" rel="noopener noreferrer">More Info</a>
    </div>
  );
};

export default AsteroidCard;
