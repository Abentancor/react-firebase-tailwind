import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBwfIxQ5LkFBi6npTur5rvQOvixh8V8Tc8",
  authDomain: "react-form-practica.firebaseapp.com",
  projectId: "react-form-practica",
  storageBucket: "react-form-practica.appspot.com",
  messagingSenderId: "595699860425",
  appId: "1:595699860425:web:97a6ca11fd9639cfc35e18"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db, };