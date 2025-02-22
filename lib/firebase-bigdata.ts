// /lib/firebase-bigdata.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYPu4ukrTX5c8CW_9n5h87E41PpjvBSVc",
  authDomain: "comdata-ddd32.firebaseapp.com",
  projectId: "comdata-ddd32",
  storageBucket: "comdata-ddd32.firebasestorage.app",
  messagingSenderId: "918849073692",
  appId: "1:918849073692:web:2c8238b494457c7b0ce5d9",
  measurementId: "G-C6NS4T76TP"
};

const app =
  getApps().find((a) => a.name === "bigdata") ||
  initializeApp(firebaseConfig, "bigdata");

const db = getFirestore(app);

export { db };
