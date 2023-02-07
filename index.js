/**
 * @format
 */

// App setup
import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

// Firebase-config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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