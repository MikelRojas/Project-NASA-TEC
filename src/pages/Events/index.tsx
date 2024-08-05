import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const API_KEY = 'yeJaLCwvDvU82jsntYaXj1mzz8BiMt5Q3CsZXfoJ';

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

const isComet = (name: string): boolean => {
  return name.startsWith("C/") || name.startsWith("P/") || name.includes("Comet");
};

export const Events: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('2024-08-01');
  const [endDate, setEndDate] = useState<string>('2024-08-07');
  const [asteroidsAndComets, setAsteroidsAndComets] = useState<NearEarthObject[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('Asteroids and Comets');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setHasMoreResults(false);
      try {
        // Dividir el rango de fechas en bloques de 7 días
        const results: NearEarthObject[] = [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        const oneWeek = 7 * 24 * 60 * 60 * 1000; // Milisegundos en una semana

        for (let currentStart = start; currentStart < end; currentStart = new Date(currentStart.getTime() + oneWeek)) {
          const currentEnd = new Date(currentStart.getTime() + oneWeek);
          if (currentEnd > end) {
            currentEnd.setTime(end.getTime());
          }
          const response = await axios.get(
            `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentStart.toISOString().split('T')[0]}&end_date=${currentEnd.toISOString().split('T')[0]}&api_key=${API_KEY}`
          );
          const near_earth_objects = response.data.near_earth_objects;
          for (const date in near_earth_objects) {
            near_earth_objects[date].forEach((obj: NearEarthObject) => {
              results.push(obj);
            });
          }
        }
        
        // Filtrar y limitar resultados
        const filteredResults = results.filter(obj => isComet(obj.name) || !isComet(obj.name));
        setAsteroidsAndComets(filteredResults.slice(0, 30));
        if (filteredResults.length > 30) {
          setHasMoreResults(true);
        }
      } catch (err) {
        setError(`Error fetching data from NASA API: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const handleEventSelection = (event: string) => {
    setSelectedEvent(event);
  };

  return (
    <div className="events-container">
      <h1>Upcoming Events</h1>
      <div className="date-inputs">
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>
      <h2>Select Event: </h2>
      <div className="event-buttons">
        <button
          className={`event-button ${selectedEvent === 'Asteroids and Comets' ? 'active' : ''}`}
          onClick={() => handleEventSelection('Asteroids and Comets')}
        >
          Asteroids and Comets
        </button>
        <button
          className={`event-button ${selectedEvent === 'Solar Eclipses' ? 'active' : ''}`}
          onClick={() => handleEventSelection('Solar Eclipses')}
        >
          Solar Eclipses
        </button>
        <button
          className={`event-button ${selectedEvent === 'Lunar Eclipses' ? 'active' : ''}`}
          onClick={() => handleEventSelection('Lunar Eclipses')}
        >
          Lunar Eclipses
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : selectedEvent === 'Asteroids and Comets' ? (
        <div className="events-list">
          <h2>Asteroids and Comets</h2>
          {asteroidsAndComets.map((object) => (
            <div key={object.id} className="event-card">
              <h3>{object.name}</h3>
              <p><strong>Magnitude:</strong> {object.absolute_magnitude_h}</p>
              <p><strong>Diameter:</strong> {object.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {object.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
              <p><strong>Hazardous:</strong> {object.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
              {object.close_approach_data.map((approach, index) => (
                <div key={index}>
                  <p><strong>Close Approach Date:</strong> {approach.close_approach_date}</p>
                  <p><strong>Velocity:</strong> {parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(2)} km/h</p>
                  <p><strong>Miss Distance:</strong> {parseFloat(approach.miss_distance.kilometers).toFixed(2)} km</p>
                </div>
              ))}
              <a href={object.nasa_jpl_url} target="_blank" rel="noopener noreferrer">More Info</a>
            </div>
          ))}
          {hasMoreResults && <p>Para ver más resultados debe poner una fecha más exacta.</p>}
        </div>
      ) : (
        <div className="events-list">
          <h2>{selectedEvent}</h2>
          {/* Aquí puedes agregar lógica para manejar los otros tipos de eventos */}
        </div>
      )}
    </div>
  );
};
