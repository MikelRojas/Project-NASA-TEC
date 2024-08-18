import { initializeApp } from "firebase/app";



const firebaseConfig = {
    apiKey: "AIzaSyD29Q3ZflABW_k6Qk9k_DzgBKvTB4wMlA0",
    authDomain: "dbastronomy-321c6.firebaseapp.com",
    projectId: "dbastronomy-321c6",
    storageBucket: "dbastronomy-321c6.appspot.com",
    messagingSenderId: "1047530071409",
    appId: "1:1047530071409:web:56218f48c0b18d84aec2d0",
    measurementId: "G-8HKB29W77S"
  };

  const appFirebase = initializeApp(firebaseConfig);
  export default appFirebase;