// /lib/firebase-hugedata.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC91xTMUHMqZpmJzfH57a-fFhM6y87Nv5Y",
  authDomain: "internrespo-16510.firebaseapp.com",
  projectId: "internrespo-16510",
  storageBucket: "internrespo-16510.firebasestorage.app",
  messagingSenderId: "771268726096",
  appId: "1:771268726096:web:b48d5ef11aeba879ae3055",
  measurementId: "G-Z5S4FTVNK5"
};

const app = getApps().find((app) => app.name === "hugedata") || initializeApp(firebaseConfig, "hugedata");
const db = getFirestore(app);

export { db };
