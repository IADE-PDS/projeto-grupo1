
window.onload = async function () {
    try{

        let result = await checkAuthenticated(true);
        if (result.err) throw result.err;

    
    } catch(err) {
        console.log(err);
    }
    
}



async function comprar(){

    let slId = sessionStorage.getItem("shoplistId");
    if(slId=="null" || slId==null){
        alert("Não exitem produtos no carrinho");
    }else{

        let res = await requestPurchaseItems(slId);
        alert(res.result.msg);
        if(res.successful){
            sessionStorage.setItem("shoplistId", null);
        }
        
    }
}

async function getItems(){
    let slId = sessionStorage.getItem("shoplistId");
    if(slId=="null" || slId==null){
        alert("Não exitem produtos no carrinho");
    }else{
        let res = await requestGetItems(slId);
        
        if(res.successful){
            console.log(res.items);

                        // Create table element
            const table = document.createElement('table');

            // Create table header row
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            // Create table headers
            const headers = ['Nome do Produto', 'Nome da Loja', 'Quantidade', 'Preço por Unidade', 'Preço total'];
            headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
            });

            // Append header row to the table
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create table body
            const tbody = document.createElement('tbody');

            // Sample data for the table
            const data = [];
            res.items.items.forEach( (item) => {
                data.push({produto: item.nameProd, loja: item.nameLoja, quantidade: item.quant, preco_por_un: item.preco, preco_total: item.preco * item.quant });
            });
            

            // Create table rows and cells for each data item
            data.forEach(item => {
                const row = document.createElement('tr');

                // Create cells and populate with data
                Object.values(item).forEach(value => {
                    const cell = document.createElement('td');
                    cell.textContent = value;
                    row.appendChild(cell);
            });

            // Append row to the table body
            tbody.appendChild(row);
            });

            // Append table body to the table
            table.appendChild(tbody);

            // Append table to the document body
            document.body.appendChild(table);

            const button = document.createElement('button');

            // Set button text
            button.textContent = 'Comprar';

            // Add button click event listener
            button.addEventListener('click', function() {
                comprar();
            });

            // Append button to the document body
            document.body.appendChild(button);

        }

    }

}


async function addItem(lojaId) {

    

    const productId = parseInt(window.location.pathname.split('/').pop()); 
    const quant = parseFloat(document.getElementById("prod_quantidade_"+lojaId).value);
    //alert("adicionar "+quant+" ao carrinho do produto "+productId);

    if (isNaN(quant)) {
        alert("Introduza uma quantidade para o produto.");
    }
    //sessionStorage.setItem("shoplistId", null);
    let slId = sessionStorage.getItem("shoplistId");
    
    console.log(slId);
    let res = await requestAddItem(slId,productId,quant, lojaId);
    if(res.successful){
        console.log("shoplist_id: "+ res.result.result);
        alert("Produto adicionado com successo.");
        //alert("Adicionei o Item à shoplist: "+ res.result.result);
        if(slId=="null" || slId == null){
            sessionStorage.setItem("shoplistId", parseInt(res.result.result));
        }
    }else{
        if(res.failure){
            alert(res.result.msg);
        }
    }

    
} 