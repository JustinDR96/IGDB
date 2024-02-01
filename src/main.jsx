import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.scss";
import { CartProvider } from "./components/panier/CartProvider";
import { Auth0Provider } from "@auth0/auth0-react";

const root = document.getElementById("root");

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <Auth0Provider
      domain="dev-h417qyh0b7woxtcd.us.auth0.com"
      clientId="b7qeTv6I9r3kIgRAg9HnIGEJJVIdKI6G"
      redirectUri={window.location.origin}
    >
      <CartProvider>
        <App />
      </CartProvider>
    </Auth0Provider>
  );
}
