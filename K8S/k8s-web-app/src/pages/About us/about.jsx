import React from "react";
import Navbar from '../../componentes/navbar';
import { Link } from "react-router-dom";
import './about.css'

function About(){

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
                        <button onClick={handleLogout}>
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

            <div className="quem-somos">

                <div className="div-1">
                    <h1>Quem somos ?</h1>
                    <p>A mambos da banda é uma aplicação web que faz a conexão entre lojas e utilizadores nela registrados</p>

                    <h1>Nosso objetivo</h1>
                    <p>A pretensão com esta aplicação é ajudar pequenos negócios, pessoas que com pouco tentam conseguir uma renda seja essa unica outra, e pessoas em geral, angolanas ou não, mas que queiram preparar refeições angolanas. Tornando a procura e a oferta destes produtos bem mais rapida e pratica</p>

                    <h1>Motivação</h1>
                    <p>Chegando em Portugal foi muito dificil encontrar lojas que vendam produtos de culinaria angolana, muitas das lojas não têm redes sociais/websites, e demoramos bastante tempo a encontrar essas lojas e a saber onde ficam localizadas. Essa dificuldade motivou-nos a criar esta aplicação web que ajuda tanto os clientes quanto os vendedores</p>
                </div>

            </div>

            <div className="quem-somos-2">
                <h1>Contacto 800 420 547</h1>
                <h1>Email:mambosdabanda@site.pt</h1>
            </div>

        </div>
    )

}

export default About