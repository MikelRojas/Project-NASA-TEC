import { User } from 'firebase/auth';
import { UserInfo, EclipseData, NearEarthObject,UserSettings} from './interfaces';
import { getFirestore, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import appFirebase from '../credentials';
import { useEffect, useState } from 'react';


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
          selectedEvents: userData.selectedEvents || [],
          settings: userData.settings || {language:"en",color:"dark"}
        };
      } else {
        currentUser = {
          name: user.displayName || "",
          email: email,
          selectedEvents: [],
          settings:{language:"en",color:"dark"}
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




export const setColor = async (color: string) => {
  if (currentUser) {
    currentUser.settings.color = color;
    saveUserToSessionStorage(currentUser);

    const firestore = getFirestore(appFirebase);
    const userDocRef = doc(firestore, "users", currentUser.email);

    try {
      await updateDoc(userDocRef, {
        "settings.color": color
      });
      console.log("Color updated successfully");
    } catch (error) {
      console.error("Error updating color: ", error);
    }
  }
};

export const setLanguage = async (language: string) => {
  if (currentUser) {
    currentUser.settings.language = language;
    saveUserToSessionStorage(currentUser);

    const firestore = getFirestore(appFirebase);
    const userDocRef = doc(firestore, "users", currentUser.email);

    try {
      await updateDoc(userDocRef, {
        "settings.language": language
      });
      console.log("Language updated successfully");
    } catch (error) {
      console.error("Error updating language: ", error);
    }
  }
};

export const getUserSettings = (): UserSettings | undefined => {
  return currentUser?.settings;
};

export const useTheme = () => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, setTheme] as const;
};  