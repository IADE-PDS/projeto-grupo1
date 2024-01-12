import React, { useState, useEffect } from "react";
import './member-area.css'
import Navbar from '../../componentes/navbar';
import { Link } from "react-router-dom";
import axios from 'axios'

export default function Member(){

    const [compras, setCompras] = useState([])

    useEffect(() => {
        // Função assíncrona para buscar produtos da API
        const fetchProducts = async () => {
          try {
            const response = await axios.get(`http://192.168.64.12:31332/api/shoplists/purchases/${sessionStorage.getItem('userId')}`); // Substitua pela URL real da sua API
            setCompras(response.data);
            console.log(response)
          } catch (error) {
            console.error('Erro ao obter produtos da API:', error);
          }

        };
    
        // Chama a função para buscar os produtos quando o componente montar
        fetchProducts();
        
    }, []);

    function headerSession(){

        return(
            <div className="navbar">
                <Link to={'/'} className="imageDiv">
                    <img src='https://i.imgur.com/W9y9TP3.png' alt="Logo da mambos" id="logo" />
                    <span>Mambos da banda</span>
                </Link>

                <div className="links">
                    <span className="userName">{sessionStorage.getItem('userName')}</span>
                    <Link to={'/'}>Inicio</Link>
                    <Link to={'/About'}>Sobre</Link>
                    <Link to={'/Products'}>Produtos</Link>
                    <Link to={'/LocationStore'}>Lojas</Link>
                    <Link to={'/Carrinho'}>
                        <img width="35" height="35" src="https://img.icons8.com/ios-filled/50/shopping-cart.png" alt="shopping-cart" />
                    </Link>
                    <Link to={'/'} className="Button">
                        <button>
                            <span>Sair</span>
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    function headerStandard(){
        return(
            <Navbar />
        )
    }

    return(
        <div className="AboutContainer">
            {sessionStorage.getItem('userId') !== null ? headerSession() : headerStandard()}

            <div className="user-info">

                <div className="name-position">
                    <h1>UserName: {sessionStorage.getItem('userName')}</h1>
                    <h1>Email: {sessionStorage.getItem('email')}</h1>
                </div>
            </div>

            <div className="card-header-positioner">
                <div className="card-Header">
                    <span>Produtos</span>
                    <span>titulo</span>
                    <span>Quantidade</span>
                    <span>Total</span>
                    <span>Data</span>
                </div>
            </div>

            {compras.map((e)=>{

                const date = new Date(e.data_compra);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

                return(
                    <div className="ProdutosCarrinho-positioner">
                        <div className="card-Header-2">
                            <img src={e.img_url} alt="Product" className="carticon-product-icon"></img>
                            <span>{e.prod_nome}</span>
                            <button className="cartitems-quantity">{e.quantidade}</button>
                            <span>{e.total}€</span>
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                )


            })}

            

           
        </div>
    )
}

