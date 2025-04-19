import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.title === product.title);
    if (existingItem) {
      return false;
    }
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (title) => {
    const updatedCart = cartItems.filter(item => item.title !== title);
    setCartItems(updatedCart);
  };

  const updateQuantity = (title, quantity) => {
    const updatedCart = cartItems.map(item =>
      item.title === title ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
