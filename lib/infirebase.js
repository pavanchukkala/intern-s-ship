// /lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBsNPTc-45FEkOBAsUp-T1TP_El5W5VH_Y",
  authDomain: "cardload-760fb.firebaseapp.com",
  projectId: "cardload-760fb",
  storageBucket: "cardload-760fb.firebasestorage.app",
  messagingSenderId: "652478851510",
  appId: "1:652478851510:web:3b1f5cf80c8043708c7917",
  measurementId: "G-52MMX4PSKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
