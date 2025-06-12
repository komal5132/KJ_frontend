// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClBvp4i2QQAuxCOMwp7x6-T2-u2YMlbV8",
  authDomain: "kjewell.firebaseapp.com",
  projectId: "kjewell-6d265",
  storageBucket: "kjewell-6d265.firebasestorage.app",
  messagingSenderId: "667490604672",
  appId: "1:667490604672:android:129a4f8ea1200a3d27f865"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
