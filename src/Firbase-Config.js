import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjHsR3GlJjCPi31gLKaBco4zBx1AsDshQ",
  authDomain: "blog-projects-478cc.firebaseapp.com",
  projectId: "blog-projects-478cc",
  storageBucket: "blog-projects-478cc.appspot.com",
  messagingSenderId: "830779167061",
  appId: "1:830779167061:web:c238721fc37b1c36839fdc",
  measurementId: "G-REZS1B2Q8G",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
