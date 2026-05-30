import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  onAuthStateChanged,
} from "firebase/auth";

import "./index.css";

import App from "./App";

import {
  auth,
} from "./firebase";

import {
  createUserProfile,
} from "./services/userService";

import {
  useProductivityStore,
} from "./store/useProductivityStore";

import {
  useUIStore,
} from "./store/uiStore";

/* INITIALIZE AUTH */

onAuthStateChanged(
  auth,

  async (user) => {

    if (user) {

      await createUserProfile(
        user
      );

      useProductivityStore
        .getState()
        .setUser(user);
    }

    else {

      useProductivityStore
        .getState()
        .setUser(null);
    }
  }
);

/* INITIALIZE UI */

useUIStore.getState();

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