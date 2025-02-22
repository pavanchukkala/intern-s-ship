// /lib/firebase-cardload.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Provided Cardload Firebase configuration details
const firebaseConfig = {
  apiKey: "AIzaSyBsNPTc-45FEkOBAsUp-T1TP_El5W5VH_Y",
  authDomain: "cardload-760fb.firebaseapp.com",
  projectId: "cardload-760fb",
  storageBucket: "cardload-760fb.firebasestorage.app",
  messagingSenderId: "652478851510",
  appId: "1:652478851510:web:3b1f5cf80c8043708c7917",
  measurementId: "G-52MMX4PSKE",
};

// Initialize Firebase app only once under the name "cardload"
const app =
  getApps().find((a) => a.name === "cardload") ||
  initializeApp(firebaseConfig, "cardload");

// Get Firestore instance from the app
const db = getFirestore(app);

export { db };
