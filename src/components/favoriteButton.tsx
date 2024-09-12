import React, { useEffect, useState } from 'react';
import { EclipseData, NearEarthObject } from '../common/interfaces';
import './FavoriteButton.css';
import { addSelectedEvent, getEvets, removeSelectedEvent, getUserInfo } from '../common/userInfo';
import { PopupMessage } from './PopupMessage';

interface Event {
  event: EclipseData | NearEarthObject;
}

export const FavoriteButton: React.FC<Event> = ({ event }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Función para verificar si el evento es favorito
  const checkIfFavorite = async () => {
    try {
      const myEvents = await getEvets();
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
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    checkIfFavorite(); // Verifica si el evento está en la lista cuando el componente se monta
  }, [event]);

  const handleAddEvent = async () => {
    const user = getUserInfo();
    if (user) {
      await addSelectedEvent(event);
      checkIfFavorite(); // Verifica si el evento está en la lista después de agregarlo
    } else {
      setPopupMessage("To add an event to favorites, you must be registered.");
      setShowPopup(true);
    }
  };

  const handleRemoveEvent = async () => {
    if (getUserInfo()) {
      await removeSelectedEvent(event);
      checkIfFavorite(); // Verifica si el evento está en la lista después de eliminarlo
    } else {
      setPopupMessage("To remove an event from favorites, you must be registered.");
      setShowPopup(true);
    }
  };

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
      {showPopup && popupMessage && (
        <PopupMessage
          title="Action Required"
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};
