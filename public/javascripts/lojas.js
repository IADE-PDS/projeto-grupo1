




async function lojas() {

    try {
         
        
        let res = await getAllLojas();
        if (res.status) {
            console.log("sucesso!");


            const lojas_section = document.getElementById("Listar");

            console.log(res.lojas);
            res.lojas.forEach(loja => {
                let id = loja.id;
                let name = loja.nome;
                let img_url = loja.img_url;
                let endereco = loja.endereco;
            

                

                const loja_section = document.createElement("section");
                loja_section.classList.add("lista_loja");

                const imagem = document.createElement("img");
                imagem.classList.add("imagem_loja");
                imagem.src = img_url;

                const text_area = document.createElement("section");
                text_area.classList.add("loja_text_area");


                const loja_nome = document.createElement("p");
                loja_nome.classList.add("loja_nome");
                loja_nome.innerHTML = name;

                const loja_endereco = document.createElement("p");
                loja_endereco.classList.add("loja_endereco");
                loja_endereco.innerHTML = endereco;


                loja_section.appendChild(imagem);


                text_area.appendChild(loja_nome);
                text_area.appendChild(loja_endereco);


                loja_section.appendChild(text_area);
                lojas_section.appendChild(loja_section);

            }); 
        } else {
            console.log("erro no pedido de produtos!");
        }      
    } catch (err) {
        console.log(err);
        console.log( "Ocorreu um erro ao pedir a listagem dos produtos");   
    }

}


async function obtem_lojas_produto(){


    try{
        let res = await getLojaByProduct();
        console.log(res);
        

        if(res.status == 200){
            let lojas = res.lojas;
            res.lojas.forEach(loja => {
                let id = loja.id;
                let name = loja.nome;
                let email = loja.email;
                let contacto = loja.contacto;
                let cpostal = loja.cpostal;
                let endereco = loja.endereco;
                let dist = loja.dist;
                let lat = loja.lat;
                let lon = loja.lon;
                let baseUrl = window.location.origin;
                let img_url = baseUrl + "/" + loja.img_url;
                let preco_prod = loja.products[0].preco;
                let quantidade_prod = loja.products[0].quantidade;
    
                /*<section class="lista_produtos" style="padding: 10px;">
                    <img src="imagens/angolanFoods.png"> </img>
                    <p class="nome_produto"> (Nome do produto) </p>
                    <p class="descricao"> (descricao: bla bla bla bla bla bla) </p>
                </section>*/
    
                const lojas_section = document.getElementById("Lojas");
                const div_cont = document.getElementById("div_cont");
    
                const loja_section = document.createElement("section");
                loja_section.classList.add("lista_produto");
    
                const image = document.createElement("img");
                image.classList.add("imagem_produto");
                image.src = img_url;
    
    
                const text_area = document.createElement("section");
                text_area.classList.add("product_text_area");
    
    
                const loja_name = document.createElement("p");
                loja_name.classList.add("nome_produto");
                loja_name.innerHTML = name;
    
                const endereco_loja = document.createElement("p");
                endereco_loja.classList.add("descricao_produto");
                endereco_loja.innerHTML = "endereço: "+endereco + "<br><br>distancia: "+ dist.toFixed(3)+"km<br>latitude: "+lat+"<br>longitude: "+lon;

                const preco_loja = document.createElement("p");
                preco_loja.classList.add("descricao_produto");
                preco_loja.innerHTML = "preço: "+preco_prod+"€";

                const quantidade_loja = document.createElement("p");
                quantidade_loja.classList.add("descricao_produto");
                quantidade_loja.innerHTML = "Em stock: "+ quantidade_prod + " Unidades";

                
                //document.body.appendChild(mapDiv);


                loja_section.appendChild(image);
                    
                text_area.appendChild(loja_name);
                text_area.appendChild(endereco_loja);

                
                text_area.appendChild(preco_loja);
                text_area.appendChild(quantidade_loja);
                loja_section.appendChild(text_area);
                //document.body.appendChild(mapDiv);

                const input = document.createElement("input");
                input.setAttribute("id", "prod_quantidade_"+ id);
                input.setAttribute("type", "text");
                input.setAttribute("placeholder", "Quantidade")

                const add_carrinho = document.createElement("button");
                add_carrinho.innerHTML = "Adicionar ao Carrinho";
                add_carrinho.onclick = function(){
                    addItem(id);
                };
                

                loja_section.appendChild(input);
                loja_section.appendChild(add_carrinho);
    
                lojas_section.appendChild(loja_section);


                const mapDiv = document.createElement('div');
                mapDiv.id = 'map_'+id;
                mapDiv.classList.add("map");
                text_area.appendChild(mapDiv);

                
                var map = L.map('map_'+id).setView([lat, lon], 13);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
                var marker = L.marker([lat, lon]).addTo(map);
                marker.bindPopup("<b>"+name+"</b>").openPopup();
    
            }); 
        }


   
            

        

    }catch(err){
        console.log(err);
        console.log( "Ocorreu um erro ao pedir informação das lojas que têm o produto "); 
    }


}

  