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
    <div className="card asteroid-card">
      <img 
        src="https://caracol.com.co/resizer/v2/https%3A%2F%2Fcloudfront-us-east-1.images.arcpublishing.com%2Fprisaradioco%2FOHNJXRQLYJLHZLMEKMXHA3YZRM.jpg?auth=50d754196a47c74f4337ad5350819e0b422a0cda87b6917a46710c602c5a3202&height=624&width=1080&quality=70&smart=true" // URL de prueba de imagen
        className="card-img-top" 
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
      </div>
    </div>
  );
};

export default AsteroidCard;
