import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  Toaster,
} from "react-hot-toast";

import App from "./App";

import "./index.css";

import {
  ProductivityProvider,
} from "./context/ProductivityContext";

import AppInitializer from "./AppInitializer";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <ProductivityProvider>

        <AppInitializer>

          <App />

        </AppInitializer>

      </ProductivityProvider>

      <Toaster

        position="top-right"

        toastOptions={{

          style: {

            background:
              "#0f172a",

            color:
              "#ffffff",

            border:
              "1px solid rgba(255,255,255,0.1)",

            borderRadius:
              "16px",

            padding:
              "16px",
          },
        }}
      />

    </BrowserRouter>

  </React.StrictMode>
);