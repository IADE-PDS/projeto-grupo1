import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../componentes/navbar';
import axios from 'axios';
import './details.css';
import ProductRender from '../products/productsRender.jsx';
import { ShopContext } from "../../context/shop-context.jsx";

function ProductDetails(props) {
  const [productDetails, setProductDetails] = useState(null);
  const { productId } = useParams();
  const [productStore, setProductStore] = useState([]);
  const {addToCart} = useContext(ShopContext);


  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
      setIsClicked(true);
        
        
      setTimeout(() => {
          setIsClicked(false);
      }, 150); 
  };

  const handleLogout = () => {
    // Limpar a sessionStorage
    sessionStorage.clear();
    // Redirecionar para a página de login ou outra página desejada
    window.location.href = '/'; // Exemplo de redirecionamento
  };



  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.64.12:31332/api/produtos/${productId}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error('Erro ao obter detalhes do produto:', error);
      }
    };

    const fetchProductDetailsStore = async () => {
      try {
        const response2 = await axios.get(`http://192.168.64.12:31332/api/lojas/prod/${productId}`);
        setProductStore(response2.data);
        console.log(productStore)
      } catch (error) {
        console.error('Erro ao obter detalhes da loja:', error);
      }
    };

    fetchProductDetails();
    fetchProductDetailsStore();
  }, [productId]);

  if (!productDetails) {
    return <div>Carregando...</div>;
  }
  
  function headerSession() {
    return (
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
    );
  }

  function headerStandard() {
    return (
      <Navbar />
    );
  }

  return (
    <div className="productsContainer">
      {sessionStorage.getItem('userId') !== null ? headerSession() : headerStandard()}


      <div className="productsecciondetails">
        <div className="productCardPositioner">
          <ProductRender data={productDetails}></ProductRender>
        </div>

        <div className="Frase-Positioner">
          <span>Loja com o produto à venda: </span>
        </div>

        <div className="StoreSeccion">
          <div className="StoreSeccionPositioner">
            {productStore.map((store, index) => (
              <div key={index} className="Card">
                <div className="img1">
                  <img src="https://i.imgur.com/TjA7Z0D.png" alt="Loja Imagem" />
                </div>

                <div className="prod_nome">
                  <span>{store.loja_nome}</span>
                </div>

                <div className="prod_endereco">
                  <span>{store.loja_endereco}</span>
                </div>

                <div className="prod_preco">
                  <span>Preço: {store.prod_preco}€</span>
                </div>

                <div className="prod_quantidade">
                  <span>Quantidade: {store.prod_quantidade} Unidades</span>
                </div>

                <div className="prod_quantidade">
                  <span>Loja: {store.loja_nome}</span>
                </div>

                <div className="carrinhoButton">
                  <button onClick={() => {
                    
                    addToCart(store.prod_id, store.prod_preco, store.prod_nome, store.produto_img_url, store.loja_id, store.loja_nome)
                    handleClick()
                  
                  }} className={isClicked ? 'clicked-button' : ''}>
                    <span>Adicionar ao carrinho</span>
                    
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
