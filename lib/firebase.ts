// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration details
const firebaseConfig = {
  apiKey: "AIzaSyCTqMij15YdrA1uqrVErwXkZW1htJRWioY",
  authDomain: "internship-7de6c.firebaseapp.com",
  projectId: "internship-7de6c",
  storageBucket: "internship-7de6c.firebasestorage.app",
  messagingSenderId: "678607476606",
  appId: "1:678607476606:web:9ed2cb74f7180d693fc52f",
  measurementId: "G-0DHRP6M7FG"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics (client-side only)
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Initialize Firestore
const db = getFirestore(app);

export { app, analytics, db };
