//produtos predefinidos
/*async function produtos() {
    try {
        // Limpa a seção de listagem de produtos
        const products_section = document.getElementById("ListagemPred");
        while (products_section.firstChild) {
            products_section.removeChild(products_section.firstChild);
        }

        // Obtém produtos predefinidos
        const response = await fetch("/api/produtos/predefined-products");
        if (response.ok) {
            const produtos = await response.json();

            // Exibe produtos predefinidos na página
            produtos.forEach((produto) => {
                const id = produto.id;
                const name = produto.name;
                const img_url = produto.imgUrl;
                const descricao = produto.descricao;

                const product_link = document.createElement("a");
                product_link.href = "produto/" + id;

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
            console.log("Erro no pedido de produtos predefinidos!");
        }
    } catch (err) {
        console.log(err);
        console.log("Ocorreu um erro ao pedir informações dos produtos predefinidos.");
    }
}

// Chama a função produtos() quando a página é carregada
window.onload = function () {
    produtos();
};*/

async function getPredefinedProducts() {
    const apiUrl = 'https://api/produtos/predefined-products';

    return fetch(apiUrl)
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao obter produtos predefinidos:', error);
            throw error; // Você pode tratar o erro de acordo com as necessidades do seu aplicativo
        });
}

// Função para exibir produtos predefinidos na página
function displayPredefinedProducts() {
    const predefinedProductsList = document.getElementById('predefined-products-list');

    getPredefinedProducts()
        .then(products => {
            // Limpar a lista existente (caso haja)
            predefinedProductsList.innerHTML = '';

            // Adicionar cada produto à lista
            products.forEach(product => {
                const listItem = document.createElement('li');
                listItem.textContent = `${product.name} - ${product.price}`;
                predefinedProductsList.appendChild(listItem);
            });
        });
}

// Chamar a função para exibir produtos predefinidos quando a página estiver carregada
/*document.addEventListener('DOMContentLoaded', displayPredefinedProducts);


window.onload = async function () {
    try {
        let predefinedProducts = await getPredefinedProducts();
        // Do something with predefinedProducts if needed
    } catch (err) {
        console.error("Error fetching predefined products:", err);
    }
};*/
