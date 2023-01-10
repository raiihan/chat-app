// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCYQcwSxJBCtTBKtKSuu7_x4_77_DH4lTI",
    authDomain: "chat-69f52.firebaseapp.com",
    projectId: "chat-69f52",
    storageBucket: "chat-69f52.appspot.com",
    messagingSenderId: "300662824523",
    appId: "1:300662824523:web:6b079136a1f96b58acf7ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);




