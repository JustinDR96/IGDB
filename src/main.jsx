import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.scss";
import { CartProvider } from "./components/panier/CartProvider";

const root = document.getElementById("root");

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <CartProvider>
      <App />
    </CartProvider>
  );
}
