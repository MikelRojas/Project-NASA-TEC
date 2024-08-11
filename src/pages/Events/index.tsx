import { useEffect, useState } from 'react';
import { EclipseCard } from '../../components/EclipseCard';
import AsteroidCard from '../../components/AsteroidCard';
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
  const [startDate, setStartDate] = useState<Date>(new Date('2024-08-01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2026-08-07'));
  const [selectedEvent, setSelectedEvent] = useState<string>('Asteroids and Comets');
  const [eclipseType, setEclipseType] = useState<'solar' | 'lunar'>('solar');
  const [asteroidsAndComets, setAsteroidsAndComets] = useState<NearEarthObject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMoreResults, setHasMoreResults] = useState<boolean>(false);

  const handleEventSelection = (event: string) => {
    setSelectedEvent(event);
    if (event === 'Solar Eclipses') {
      setEclipseType('solar');
    } else if (event === 'Lunar Eclipses') {
      setEclipseType('lunar');
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    if (newStartDate < minDate) {
      alert('Start date cannot be earlier than 01-01-1901.');
    } else if (newStartDate > endDate) {
      alert('Start date cannot be later than end date.');
    } else {
      setStartDate(newStartDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(e.target.value);
    if (newEndDate > maxDate) {
      alert('End date cannot be later than 01-12-2070.');
    } else if (newEndDate < startDate) {
      alert('End date cannot be earlier than start date.');
    } else {
      setEndDate(newEndDate);
    }
  };

  const fetchAsteroidsAndComets = async () => {
    setLoading(true);
    setError(null);
    setHasMoreResults(false);
    try {
      const results: NearEarthObject[] = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      const oneWeek = 7 * 24 * 60 * 60 * 1000; // Milisegundos en una semana

      // Verifica si el rango de fechas es mayor a 6 meses
      if ((end.getTime() - start.getTime()) > 6 * 30 * 24 * 60 * 60 * 1000) {
        setError('Select dates within a 6-month range to view asteroid results');
        setLoading(false);
        return;
      }

      for (let currentStart = start; currentStart < end; currentStart = new Date(currentStart.getTime() + oneWeek)) {
        const currentEnd = new Date(currentStart.getTime() + oneWeek);
        if (currentEnd > end) {
          currentEnd.setTime(end.getTime());
        }
        const response = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentStart.toISOString().split('T')[0]}&end_date=${currentEnd.toISOString().split('T')[0]}&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching data from NASA API: ${response.statusText}`);
        }
        const data = await response.json();
        const near_earth_objects = data.near_earth_objects;
        for (const date in near_earth_objects) {
          near_earth_objects[date].forEach((obj: NearEarthObject) => {
            results.push(obj);
          });
        }
      }

      // Filtrar y limitar resultados
      const limitedResults = results.slice(0, 30);
      setAsteroidsAndComets(limitedResults);
      setHasMoreResults(results.length > 30);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error fetching data: ${err.message}`);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedEvent === 'Asteroids and Comets') {
      fetchAsteroidsAndComets();
    }
  }, [startDate, endDate, selectedEvent]);

  const minDate = new Date("1901-01-01");
  const maxDate = new Date("2070-12-01");

  return (
    <div className="bg-image img-fluid">
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <h1>Upcoming Events</h1>
        <div className="date-inputs">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate.toISOString().split('T')[0]}
              onChange={handleStartDateChange}
              min={minDate.toISOString().split('T')[0]}
              max={maxDate.toISOString().split('T')[0]}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate.toISOString().split('T')[0]}
              onChange={handleEndDateChange}
              min={minDate.toISOString().split('T')[0]}
              max={maxDate.toISOString().split('T')[0]}
            />
          </label>
        </div>
        <h2>Select Event:</h2>
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
        <div className='result-container'>
          {selectedEvent === 'Solar Eclipses' || selectedEvent === 'Lunar Eclipses' ? (
            <EclipseCard
              startDate={startDate.toISOString().split('T')[0]}
              endDate={endDate.toISOString().split('T')[0]}
              type={eclipseType}
            />
          ) : selectedEvent === 'Asteroids and Comets' ? (
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <div className="events-list">
                  {asteroidsAndComets.map((asteroid) => (
                    <AsteroidCard key={asteroid.id} asteroid={asteroid} />
                  ))}
                  {hasMoreResults && <p>To see more results you must select closer dates.</p>}
                </div>
              )}
            </div>
          ) : (
            <div>No data available for {selectedEvent}.</div>
          )}
        </div>
      </div>
    </div>
  );
};
