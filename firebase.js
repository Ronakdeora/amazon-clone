// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { getAuth } from "firebase/auth";


const firebaseConfig = {

    apiKey: "AIzaSyCRVDFK6VamJ0l3rJRhTlSl1m3QSNOt5mA",
  
    authDomain: "clone-938a5.firebaseapp.com",
  
    projectId: "clone-938a5",
  
    storageBucket: "clone-938a5.appspot.com",
  
    messagingSenderId: "252747572052",
  
    appId: "1:252747572052:web:922021266fc910b4b61ec1",
  
    measurementId: "${config.measurementId}"
  
  };

 const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore()
  const auth = getAuth();
  // this give us a variable that we can use to handle all the signing in and all

  export {db , auth};