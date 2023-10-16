import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCW7EhKHiCxb8kfaK4xNWxNlIiXZZimazg",
  authDomain: "wise-program-402223.firebaseapp.com",
  projectId: "wise-program-402223",
  storageBucket: "wise-program-402223.appspot.com",
  messagingSenderId: "14744009432",
  appId: "1:14744009432:web:1b28680a5a6670d68ef5ad",
  measurementId: "G-LN8N58M6S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export { auth, provider, database };