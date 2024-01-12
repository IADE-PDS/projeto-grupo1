const pool = require("../config/database");

function dbShopListToShopList(dbsl) {
    return new ShopList(dbsl.shl_id, dbsl.shl_usr_id ,dbsl.shl_created ,dbsl.shl_due);
}

function dbItemToItem(it) {
    if(it.sum_it_quant){
        it.it_quant = it.sum_it_quant;
        it.it_quant = parseInt(it.it_quant);
    }
    return new Item(it.it_shl_id,  it.prod_id, it.it_loja_id, it.it_quant, it.prod_nome, it.prod_preco, it.loja_nome, it.it_id );
}



class Item {
    constructor( shopListId, idProd, lojaId, quant, nameProd, preco, nameLoja, id=0) {
        this.id = id;
        this.quant = quant;
        this.idProd = idProd;
        this.lojaId = lojaId;
        this.shopListId = shopListId;
        this.nameProd = nameProd;
        this.preco = preco;
        this.nameLoja = nameLoja;
    }
}


class ShopList {
    constructor(id,idUser,dateCreated,dateDue) {
        this.id = id;
        this.idUser = idUser;
        this.dateCreated = dateCreated;
        this.dateDue = dateDue;
    }
    export(){
        let sl = new ShopList();
        sl.id = this.id;
        sl.name = this.name;
        sl.dateCreated = this.dateCreated;
        sl.dateDue = this.dateDue;
        return sl;        
    }

