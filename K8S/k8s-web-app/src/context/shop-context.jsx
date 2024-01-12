import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

function ShopContextProvider(props) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.64.12:31332/api/produtos`);
        setProducts(response.data);

        let cart = {};
        for (let i = 0; i < response.data.length; i++) {
          cart[i] = 0;
        }
        setCartItems(cart);
      } catch (error) {
        console.error('Erro ao obter detalhes do produto:', error);
      }
    };

    fetchProductDetails();
  }, []);

  useEffect(() => {
    console.log(cartItems);
    console.log("Products:", products);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems, products,]);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    console.log(savedCartItems)
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);
  

  const addToCart = (itemId, preco, nome, imagem,lojaID,lojaNome) => {
    setCartItems((prev) => ({ 
      ...prev, 
      [itemId]: { 
        quantidade: prev[itemId]?.quantidade + 1 || 1, 
        preco, 
        nome,
        imagem,
        lojaID,
        lojaNome,
      } 
    }));
  };

  const addPredef = (() =>{
    
    const predef = [
      {
        name: "Oleo de palma 1L",
        imgUrl: "https://i.imgur.com/g58gTBF.png",
        quantidade:1
      },
      {
  
        name: "Mucua 2kg",
        imgUrl: "https://i.imgur.com/yDiWeUx.png",
        quantidade:1
      },
      {
        name: "Muteta 300g",
        imgUrl: "https://i.imgur.com/Rnn552Z.png",
        quantidade:1,
      },
      {
       
        name: "Rama de batata 400g",
        imgUrl: "https://i.imgur.com/kBnQXLo.png",
       quantidade:1,
      },
      {
        
        name: "Dendem 500g",
        imgUrl: "https://i.imgur.com/P6GN4Jg.png",
        quantidade: 1
      },
      {
        name: "Carambola 1kg",
        imgUrl: "https://i.imgur.com/aul8Eym.png",
        quantidade: 1
      },
      {
        name: "Cana de Açucar 2kg",
        imgUrl: "https://i.imgur.com/YLVdYeu.png",
        quantidade: 1
      }
    ]
  })
  

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId]?.quantidade > 0) {
        updatedCart[itemId].quantidade -= 1;
      }
      return updatedCart;
    });
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
  
    for (const item in cartItems) {
      if (cartItems[item]?.quantidade > 0) {
        // Verifica se o itemInfo está definido antes de realizar cálculos
        let itemInfo = products.find((product) => product.id === parseInt(item));
        if (itemInfo) {
          totalAmount += itemInfo.preco * cartItems[item].quantidade;
        } else {
          console.error(`Produto com ID ${item} não encontrado`);
        }
      }
    }
  
    console.log("Total Amount:", totalAmount);
    return totalAmount;
  };

  useEffect(() => {
    getTotalAmount();
  }, [cartItems, products]);

  const contextValue = { cartItems, addToCart, removeFromCart, products, getTotalAmount };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
