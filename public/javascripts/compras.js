

async function obtem_compras(){
    let result = await requestCompras();
    console.log(result);


    if(result.successful){

        for(const compra of result.compras){
            const compra_data = compra.date;
            const items = compra.items;

            console.log(compra_data);
            console.log(items);

            // Create table element

            const compra_section = document.createElement('section');

            const table = document.createElement('table');

            const date_elem = document.createElement('p');
            date_elem.textContent = compra_data;

            compra_section.appendChild(date_elem);

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
            items.forEach( (item) => {
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
            compra_section.appendChild(table);

            document.body.appendChild(document.createElement("br"));
            document.body.appendChild(compra_section);
            document.body.appendChild(document.createElement("br"));
        }
    }

}