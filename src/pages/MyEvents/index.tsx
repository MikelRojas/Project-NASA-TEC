import React, { useEffect, useState } from 'react';
import './styles.css';
import { getEvets } from '../../common/userInfo';
import { GenerateEclipses } from '../../components/EclipseCard';
import AsteroidCard from '../../components/AsteroidCard';
import { EclipseData, NearEarthObject } from '../../common/interfaces';

const MyEvents: React.FC = () => {
  const [events, setEvents] = useState<(EclipseData | NearEarthObject)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const eventsData = await getEvets();
      console.log(`La repuesta es: ${eventsData}`);
      if (eventsData) {
        console.log("Si entra al if");
        setEvents(eventsData);
      } else {
        setError("No events found.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(); // Llama a la función para obtener eventos
  }, []); // Ejecutar una vez al montar el componente

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Welcome to your Astronomy Events</h1>
      <div className='result-container'>
        <div className='row'>
          {events.map((event, index) => (
            'id' in event ? (
              <div className="col-md-3 mb-3" key={event.id}>
                <AsteroidCard asteroid={event} />
              </div>
            ) : (
              <div className="col-md-3 mb-3" key={index}>
                <GenerateEclipses eclipse={event} />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
