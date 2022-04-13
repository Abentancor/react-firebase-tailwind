import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDV4nuzT-sDJ7xEAMe3ORpcEGCsWvTyU_E",
  authDomain: "react-vite-tailwind.firebaseapp.com",
  projectId: "react-vite-tailwind",
  storageBucket: "react-vite-tailwind.appspot.com",
  messagingSenderId: "994176814047",
  appId: "1:994176814047:web:c2ed0b88fcc4eeb9c7d26a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};