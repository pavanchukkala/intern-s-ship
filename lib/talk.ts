// lib/talk.ts
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFEqiNccWyu7XMQB0am1m97mKU-GkcxLc",
  authDomain: "internship-f6819.firebaseapp.com",
  projectId: "internship-f6819",
  storageBucket: "internship-f6819.firebasestorage.app",
  messagingSenderId: "1049797806104",
  appId: "1:1049797806104:web:46324c8be1edd36f139b6d",
  measurementId: "G-ZF1B1QP0TS"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, analytics, db };
