import React, { useState, useContext, useEffect } from "react";
import './carrinho.css'
import { Link } from "react-router-dom"
import PayButton from "../../componentes/payButton";
import { ShopContext } from "../../context/shop-context.jsx";
import axios from "axios";

function Carrinho(){

    const {addToCart,cartItems,removeFromCart, products, getTotalAmount } = useContext(ShopContext);

    useEffect(() => {
        getTotalAmount();
    }, [cartItems, products]);

    const handleLogout = () => {
        // Limpar a sessionStorage
        sessionStorage.clear();
        // Redirecionar para a página de login ou outra página desejada
        window.location.href = '/'; // Exemplo de redirecionamento
    };

    const handleCheckout = async () => {
        
    
        try {
            // Envie todos os produtos de uma vez para o backend
            
            // Depois de enviar todos os produtos para o backend, prossiga com o checkout no Stripe
            const response = await axios.post('http://192.168.64.12:31332/api/stripe/create-checkout-session', {
                cartItems: cartItems,
            });
    
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.log("Erro ao fazer requisição:", error.message);
        }
    };
    

    
      
    return(
        <div className="carrinhoContainer">
            <div className="navbar">
                <Link to={'/'}className="imageDiv">
                    <img src='https://i.imgur.com/W9y9TP3.png' alt="Logo da mambos" id="logo"/>
                    <span>Produtos</span>
                </Link>

                <div className="links">
                    <Link to={'/'}>Inicio</Link>
                    <Link to={'/About'}>Sobre</Link>
                    <Link to={'/Products'}>Produtos</Link>
                    <Link to={'/LocationStore'}>Lojas</Link>

                    <Link to={'/Carrinho'}>
                        <img width="35" height="35" src="https://img.icons8.com/ios-filled/50/shopping-cart.png" alt="shopping-cart"/>
                    </Link>
                    <Link to={'/'} className="Button">
                        <button onClick={handleLogout}>
                            <span>Sair</span>
                        </button>
                    </Link>
                </div>
            </div>

            <div className="seccionProdutos">
                <div className="CarrinhoPositioner">
                    <div className="card-header-positioner">
                        <div className="card-Header">
                            <span>Produtos</span>
                            <span>titulo</span>
                            <span>Preço</span>
                            <span>Quantidade</span>
                            <span>Total</span>
                            <span>Loja</span>
                            <span>Remove</span>

                        </div>
                    </div>
                    <hr></hr>
                    {products.map((e)=>{
                        if (cartItems[e.id]?.quantidade > 0 ) {
                            return (
                                <div className="ProdutosCarrinho-positioner">
                                    <div className="card-Header-2">
                                        <img src={e.imgUrl} alt="Product" className="carticon-product-icon"></img>
                                        <span>{e.name}</span>
                                        <span>{cartItems[e.id]?.preco}€</span>
                                        <span>{cartItems[e.id]?.lojaNome}</span>
                                        <button className="cartitems-quantity">{cartItems[e.id]?.quantidade}</button>
                                        <span>{(cartItems[e.id]?.preco)*(cartItems[e.id]?.quantidade)}€</span>
                                        <img className="remove-icon" src="https://i.imgur.com/rsi0wLL.png" alt="Remove" onClick={()=>{removeFromCart(e.id)}}/>
                                    </div>
                                </div>
                            )
                        }
                        return null
                    })}

                    <div className="cart-total-positioner">
                        <button onClick={handleCheckout}>
                            <span>PROCEED TO CHECKOUT</span>
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Carrinho