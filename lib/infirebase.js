import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsNPTc-45FEkOBAsUp-T1TP_El5W5VH_Y",
  authDomain: "cardload-760fb.firebaseapp.com",
  projectId: "cardload-760fb",
  storageBucket: "cardload-760fb.firebasestorage.app",
  messagingSenderId: "652478851510",
  appId: "1:652478851510:web:3b1f5cf80c8043708c7917",
  measurementId: "G-52MMX4PSKE"
};

// Prevent duplicate app initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Firebase Analytics should only be initialized on the client.
// Using dynamic import here ensures analytics code only runs in the browser.
let analytics = null;
if (typeof window !== "undefined") {
  import("firebase/analytics")
    .then(({ getAnalytics, isSupported }) => {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      });
    })
    .catch((err) => {
      console.warn("Firebase Analytics is not supported", err);
    });
}

export { app, analytics, db };
