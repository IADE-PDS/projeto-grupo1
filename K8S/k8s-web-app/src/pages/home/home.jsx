import React, { useState } from "react";
import './home.css';
import Navbar from '../../componentes/navbar';
import { Link } from "react-router-dom";

function Home() {

    const handleLogout = () => {
        // Limpar a sessionStorage
        sessionStorage.clear();
        // Redirecionar para a página de login ou outra página desejada
        window.location.href = '/'; // Exemplo de redirecionamento
    };

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
                        <button onClick={handleLogout} >
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

    return (
        <div className="HomeContainer">
            
            {sessionStorage.getItem('userId') !== null ? headerSession() : headerStandard()}

            <div className="title-search-container">
                <div className="alignment-text-div">
                    <h2>Trazemos Angola para perto de si!</h2>
                    <h1>Compre agora os ingredientes para<br></br>preparar a sua refeição</h1>
                    <div id="searchBox">
                        <input type="text" placeholder="Diga-nos onde está!" id="input"></input>

                        <button id="button">
                            <img id="icon" src='https://i.imgur.com/XEV8btH.png' alt="search"></img>
                        </button>
                    </div>

                    <Link to={'/Products'}>
                        <button className="buttonContainer">
                            <span>
                                Começar
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
