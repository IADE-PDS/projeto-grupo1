import React from "react";
import './carrinho.css'

function CartItem(props){

    const {prod_id, prod_nome, prod_preço, produto_img_url,loja_nome} = props.data;
    return(
        <div className="cartItem">
            <img src={produto_img_url}></img>
            <div className="description">
                <p>
                    {""}
                    <b>{prod_nome}</b>
                </p>
                <p>€{prod_preço}</p>
            </div>
        </div>
    )
}

export default CartItem