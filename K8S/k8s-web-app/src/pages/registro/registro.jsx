import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom"
import './registro.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Registro(){

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [localizacao, setLocalizacao] = useState(null);
    const navigate = useNavigate();

    const obterLocalizacao = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocalizacao({
              type: 'Point',
              coordinates: [longitude, latitude],
            });
          },
          (error) => {
            console.error('Erro ao obter a localização:', error);
          }
        );
      } else {
        console.error('Geolocalização não suportada no seu navegador.');
      }
    };
  
    useEffect(() => {
  
      if (localizacao && name) {
        enviarDadosParaBackend();
      }
    }, [localizacao, name]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      obterLocalizacao();
    };
  
    const enviarDadosParaBackend = async () => {
      console.log('Enviando dados para o backend...');
  
      try {

        const latitude = localizacao.coordinates[0];
        const longitude = localizacao.coordinates[1];
        const gpslocation = ""+longitude+" "+latitude;
  
        console.log('Dados a serem enviados:', {
          email: email,
          username: name,
          password: password,
          location: gpslocation,
        });
  
        // Enviar os dados para o backend usando Axios
        const user = await axios.post('http://192.168.64.12:31332/api/users', {
          email: email,
          username: name,
          password: password,
          location: gpslocation,
        });

        /*
        const tokenStoreAuth = await axios.post('http://localhost:8080/api/lojas', {
          username: name,
          password: password,
        });
        */


        const token = await axios.post('http://192.168.64.12:31332/api/users/auth',{
          username: name,
          password: password
        })

        // Recebe os dados da base de dados client creado e ja aunticado.
        const u = await axios.get(`http://192.168.64.12:31332/api/users/${name}`)
        navigate('/')
        sessionStorage.setItem('userId', u.data.id);
        sessionStorage.setItem('userName', u.data.name);
        sessionStorage.setItem('email', u.email);
        sessionStorage.setItem('token', token.token)
        console.log(sessionStorage.getItem('userId'))
        console.log(u)
        console.log('Resposta do servidor:', u.data, token.data);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
      }
    };

    return(
        <div className="LoginContainer">
            <div className="navbar">
                <Link to={'/'}className="imageDiv">
                    <img src='https://i.imgur.com/W9y9TP3.png' alt="Logo da mambos" id="logo"/>
                    <span>Mambos da banda</span>
                </Link>
            </div>

            <div className="loginSeccion">
                <div className="loginCardRegister">
                    <h1>Registro</h1>
                    <div id="login">
                        <h2>Nome</h2>
                        <input type="text" value={name} onChange={(e)=> setName(e.target.value)}></input>
                        <h2>Email</h2>
                        <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                        <h2>Password</h2>
                        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                    </div>
                    <button onClick={handleSubmit}> 
                        <span>
                            Entrar
                        </span>
                    </button>

                    <button> 
                        <span>
                            Registar Loja
                        </span>

                    </button>

                    <div className="submit">
                        <Link to={'/Login'} id="link">
                            <span>Ja tem conta ?</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registro