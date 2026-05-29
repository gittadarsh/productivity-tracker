import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import {
  Toaster,
} from "react-hot-toast";

import {
  ProductivityProvider,
} from "./context/ProductivityContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <ProductivityProvider>

      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {

            background: "#0f172a",

            color: "#fff",

            border:
              "1px solid rgba(255,255,255,0.08)",

            borderRadius: "18px",

            padding: "16px",
          },
        }}
      />

    </ProductivityProvider>

  </React.StrictMode>
);