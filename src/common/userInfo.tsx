// Info and users: user info, event list

import { User } from 'firebase/auth';
import { UserInfo, EclipseData, NearEarthObject, UserSettings } from './interfaces';
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import appFirebase from '../credentials';

export let currentUser: UserInfo | null = null;

export const setUserInfo = async (user: User | null) => {
  const firestore = getFirestore(appFirebase);
  if (user) {
    const userDoc = await getDoc(doc(firestore, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserInfo;
      currentUser = {
        name: user.displayName || "",
        email: user.email || "",
        selectedEvents: userData.selectedEvents || []
      };
    } else {
      currentUser = {
        name: user.displayName || "",
        email: user.email || "",
        selectedEvents: []
      };
    }
    console.log(currentUser);
  } else {
    currentUser = null;
  }
};

export const addSelectedEvent = async (event: EclipseData | NearEarthObject) => {
  if (currentUser) {
    currentUser.selectedEvents.push(event);
    const firestore = getFirestore(appFirebase);
    const userDocRef = doc(firestore, "users", currentUser.email);
    try {
      await updateDoc(userDocRef, {
        selectedEvents: currentUser.selectedEvents
      });
      console.log("Event added successfully");
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  }
};

export const getUserInfo = (): UserInfo | null => {
  return currentUser;
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
