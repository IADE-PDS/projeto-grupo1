import React, { useState, useEffect } from "react";
import './login.css'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login(){
    
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();
    

  const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Enviando dados para o backend...');

            // Enviar os dados para o backend usando Axios
            const response = await axios.post('http://192.168.64.12:31332/api/users/auth', {
            username: email,
            password: password,
            });
            const user = response.data.user;
            navigate('/');
            sessionStorage.setItem('userId', user.id);
            sessionStorage.setItem('userName', user.name);
            sessionStorage.setItem('email', user.email);
            sessionStorage.setItem('token', user.token)
            console.log(sessionStorage.getItem('userId'));
            console.log(sessionStorage.getItem('userName'));
            console.log(sessionStorage.getItem('email'));
            console.log('Resposta do servidor:', user);
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return(
        <div className="LoginContainer">
            <div className="navbar">
                <Link to={'/'} className="imageDiv">
                    <img src='https://i.imgur.com/W9y9TP3.png'alt="Logo da mambos" id="logo" />
                    <span>Mambos da banda</span>
                </Link>
            </div>
  
            <div className="loginSeccion">
                <div className="loginCardRegister">
                    <h1>Login</h1>
                    <div id="login">
                        <h2>Email</h2>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <h2>Password</h2>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <button onClick={handleSubmit}>
                    <span>
                        Entrar
                    </span>
                    </button>
  
                    <div className="submit">
                        <Link to={'/Registro'} id="link">
                            <span>Não tem uma conta? Registe-se aqui!</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default Login