    // We consider that the user is authenticated
    static async getUserShoplists(userId) {
        try {
            let dbResult = await pool.query("Select * from shoplist where shl_usr_id = $1", [userId]);
            let dbShoplists = dbResult.rows;
            let shoplists = [];
            for (let dbsl of dbShoplists) {
                shoplists.push(dbShopListToShopList(dbsl));
            }
            return {status:200, result: shoplists};

        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }



    static async buyShopListProds(userId, shoplistId){
        let result = await ShopList.getUserShoplist(userId, shoplistId);
        if (result.status != 200){
            return result;
        }else{
            const items = result.result.items;
            for(let i=0; i<items.length; i++){
                /*Remover a quantidade dos produtos nas respetivas lojas*/
                try{
                    let dbResult = await pool.query(
                        "select * from lojaproduto where loja_id_lp=$1 and prod_id_lp=$2", 
                        [items[i].lojaId,items[i].idProd]);
                
                    if(dbResult.rows.length == 0){
                        return {status:404, result: {msg:"The product does not exists for the store "+items[i].nameLoja}};
                    }
                    
                    const loja_quant = dbResult.rows[0].prod_quantidade;
                    const nova_quant = loja_quant - items[i].quant;
                    if(nova_quant<0){
                        return {status:400, result: {msg:"The store "+items[i].nameLoja+ " has not enough items in stock"}};
                    }
                    dbResult = await pool.query("UPDATE lojaproduto SET prod_quantidade = $3 WHERE loja_id_lp=$1 and prod_id_lp=$2",[items[i].lojaId,items[i].idProd, nova_quant]);
                    

                    /*Adicionar a nossa shoplist à tablea compra*/
                    dbResult = await pool.query(
                        `Insert into compra(compra_shl_id,compra_data)
                         values($1,now())`, [shoplistId]);

                    dbResult = await pool.query(`UPDATE shoplist SET shl_due = now() WHERE shl_id=$1`, [shoplistId]);

                }catch(err) {
                    console.log(err);
                    return {status: 500, result: {msg: "Something went wrong."}};
                }
            }
            return {status:200, result: {msg: "Your purchase was successfully processed."}}
        }
    }

    static async getUserShoplist(userId,shoplistId) {
        try {
            let dbResult = await pool.query(
                "Select * from shoplist where shl_usr_id = $1 and shl_id = $2", 
                [userId,shoplistId]);
            if (dbResult.rows.length == 0) {
                return {status:404, result: {msg:"That shoplist does not exist on your collection."}};
            }
            let shoplist = dbShopListToShopList(dbResult.rows[0]);
            shoplist.items = [];
            // Falta a parte de contar quantos produtos temos comprados

//item (id, shopListId, idProd, lojaId, quant)

            let dbItems = await pool.query(
                `SELECT item.it_shl_id,  produto.prod_id, item.it_loja_id, produto.prod_nome, lojaproduto.prod_preco, loja.loja_nome, SUM(item.it_quant) AS sum_it_quant
                FROM item
                inner join produto on it_prd_id = prod_id
                inner join lojaproduto on prod_id = prod_id_lp and it_loja_id = loja_id_lp
                inner join loja on it_loja_id = loja_id
                WHERE item.it_shl_id = $1
                GROUP BY item.it_shl_id, item.it_loja_id, produto.prod_id, lojaproduto.prod_preco, loja.loja_nome;`,  [shoplistId]);
                
            for(let dbit of dbItems.rows) {
                shoplist.items.push(dbItemToItem(dbit));
            }

            return {status:200, result: shoplist};

        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }

    static async checkQuantityStore(lojaId, prodId, quant){
        let dblojaproduto = await pool.query(`Select * from lojaproduto where loja_id_lp = $1 and prod_id_lp = $2`, [lojaId, prodId]);
        if(!dblojaproduto.rows.length){
            return {status: 404, result: {msg: "Product not found on the store"}};
        }
        let loja_p = dblojaproduto.rows[0];
        let quantidade_loja = loja_p.prod_quantidade;

        if(quantidade_loja >= quant){
            return {status: 200, result: {msg: "There is enought quantity in stock."}};
        }else{
            return {status: 400, result: {msg: "You cannot add more quantity than the available store's quantity."}}; 
        }
         
    }

    static async getCompras(userID){

        try {
            
            let sql = `SELECT 
            c.id_compra,
            c.id_utilizador,
            c.data_compra,
            p.prod_nome,
            cp.quantidade,
            p.img_url,
            cp.total
        FROM 
            buy c
        JOIN 
            buy_produto cp ON c.id_compra = cp.id_compra
        JOIN 
            produto p ON cp.id_produto = p.prod_id
        WHERE 
            c.id_utilizador = $1;`;

            let result = await pool.query(sql,[userID]);

            if (result.rows.length > 0) {
                return { status: 200, result: result.rows };
            } else {
                return { status: 404, result: { msg: 'Produto não encontrado' } };
            }
            
        } catch (error) {
            
            console.log(error);

            return {

                status: 500, result: error
            };
        }
    }

    static async purchase(userID, products) {
        const client = await pool.connect();
        
        try {
            // Iniciar uma transação
            await client.query('BEGIN');
        
            // Inserir a compra e obter o ID da compra
            const buyQuery = `INSERT INTO buy (id_utilizador) VALUES ($1) RETURNING id_compra;`;
            const buyResult = await client.query(buyQuery, [userID]);
            const buyId = buyResult.rows[0].id_compra;
        
            // Inserir os produtos na tabela buy_produto
            for (const product of products) {
                const { id_produto, quantidade, total } = product;
                const buyProdutoQuery = `
                    INSERT INTO buy_produto (id_compra, id_produto, quantidade, total)
                    VALUES ($1, $2, $3, $4);
                `;
                await client.query(buyProdutoQuery, [buyId, id_produto, quantidade, total]);
            }
        
            // Commit da transação
            await client.query('COMMIT');
        
            return { status: 200, result: { id_compra: buyId } }; // Retorna o ID da compra
        } catch (error) {
            // Rollback da transação em caso de erro
            await client.query('ROLLBACK');
            console.error(error);
            return { status: 500, result: error.message }; // Retorna uma mensagem de erro
        } finally {
            // Liberar o cliente do pool
            client.release();
        }
    }

    static async addTocart(produto_id, quantidade, preco, loja_id, loja_nome){
        try {
            const existingProduct = await pool.query(
              'SELECT * FROM carrinho WHERE produto_id = $1 AND loja_id = $2',
              [produto_id, loja_id]
            );
        
            if (existingProduct.rows.length > 0) {
              await pool.query(
                'UPDATE carrinho SET quantidade = quantidade + $1 WHERE produto_id = $2 AND loja_id = $3',
                [quantidade, produto_id, loja_id]
              );
            } else {
              await pool.query(
                'INSERT INTO carrinho (produto_id, quantidade, preco, loja_id, loja_nome) VALUES ($1, $2, $3, $4, $5)',
                [produto_id, quantidade, preco, loja_id, loja_nome]
              );
            }
            return { success: true, message: 'Produto(s) adicionado(s) ao carrinho com sucesso!' };
        } catch (error) {
            console.error(error);
            return { success: false, error: 'Erro ao adicionar produto(s) ao carrinho.' };
        }
    }
    
    
    // Dentro da sua classe ou módulo do ShopList, adicione a função clearCart
    static async clearCart() {
    try {
        // Executar a consulta SQL para deletar todos os registros da tabela carrinho
        await pool.query('DELETE FROM carrinho');
        
        return { success: true, message: 'Carrinho limpo com sucesso!' };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Erro ao limpar o carrinho.' };
    }
}

    



    static async getCartProducts(){

        try {
            
            let sql = `select * from carrinho`;
            let result = await pool.query(sql);

            if (result.rows.length > 0) {
                return { status: 200, result: result.rows };
            } else {
                return { status: 404, result: { msg: 'Produto não encontrado' } };
            }
            
        } catch (error) {
            
            console.log(error);

            return {

                status: 500, result: error
            };
        }
    }

    
    



    static async createShopList(userId) {
        const date = new Date();

        let dbResult = await pool.query(
            `Insert into shoplist(shl_usr_id,shl_created)
             values($1,$2)`, [userId, date]);

        let dbShopList = await pool.query(`Select * from shoplist where shl_usr_id = $1 and shl_created = $2`, [userId, date]);
        if(!dbShopList.rows.length){
            return {status: 404, result: {msg: "Could not create shoplist on database."}};
        }
        
        return {status:200, result: dbShopListToShopList(dbShopList.rows[dbShopList.rows.length -1])};

    }


    
    static async addItem(userId, shopListId, prodId, quantity, lojaId) {
        try {
            // Todo: verifications
            // - if the user owns the shopLsit
            // - if prodId and unitId exist
            // - if quantity is valid
     
            let dbResult = await pool.query(
                `Insert into item(it_shl_id,it_prd_id,it_quant, it_loja_id)
                 values($1,$2,$3,$4)`, [shopListId,prodId,quantity, lojaId]);
            return {status:200, result: dbResult};

        } catch (err) {
            console.log(err); 
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }

    static async getUserPurchases(userId){
        try {
            let dbResult = await pool.query("select DISTINCT ON (shl.shl_id) shl.shl_id, com.compra_data from compra as com INNER JOIN shoplist as shl ON com.compra_shl_id = shl.shl_id Where shl.shl_usr_id = "+ userId);
            if(dbResult.rows.length > 0){

                let compras = [];

                for(const dbEntry of dbResult.rows){
                    const shoplistId = dbEntry.shl_id;
                    const items = (await ShopList.getUserShoplist(userId,shoplistId)).result.items;
                    const compra_data = dbEntry.compra_data;

                    const date = new Date(compra_data);

                    // Get the day, month, and year components from the date object
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
                    const year = String(date.getFullYear());

                    // Construct the date string in the desired format (dd/mm/yyyy)
                    const formattedDate = `${day}/${month}/${year}`;

                    compras.push({date: formattedDate,items: items});
                }

                return {status:200, result: compras}

            }else{
                return {status:404, result: {msg: "There is no purchases for this user."}}
            }


        }catch(err){
            console.log(err); 
            return {status: 500, result: {msg: "Something went wrong."}};
        }

    }

}

module.exports = ShopList;