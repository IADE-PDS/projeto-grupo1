import React, {useEffect, useState, useContext} from "react";
import { Link } from "react-router-dom"
import './location.css'
import Navbar from '../../componentes/navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import axios from 'axios';
import { Icon } from "leaflet";
import Custom from './google-maps.png'

function LocationPage(){

    const markers = [{}];
    const [stores, setStores] = useState([]);

    const customIcon = new Icon ({

        iconUrl: Custom,
        iconSize: [38, 38]
    })

    const handleLogout = () => {
        // Limpar a sessionStorage
        sessionStorage.clear();
        // Redirecionar para a página de login ou outra página desejada
        window.location.href = '/'; // Exemplo de redirecionamento
    };

    const fetchCoordinates = async (address) => {
        const apiKey = 'AIzaSyC_cyC7CihcaDetIA6VKoJzR-z0fuNFotI';
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
        
        if (response.data.results && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return [location.lat, location.lng];
        } else {
            return null;  // retorna null se a localização não puder ser convertida
        }
    };
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://192.168.64.12:31332/api/lojas');
                const storesData = response.data;
                
                const convertedData = await Promise.all(
                    storesData.map(async (store) => {
                        const location = await fetchCoordinates(store.endereco);
                        return {
                            ...store,
                            location: location
                        };
                    })
                );

                setStores(convertedData);
            } catch (error) {
                console.error('Erro ao obter lojas da API:', error);
            }
        };
      
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

    return(
        <div className="LocationContainer">

            {sessionStorage.getItem('userId') !== null ? headerSession() : headerStandard()}

            <div className="map-container">
               <MapContainer center={[38.7071, -9.13549]} zoom={13}>
                    <TileLayer  attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                                url="https://api.mapbox.com/styles/v1/pacas06/clr7z4jaf000z01qn886y4lay/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGFjYXMwNiIsImEiOiJjbHI3eXp1YmswNDk4MnJ0M2hpbDExYm4yIn0.BcicW8R2EQtFNUeSQnUbeA">
                    </TileLayer>

                    {stores.map((store, index) => (
                        store.location &&  // Renderiza apenas se a localização existir
                        <Marker key={index} position={store.location} icon={customIcon}>
                            <Popup>
                                <div className="store-card">

                                    <div className="store-card-img">
                                        <img src='https://i.imgur.com/TjA7Z0D.png' alt="store"/>
                                    </div>

                                    <div className="store-card-info">
                                        <h2>{store.nome}</h2>
                                        <p>Email: {store.email}</p>
                                        <p>Contacto: {store.contacto}</p>
                                        <p>Endereço: {store.endereco}</p>
                                    </div>
                                    
                                </div>
                            </Popup>
                        </Marker>
                    ))}  
               </MapContainer>
            </div>
            
        </div>
    );
}

export default LocationPage