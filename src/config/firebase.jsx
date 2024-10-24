// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBjOk81BmuEk0HkEwEaOpz5qhz0SR4v6sc",
  authDomain: "facebookclone-33e43.firebaseapp.com",
  projectId: "facebookclone-33e43",
  storageBucket: "facebookclone-33e43.appspot.com",
  messagingSenderId: "319237967909",
  appId: "1:319237967909:web:bb0f0af17e76d5537d6fcc",
  measurementId: "G-J3DZJX8R7H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const Auth = getAuth(app); 
const db = getFirestore(app);

export { app, Auth, analytics, db };
