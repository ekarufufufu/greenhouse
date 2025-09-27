import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBRewLKDq6ns3B3IcGCmlB5qNOl-FFvXx8",
  authDomain: "greenhouse-project-36910.firebaseapp.com",
  databaseURL: "https://greenhouse-project-36910-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "greenhouse-project-36910",
  storageBucket: "greenhouse-project-36910.firebasestorage.app",
  messagingSenderId: "674745513487",
  appId: "1:674745513487:web:e26e34908fe5ba76a4957a",
  measurementId: "G-9L0HRBN7XQ"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
