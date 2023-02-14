// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqzA-PQj0UpBatFePV1NfWZBmG3vhkxF0",
  authDomain: "treningsappen-9355c.firebaseapp.com",
  projectId: "treningsappen-9355c",
  storageBucket: "treningsappen-9355c.appspot.com",
  messagingSenderId: "811216156749",
  appId: "1:811216156749:web:dfc7c2a8f23e6fdacf8404"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
export { auth };

const db = getFirestore(app);
export { db };