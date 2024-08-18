// Info and users: user info, event list

import { User } from 'firebase/auth';
import { UserInfo, EclipseData, NearEarthObject, UserSettings } from './interfaces';

export let currentUser: UserInfo | null = null;

export const setUserInfo = (user: User| null) => {
  if(user){
    currentUser =  {
      name: user.displayName || "", // Maneja el caso en que displayName pueda ser null
      email: user.email || "", // Maneja el caso en que email pueda ser null
    };
  }else{
    currentUser = null;
  }
  
};

export const transformUserToUserInfo = (user: User): UserInfo => {
  return {
    name: user.displayName || "", // Maneja el caso en que displayName pueda ser null
    email: user.email || "", // Maneja el caso en que email pueda ser null
  };
}


export const getUserInfo = (): UserInfo | null => {
  return currentUser;
};

//export const addSelectedEvent = (event: EclipseData | NearEarthObject) => {
  //if (currentUser) {
   // currentUser.selectedEvents.push(event);
  //}
//};

//export const setUserSettings = (settings: UserSettings) => {
  //if (currentUser) {
    //currentUser.settings = settings;
  //}
//};

//export const getUserSettings = (): UserSettings | null => {
  //return currentUser ? currentUser.settings : null;
//};
//
