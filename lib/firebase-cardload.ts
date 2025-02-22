// /lib/firebase-cardload.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_CARDLOAD_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_CARDLOAD_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_CARDLOAD_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_CARDLOAD_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_CARDLOAD_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_CARDLOAD_APP_ID,
};

const app =
  getApps().length ? getApp("cardload") : initializeApp(firebaseConfig, "cardload");
const db = getFirestore(app);

export { db };
