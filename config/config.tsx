// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz4dXRh-JNkkz-aPLsItiZHN3W5a7nXF0",
  authDomain: "prueba-7218c.firebaseapp.com",
  projectId: "prueba-7218c",
  storageBucket: "prueba-7218c.appspot.com",
  messagingSenderId: "635825652852",
  appId: "1:635825652852:web:5911fc6b971697a71bfd21",
  measurementId: "G-0KYL0LWXJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);


// Initialize Database and Storage
export const db = getDatabase(app);
export const storage = getStorage(app);