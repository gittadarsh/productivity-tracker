import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import {

  Toaster,

} from "react-hot-toast";

import {

  registerSW,

} from "virtual:pwa-register";

/* REGISTER PWA */

registerSW({

  immediate: true,
});

ReactDOM.createRoot(

  document.getElementById("root")

).render(

  <React.StrictMode>

    {/* TOAST SYSTEM */}

    <Toaster

      position="top-right"

      toastOptions={{

        duration: 3000,

        style: {

          background: "#0f172a",

          color: "#ffffff",

          border:
            "1px solid #334155",

          padding:
            "16px",

          borderRadius:
            "16px",

          fontWeight:
            "600",
        },

        success: {

          duration: 2500,
        },

        error: {

          duration: 3500,
        },
      }}
    />

    {/* MAIN APP */}

    <App />

  </React.StrictMode>
);