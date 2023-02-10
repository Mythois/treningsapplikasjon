// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
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
let app;
if (firebase.apps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
export { auth };