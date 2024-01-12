import React, { useState, useEffect } from "react";
import axios from 'axios'
import {useSelector} from 'react-redux'

function PayButton({itensCarrinho}){

    const handleCheckout = async () =>{

        await axios.post('http://192.168.64.12:31332/api/stripe/create-checkout-session',{
            name: 'Loengo',
            images: ["https://i.imgur.com/zCxcC6V.jpg"],
        }).then((res) => {
            if(res.data.url){
                window.location.href = res.data.url
            }

        }).catch((error)=> console.log(error.message))
    }
    
    

    return(
        <div className="card-header-positioner">
            <button  id="Botao-compra" onClick={() => handleCheckout()}>
                <span>Checkout</span>
            </button>
        </div>
    )
}

export default PayButton