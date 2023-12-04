import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCW7EhKHiCxb8kfaK4xNWxNlIiXZZimazg",
  authDomain: "wise-program-402223.firebaseapp.com",
  databaseURL: "https://wise-program-402223-default-rtdb.firebaseio.com",
  projectId: "wise-program-402223",
  storageBucket: "wise-program-402223.appspot.com",
  messagingSenderId: "14744009432",
  appId: "1:14744009432:web:1b28680a5a6670d68ef5ad",
  measurementId: "G-LN8N58M6S0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);