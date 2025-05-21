// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB09dB1RaphtVTAx16wzGZ1kyCIaNLFcs4",
  authDomain: "personal-application-data.firebaseapp.com",
  databaseURL: "https://personal-application-data-default-rtdb.firebaseio.com",
  projectId: "personal-application-data",
  storageBucket: "personal-application-data.appspot.com",
  messagingSenderId: "1028879529241",
  appId: "1:1028879529241:web:964cb1149902b1dc3ac188",
  measurementId: "G-TQQD3Z8HXK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
