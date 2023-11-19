import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const useDefaultCart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/produtos`);
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao obter detalhes do produto:', error);
      }
    };
    fetchProductDetails();
  }, []);

  let cart = {};
  for(let i = 1; i < products.length; i++){
    cart[i] = 0;
  }
  return cart;
};

function ShopContextProvider(props) {
  const [cartItems, setCartItems] = useState(useDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (updatedCart[itemId] === undefined) {
        updatedCart[itemId] = 1; // Se o item não estiver no carrinho, inicialize com 1
      } else {
        updatedCart[itemId] += 1; // Se o item já estiver no carrinho, incremente
      }

      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

  const contextValue = { cartItems, addToCart, removeFromCart };
  console.log(cartItems)
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
