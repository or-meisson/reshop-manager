// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6V_kfsTAeX0VSOXg61RtkBD8Ig_4zhGk",
  authDomain: "reshop-manager.firebaseapp.com",
  projectId: "reshop-manager",
  storageBucket: "reshop-manager.appspot.com",
  messagingSenderId: "67488150457",
  appId: "1:67488150457:web:8635cc53225c8495823c68",
  measurementId: "G-Q3BN25HFC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, db, storage };