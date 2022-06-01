import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, sidnInWithEmailAndPassword, connectAuthEmulator, } from "@firebase/auth";
import "firebase/auth"
import { createContext } from "react";
const firebaseConfig = {
    apiKey: "AIzaSyC3UlTNXo0haKEFp97IYRfLj28SgJO2FAc",
    authDomain: "final-app-49e7d.firebaseapp.com",
    projectId: "final-app-49e7d",
    storageBucket: "final-app-49e7d.appspot.com",
    messagingSenderId: "541877662225",
    appId: "1:541877662225:web:a8ef77babbef650b25f7b0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)