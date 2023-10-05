// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2jJzzsIhwNRTMvMJ-dBi6rIWNUXvyUys",
  authDomain: "vom-customers-crud.firebaseapp.com",
  projectId: "vom-customers-crud",
  storageBucket: "vom-customers-crud.appspot.com",
  messagingSenderId: "72531176239",
  appId: "1:72531176239:web:2c5bb621bd1b4b2636cfda",
  measurementId: "G-VXJMR4L25M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore(app)

export { 
    db 
}
