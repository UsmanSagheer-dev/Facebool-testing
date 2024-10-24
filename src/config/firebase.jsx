// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey:process.env.apiKey,
  authDomain:process.env.apiKey,
  projectId: process.env.apiKey,
  storageBucket:process.env.apiKey,
  messagingSenderId:process.env.apiKey,
  appId: process.env.apiKey,
  measurementId:process.env.apiKey,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const Auth = getAuth(app); 
const db = getFirestore(app);

export { app, Auth, analytics, db };
