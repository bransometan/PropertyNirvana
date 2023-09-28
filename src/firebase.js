// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9CBOoRrDF9dQjnvQGm_pCRzscP-0BjuA",
  authDomain: "propertynirvana-82d24.firebaseapp.com",
  projectId: "propertynirvana-82d24",
  storageBucket: "propertynirvana-82d24.appspot.com",
  messagingSenderId: "797564141982",
  appId: "1:797564141982:web:929d5b32aae0624b36968f",
  measurementId: "G-D9MBZCV42F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initialize firebase auth
const auth = getAuth();

export { app, auth };
