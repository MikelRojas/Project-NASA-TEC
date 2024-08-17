// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD29Q3ZflABW_k6Qk9k_DzgBKvTB4wMlA0",
    authDomain: "dbastronomy-321c6.firebaseapp.com",
    projectId: "dbastronomy-321c6",
    storageBucket: "dbastronomy-321c6.appspot.com",
    messagingSenderId: "1047530071409",
    appId: "1:1047530071409:web:56218f48c0b18d84aec2d0",
    measurementId: "G-8HKB29W77S"
  };
  
  // Initialize Firebase
  const appFirebase = initializeApp(firebaseConfig);
  const analytics = getAnalytics(appFirebase);


export const Login: React.FC<{}> = () =>{
    return(
        <div>

        </div>
    )
}