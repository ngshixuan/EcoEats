// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage"
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhzPOnUsEW5rXtAzj3DCpVWaqqvN_ePL8",
  authDomain: "ecoeats-9b2aa.firebaseapp.com",
  projectId: "ecoeats-9b2aa",
  storageBucket: "ecoeats-9b2aa.appspot.com",
  messagingSenderId: "1003575055686",
  appId: "1:1003575055686:web:d7e0f4d9f499f266024147"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);