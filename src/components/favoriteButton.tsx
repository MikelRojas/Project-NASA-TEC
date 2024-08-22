import { useEffect, useState } from 'react';
import { EclipseData, NearEarthObject } from '../common/interfaces';
import './FavoriteButton.css';
import { addSelectedEvent, getEvets, removeSelectedEvent } from '../common/userInfo';

interface Event {
  event: EclipseData | NearEarthObject;
}

export const FavoriteButton: React.FC<Event> = ({ event }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false); // Inicialmente false

  // Función para verificar si el evento es favorito
  const checkIfFavorite = async () => {
    try {
      const myEvents = await getEvets(); // Asegúrate de que getEvets() devuelva una promesa
      if (myEvents) {
        const isFav = myEvents.some(temEvent =>
          ('id' in temEvent && 'id' in event && temEvent.id === event.id) ||
          ('date' in temEvent && 'date' in event && temEvent.date === event.date)
        );
        setIsFavorite(isFav);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error checking if event is favorite: ", error);
      setIsFavorite(false); // En caso de error, considera que el evento no es favorito
    }
  };

  // Ejecutar checkIfFavorite cuando el componente se monta o 'event' cambia
  useEffect(() => {
    checkIfFavorite(); // Verifica si el evento está en la lista cuando el componente se monta
  }, [event]); // Dependencia en 'event' asegura que se vuelve a ejecutar si 'event' cambia

  const handleAddEvent = async () => {
    await addSelectedEvent(event);
    checkIfFavorite(); // Verifica si el evento está en la lista después de agregarlo
  };

  const handleRemoveEvent = async () => {
    await removeSelectedEvent(event);
    checkIfFavorite(); // Verifica si el evento está en la lista después de eliminarlo
  };

 

  // Mientras `isFavorite` sea false, puedes mostrar el botón adecuado
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
