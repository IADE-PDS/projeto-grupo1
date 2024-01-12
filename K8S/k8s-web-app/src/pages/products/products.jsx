import React,{ useEffect,useState} from "react";
import { Link } from "react-router-dom"
import './products.css'
import ProductRender from "./productsRender";
import Navbar from '../../componentes/navbar';
import axios from 'axios'

function Products(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Função assíncrona para buscar produtos da API
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://192.168.64.12:31332/api/produtos'); // Substitua pela URL real da sua API
            setProducts(response.data);
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

    const handleLogout = () => {
        // Limpar a sessionStorage
        sessionStorage.clear();
        // Redirecionar para a página de login ou outra página desejada
        window.location.href = '/'; // Exemplo de redirecionamento
    };
    

    return(
        <div className="ProductsContainer">
            
            {sessionStorage.getItem('userId') !== null ? headerSession() : headerStandard()}
            <div className="productsSeccion">

                <div className="searchBoxPositioner">
                    <div id="searchBox">
                        <input type="text" placeholder="Pesquisa" id="input"></input>

                        <button id="button">
                            <img id="icon" src='https://i.imgur.com/XEV8btH.png' alt="search"></img>
                        </button>
                    </div>
                </div>

                <div className="productsListPositioner">
                    <div className="productsPositionerTable">

                        {products.map((product)=>
                        <Link key={product.id} to={`/Produto/${product.id}`} id="link">
                            <ProductRender data={product}></ProductRender>
                        </Link>)}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Products