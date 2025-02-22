// /lib/firebase-internorgres.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_INTERNOREGRES_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_INTERNOREGRES_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_INTERNOREGRES_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_INTERNOREGRES_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_INTERNOREGRES_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_INTERNOREGRES_APP_ID,
};

const app =
  getApps().length ? getApp("internorgres") : initializeApp(firebaseConfig, "internorgres");
const db = getFirestore(app);

export { db };
