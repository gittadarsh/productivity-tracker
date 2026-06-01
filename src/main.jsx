import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import "./index.css";

import App from "./App";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "./firebase";

import {
  createUserProfile,
} from "./services/userService";

/* INITIALIZE AUTH */

onAuthStateChanged(

  auth,

  async (user) => {

    if (user) {

      try {

        await createUserProfile(
          user
        );

      } catch (error) {

        console.log(
          "User profile error:",
          error
        );
      }
    }
  }
);

/* RENDER APP */

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )
).render(

  <React.StrictMode>

    <BrowserRouter>

      <App />

    </BrowserRouter>

  </React.StrictMode>
);