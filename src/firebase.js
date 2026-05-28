import {

  initializeApp,

} from "firebase/app";

import {

  getAuth,
  GoogleAuthProvider,

} from "firebase/auth";

import {

  getFirestore,

} from "firebase/firestore";

/* FIREBASE CONFIG */

const firebaseConfig = {

  apiKey:
    "AIzaSyDK5bTA1_ahmopN2fLjcrfPJFV2xdYG-Do",

  authDomain:
    "task-update-22e03.firebaseapp.com",

  projectId:
    "task-update-22e03",

  storageBucket:
    "task-update-22e03.firebasestorage.app",

  messagingSenderId:
    "671646227625",

  appId:
    "1:671646227625:web:b15e0a81f86af02a689db8",
};

/* INITIALIZE FIREBASE */

const app =
  initializeApp(
    firebaseConfig
  );

/* AUTH */

export const auth =
  getAuth(app);

/* GOOGLE PROVIDER */

export const provider =
  new GoogleAuthProvider();

/* FIRESTORE DATABASE */

export const db =
  getFirestore(app);