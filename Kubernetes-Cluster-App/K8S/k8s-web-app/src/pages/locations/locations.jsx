import React from "react";
import { Link } from "react-router-dom"
import './location.css'

function LocationPage(){

    return(
        <div className="LocationContainer">
            <div className="navbar">
                <Link to={'/'}className="imageDiv">
                    <img src='https://i.imgur.com/W9y9TP3.png' alt="Logo da mambos" id="logo"/>
                    <span>Produtos</span>
                </Link>

                <div className="links">
                    <Link to={'/'}>Inicio</Link>
                    <Link to={'/About'}>Sobre</Link>
                    <Link to={'/Products'}>Produtos</Link>
                    <Link to={'/Loja'}>Loja</Link>
                    <Link to={'/About'}>Area Pessoal</Link>

                    <Link to={'/Carrinho'}>
                        <img width="35" height="35" src="https://img.icons8.com/ios-filled/50/shopping-cart.png" alt="shopping-cart"/>
                    </Link>
                    <Link to={'/'} className="Button">
                        <button>
                            <span>Sair</span>
                        </button>
                    </Link>
                </div>
            </div>

            <div className="locationSeccion">

                <div className="storPositioner">

                </div>

                <div className="searchDiv">
                    
                </div>

            </div>
        </div>
    );
}

export default LocationPage