import React from "react"
import { Link } from "react-router-dom"
import './navbar.css'


function Navbar(){
    return(
        <div className="navbar">
            <Link to={'/'}className="imageDiv">
                <img src='https://i.imgur.com/W9y9TP3.png' alt="Logo da mambos" id="logo"/>
                <span>Mambos <br></br> da banda</span>
            </Link>
            <div className="links">
                <Link to={'/Login'}>Login</Link>
                <Link to={'/Registro'}>Registro</Link>
                <Link to={'/About'}>About us</Link>
            </div>
        </div>
    )
}

export default Navbar