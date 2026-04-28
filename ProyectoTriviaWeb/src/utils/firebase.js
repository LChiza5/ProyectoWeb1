import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGj5hu7sVvMVUhsrSTXu9yRXzS9lB1zp4",
  authDomain: "proyectotriviaweb.firebaseapp.com",
  projectId: "proyectotriviaweb",
  storageBucket: "proyectotriviaweb.firebasestorage.app",
  messagingSenderId: "327910097481",
  appId: "1:327910097481:web:c6a65f776520aa14ea3598",
  measurementId: "G-BGLQJZJ4V6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);