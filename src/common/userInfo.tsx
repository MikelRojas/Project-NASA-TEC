import { User } from 'firebase/auth';
import { UserInfo, EclipseData, NearEarthObject } from './interfaces';
import { getFirestore, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import appFirebase from '../credentials';


// Función para cargar currentUser desde sessionStorage
export const loadUserFromSessionStorage = (): UserInfo | null => {
  const userJson = sessionStorage.getItem('currentUser');
  if (userJson) {
    return JSON.parse(userJson) as UserInfo;
  }
  return null;
};

export let currentUser: UserInfo | null = loadUserFromSessionStorage();


// Función para guardar currentUser en sessionStorage
export const saveUserToSessionStorage = (user: UserInfo | null) => {
  if (user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    sessionStorage.removeItem('currentUser');
  }
};

export const setUserInfo = async (user: User | null) => {
  const firestore = getFirestore(appFirebase);
  if (user) {
    // Verificar que el email no sea nulo
    const email = user.email;
    if (email) {
      const userDoc = await getDoc(doc(firestore, "users", email));
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserInfo;
        currentUser = {
          name: user.displayName || "",
          email: email,
          selectedEvents: userData.selectedEvents || []
        };
      } else {
        currentUser = {
          name: user.displayName || "",
          email: email,
          selectedEvents: []
        };
        await setDoc(doc(firestore, "users", email), currentUser); // Crear documento si no existe
      }
      saveUserToSessionStorage(currentUser); // Guardar en sessionStorage después de actualizar currentUser
      console.log(currentUser);
    } else {
      console.error("User email is null");
    }
  } else {
    currentUser = null;
    saveUserToSessionStorage(currentUser); // Remover de sessionStorage si user es null
  }
};

export const addSelectedEvent = async (event: EclipseData | NearEarthObject) => {
  if (currentUser) {
    const firestore = getFirestore(appFirebase);
    const userDocRef = doc(firestore, "users", currentUser.email);

    try {
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          name: currentUser.name,
          email: currentUser.email,
          selectedEvents: []
        });
      }

      currentUser.selectedEvents.push(event);
      await updateDoc(userDocRef, {
        selectedEvents: currentUser.selectedEvents
      });

      saveUserToSessionStorage(currentUser); // Guardar en sessionStorage después de actualizar selectedEvents
      console.log("Event added successfully");
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  }
};

export const removeSelectedEvent = async (event: EclipseData | NearEarthObject) => {
  if (currentUser) {
    const firestore = getFirestore(appFirebase);
    const userDocRef = doc(firestore, "users", currentUser.email);

    try {
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const updatedEvents = currentUser.selectedEvents.filter(
          (e) => {
            if ('id' in event) {
              return 'id' in e ? e.id !== event.id : true;
            } else {
              return 'type' in e 
                ? e.type !== event.type || e.date !== event.date || e.hour !== event.hour || e.mode !== event.mode || e.places !== event.places
                : true;
            }
          }
        );

        currentUser.selectedEvents = updatedEvents;
        await updateDoc(userDocRef, {
          selectedEvents: updatedEvents
        });

        saveUserToSessionStorage(currentUser); // Guardar en sessionStorage después de actualizar selectedEvents
        console.log("Event removed successfully");
      } else {
        console.error("User document does not exist, cannot remove event");
      }
    } catch (error) {
      console.error("Error removing event: ", error);
    }
  }
};

export const getUserInfo = (): UserInfo | null => {
  return currentUser;
};

export const getEvets = async (): Promise<Array<EclipseData | NearEarthObject> | undefined> => {
  if (currentUser) {
    console.log(currentUser.selectedEvents);
    return currentUser.selectedEvents; // Asegúrate de que esta línea devuelve los datos correctamente
  }
  return undefined;
};




/*export const setUserSettings = (settings: UserSettings) => {
  if (currentUser) {
    currentUser.settings = settings;
  }
};

export const getUserSettings = (): UserSettings | null => {
  return currentUser ? currentUser.settings : null;
};
*/
