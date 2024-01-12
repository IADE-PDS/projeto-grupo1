import React, { useEffect, useState } from "react";
import './checkout.css';
import Animation from './Animation - 1704910539242.json';
import Lottie from 'lottie-react';
import { Link } from "react-router-dom";
import axios from "axios";

function CheckoutSucess() {
    const [isClicked, setIsClicked] = useState(false);
    const[cart, setCart] = useState([])
    const userId = sessionStorage.getItem('userId')

    useEffect(()=>{
        const GetBoughtProducts = async () =>{

            try {
    
                const response = await axios.get('http://192.168.64.12:31332/api/shoplists/getcart');
                setCart(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        GetBoughtProducts();
    },[])

    useEffect(()=>{

        SendBoughtProducts(userId, cart)
    },[cart])
    
    const handleClick = () => {
        setIsClicked(true);
        
        
        setTimeout(() => {
            setIsClicked(false);
        }, 150); 
    };

    const SendBoughtProducts = async (userID, products) => {
        try {

            if (!Array.isArray(products)) {
                console.log('Os produtos não estão definidos ou não são um array.');
                return;
            }

            const response = await axios.post('http://localhost:8080/api/shoplists/purchased', {
                userID: userID,
                products: products.map(product => ({
                    id_produto: product.produto_id,
                    quantidade: product.quantidade,
                    total: parseFloat(product.preco) * product.quantidade
                }))
            });
    
            if (response.status === 200) {
                console.log("Produtos comprados com sucesso:", response.data);
                // Aqui você pode lidar com qualquer lógica adicional após a compra bem-sucedida
            } else {
                console.log("Erro ao comprar produtos:", response.data);
            }
        } catch (error) {
            console.log("Erro ao fazer a requisição de compra:", error);
        }
    }

    
    return (
        <div className="checkout-sucess">
            <div className="checkout-sucess-1">
                <h1>Pagamento feito com sucesso!</h1>
                <p>O comerciante irá entrar em contato com o e-mail cadastrado para finalizar os dados de entrega.</p>
                
                <Link to={'/'}>
                    <button 
                        
                        className={isClicked ? 'clicked-button' : ''}
                        >
                        <span>Continuar para página</span>
                    </button>

                </Link>
                
                <div className="lottie">
                    <Lottie animationData={Animation} style={{ width: '400px', height: '400px' }}></Lottie>
                </div>
            </div>
        </div>
    );
}

export default CheckoutSucess;
