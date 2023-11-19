import React, { useState } from "react";
import './carrinho.css'
import { Link } from "react-router-dom"
import PayButton from "../../componentes/payButton";

function Carrinho(){
    
    const [produtos, setProdutos] = useState([
        {
          produto: 'Loengo',
          quantidade: 2,
          preco: 1.00,
          loja: 'Angolan Foods',
          precoTotal: 2.00,
          img: 'https://i.imgur.com/zCxcC6V.jpg'
        },
        {
          produto: 'Dendem 500g',
          quantidade: 4,
          preco: 6.05,
          loja: 'Cozinha Angolana',
          precoTotal: 26.00,
          img: 'https://i.imgur.com/P6GN4Jg.png'
        }
        // Adicione mais produtos conforme necessário
    ]);

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

            <div className="seccionProdutos">
                <div className="CarrinhoPositioner">

                    <div className="card-header-positioner">
                        <div className="card-Header">
                            <span>Nome do produto</span>
                            <span>Nome da loja</span>
                            <span>Quantidade</span>
                            <span>Preço por Unidade</span>
                            <span>Preço Total</span>
                        </div>
                    </div>

                    <div className="ProdutosCarrinho-positioner">
                        <div className="p">
                            {produtos.map((produto, index) => (
                            <div key={index} className="ProdutosCarrinho">
                                <span>{produto.produto}</span>
                                <span>{produto.loja}</span>
                                <span>{produto.quantidade}</span>
                                <span>{produto.preco}</span>
                                <span>{produto.precoTotal}</span>
                            </div>
                        ))}
                        </div>
                    </div>

                    <PayButton itensCarrinho = {produtos[0]}></PayButton>
                </div>
            </div>
        </div>
    )
}

export default Carrinho