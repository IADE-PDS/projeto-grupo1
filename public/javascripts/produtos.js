
async function produtos() {
   

    try {
        
        //listagem de produtos
        let res = await getAllProducts();
        if (res.status) {
            console.log("sucesso!"); 

            const products_section = document.getElementById("Listagem");
            while(products_section.firstChild){
                products_section.removeChild(products_section.firstChild);
            }


            console.log(res.produtos);
            res.produtos.forEach(produto => {
                let id = produto.id;
                let name = produto.name;
                let img_url = produto.imgUrl;
                let descricao = produto.descricao;

            

                const product_link = document.createElement("a");
                product_link.href = "produto/"+id;


                const product_section = document.createElement("section");
                product_section.classList.add("lista_produto");

                const image = document.createElement("img");
                image.classList.add("imagem_produto");
                image.src = img_url;


                const text_area = document.createElement("section");
                text_area.classList.add("product_text_area");


                const product_name = document.createElement("p");
                product_name.classList.add("nome_produto");
                product_name.innerHTML = name;

                const descricao_produto = document.createElement("p");
                descricao_produto.classList.add("descricao_produto");
                descricao_produto.innerHTML = descricao;

                product_section.appendChild(image);
                text_area.appendChild(product_name);
                text_area.appendChild(descricao_produto);
                product_section.appendChild(text_area);

                product_link.appendChild(product_section);

                products_section.appendChild(product_link);

            }); 
        } else {
            console.log("erro no pedido de produtos!");
        }      
    } catch (err) {
        console.log(err);
        console.log( "Ocorreu um erro ao pedir informação do produto ");   
    }

    
}

//produto especifico
async function obtem_produto(){
    try {
        
        let baseUrl = window.location.origin;
        console.log("baseUrl: "+baseUrl);
        let res = await getProduct(); 
        if (res.status) {
            console.log("sucesso!");
            console.log(res.produto);

            const produto = res.produto;
            const products_section = document.getElementById("Listagem");


            let name = produto.name;
            let img_url =  baseUrl + "/" + produto.imgUrl;
            let descricao = produto.descricao;

            const product_section = document.createElement("section");
            product_section.classList.add("lista_produto");

            const image = document.createElement("img");
            image.classList.add("imagem_produto");
            image.src = img_url;


            const text_area = document.createElement("section");
            text_area.classList.add("product_text_area");


            const product_name = document.createElement("p");
            product_name.classList.add("nome_produto");
            product_name.innerHTML = name;

            

            const descricao_produto = document.createElement("p");
            descricao_produto.classList.add("descricao_produto");
            descricao_produto.innerHTML = descricao;

            product_section.appendChild(image);

            
            text_area.appendChild(product_name);
            text_area.appendChild(descricao_produto);
            product_section.appendChild(text_area);

            products_section.appendChild(product_section);
        
            
             
        } else {
            console.log("erro no pedido de produtos!");
        }      
    } catch (err) {
        console.log(err);
        console.log( "Ocorreu um erro ao pedir a listagem dos produtos");   
    }
    
}
