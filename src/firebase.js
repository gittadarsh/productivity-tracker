import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDK5bTA1_ahmopN2fLjcrfPJFV2xdYG-Do",
  authDomain: "task-update-22e03.firebaseapp.com",
  projectId: "task-update-22e03",
  storageBucket: "task-update-22e03.firebasestorage.app",
  messagingSenderId: "671646227625",
  appId: "1:671646227625:web:b15e0a81f86af02a689db8"
};

const app =
  initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
  new GoogleAuthProvider();

export const db =
  getFirestore(app);