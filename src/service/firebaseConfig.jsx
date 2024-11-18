// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMn3AiARqegjgJChC2RE_ZI1jL4-Ny82s",
  authDomain: "itinify-4e207.firebaseapp.com",
  projectId: "itinify-4e207",
  storageBucket: "itinify-4e207.firebasestorage.app",
  messagingSenderId: "96722633398",
  appId: "1:96722633398:web:4071cb2f7fd345eac11c17"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)