import React from "react";
import './products.css'

function ProductRender(props){

    const {id, name, descricao, imgUrl} = props.data;
    return(
        <div className="productShow">

            <div className="img">
               <img src={imgUrl} alt="imagem" />
            </div>

            <div className="name">
                {name}
            </div>

            <div className="descricao">
                {descricao}
            </div>

        </div>
    )
}

export default ProductRender