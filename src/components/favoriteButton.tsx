import { useEffect, useState } from 'react';
import { EclipseData, NearEarthObject } from '../common/interfaces';
import './FavoriteButton.css';
import { addSelectedEvent, getEvets, removeSelectedEvent } from '../common/userInfo';

interface Event {
  event: EclipseData | NearEarthObject;
}

export const FavoriteButton: React.FC<Event> = ({ event }) => {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null); // Inicialmente null para indicar carga

  const checkIfFavorite = async () => {
    const myEvents = await getEvets(); // Asegúrate de que getEvets() devuelva una promesa
    if (myEvents) {
      const isFav = myEvents.some(temEvent =>
        ('id' in temEvent && 'id' in event && temEvent.id === event.id) ||
        ('date' in temEvent && 'date' in event && temEvent.date === event.date)
      );
      setIsFavorite(isFav);
    }
  };

  useEffect(() => {
    checkIfFavorite(); // Verifica si el evento está en la lista cuando el componente se monta
  }, [event]);

  const handleAddEvent = async () => {
    await addSelectedEvent(event);
    checkIfFavorite(); // Verifica si el evento está en la lista después de agregarlo
  };

  const handleRemoveEvent = async () => {
    await removeSelectedEvent(event);
    checkIfFavorite(); // Verifica si el evento está en la lista después de eliminarlo
  };

  // Mientras `isFavorite` sea `null`, puedes mostrar un estado de carga o nada
  if (isFavorite === null) {
    checkIfFavorite();
  }

  return (
    <>
      {isFavorite ? (
        <button className="image-button" onClick={handleRemoveEvent}>
          <img src="/images/red_heart.png" alt="Remove from Favorites" />
        </button>
      ) : (
        <button className="image-button" onClick={handleAddEvent}>
          <img src="/images/gray_heart.png" alt="Add to Favorites" />
        </button>
      )}
    </>
  );
};
