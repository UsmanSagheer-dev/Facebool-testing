// firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyBPm1bxRCAiuBpMO0RGsHsoL9xd4L09DXQ",
  authDomain: "facebook-clone-e718f.firebaseapp.com",
  projectId: "facebook-clone-e718f",
  storageBucket: "facebook-clone-e718f.appspot.com",
  messagingSenderId: "988244982540",
  appId: "1:988244982540:web:98d47633ab5218d13ae729",
  measurementId: "G-8SR56WL9SJ"
};
  

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const Auth = getAuth(app); 
const db = getFirestore(app);

export { app, Auth, analytics, db }; 
