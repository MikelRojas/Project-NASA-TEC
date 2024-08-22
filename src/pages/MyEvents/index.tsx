import React, { useEffect, useState } from 'react';
import './styles.css';
import { getEvets } from '../../common/userInfo';
import EclipseCard from '../../components/EclipseCard';
import AsteroidCard from '../../components/AsteroidCard';
import { EclipseData, NearEarthObject } from '../../common/interfaces';
import { FavoriteButton } from '../../components/FavoriteButton';

const MyEvents: React.FC = () => {
  const [events, setEvents] = useState<(EclipseData | NearEarthObject)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await getEvets();
      if (eventsData) {
        setEvents(eventsData);
      } else {
        setError("No events found.");
      }
    } catch (error) {
      setError("Error fetching events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(); // Llama a la función para obtener eventos
  }, []); // Ejecutar una vez al montar el componente

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container">
      <h1>Welcome to your Astronomy Events</h1>
      <div className='result-container'>
        <div className='row'>
          {events.map((event, index) => (
            'id' in event ? (
              <div className="col-md-3 mb-3" key={event.id}>
                <AsteroidCard asteroid={event} />
                {/* Agregar botón de favoritos en el componente de tarjeta */}
                <FavoriteButton event={event} />
              </div>
            ) : (
              <div className="col-md-3 mb-3" key={index}>
                <EclipseCard
                  startDate={event.date}
                  endDate={event.date}
                  type={event.type === 'solar' ? 'solar' : 'lunar'}
                />
                {/* Agregar botón de favoritos en el componente de tarjeta */}
                <FavoriteButton event={event} />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
