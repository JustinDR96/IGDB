// CartProvider.js
import React, { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (game) => {
    console.log("Adding to cart:", game);
    setCart((currentCart) => [...currentCart, game]);
  };

  const removeFromCart = (gameId) => {
    setCart((currentCart) => currentCart.filter((game) => game.id !== gameId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
