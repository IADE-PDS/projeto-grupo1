const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const Product = require("./productsModel");
const saltRounds = 10;  

function dbLojaToLoja(dbLoja)  {
    let loja = new Loja(dbLoja.loja_id,
                        dbLoja.loja_nome, 
                        dbLoja.loja_email,
                        dbLoja.loja_endereco,
                        dbLoja.loja_telefone,
                        dbLoja.loja_cpostal,
                        dbLoja.img_url);
    
    return loja;
}

class Loja {
    constructor( id, name, email, endereco, contacto, cpostal, img_url) {
        this.id = id;
        this.nome = name;
        this.email = email;
        this.endereco = endereco;
        this.contacto = contacto;
        this.cpostal = cpostal;
        this.img_url = img_url;
        this.products = [];
    }
    export() {
        let loja=new Loja();
        loja.nome = this.nome;
        loja.endereco = this.endereco;
        return loja;  
    }


    static async getById(id, userId) {
        try {
            let dbResult = await pool.query("Select * from loja where loja_id=$1", [id]);
            let dbLojas = dbResult.rows;
            if (!dbLojas.length) 
                return { status: 404, result:{msg: "Sem loja para este id."} } ;
            let dbLoja = dbLojas[0];
                
            dbResult = await pool.query("SELECT ST_Distance(l1.geom, l2.geom) / 1000 AS distance_in_km, ST_X(l1.geom::geometry) AS longitude, ST_Y(l1.geom::geometry) AS latitude FROM (loja inner join localizacoes on loja.localizacao = localizacoes.id) as l1 , (appuser inner join localizacoes on appuser.localizacao = localizacoes.id) as l2 WHERE l1.loja_id = $1 AND l2.usr_id = $2", [id, userId]);
            if(!dbResult.rows.length)
                return { status: 404, result:{msg: "Nao conseguiu obter a distancia para a loja"} } ;
                
            const dist = dbResult.rows[0].distance_in_km;
            const lon = dbResult.rows[0].longitude;
            const lat = dbResult.rows[0].latitude;
            const loja = dbLojaToLoja(dbLoja);
            loja.dist = dist;
            loja.lat = lat;
            loja.lon = lon;

            return { status: 200, result: loja} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }

    static async getLojasByProduct(productId, userId) {
        try{
            let dbResult = await pool.query("Select * from lojaproduto where prod_id_lp=$1", [productId]);
            let dbProdutoLoja = dbResult.rows;
            if (!dbProdutoLoja.length){
                return { status: 404, result:{msg: "Sem lojas para este prod_id."} };
            }

            let lojas = [];
            for (let dbLojaProduto of dbProdutoLoja) {
                const response = await Loja.getById(dbLojaProduto.loja_id_lp, userId);
                if(response.status == 200){
                    const loja = response.result;

                    const product_response = await Product.getProduct(dbLojaProduto.prod_id_lp);
                    if(product_response.status == 200){
                        const produto = product_response.result;
                        produto.setPrice(dbLojaProduto.prod_preco);
                        produto.setQuantidade(dbLojaProduto.prod_quantidade);
                        loja.addProduct(produto);

                        lojas.push(response.result);
                    }
                    
                }else{
                    return { status: 500, result: "Erro na query da loja."}
                }
            }
            return { status: 200, result: lojas} ;

        }catch(err){
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async getLojasProduct(prod_id){

        try {
            
            let sql = `SELECT loja.loja_id, loja.loja_nome, loja.loja_telefone, loja.loja_endereco, loja.loja_cpostal, loja.img_url AS loja_img_url, localizacoes.geom AS loja_localizacao, produto.prod_id, produto.prod_nome, produto.descricao, produto.img_url AS produto_img_url, lojaproduto.prod_preco, lojaproduto.prod_quantidade FROM loja INNER JOIN localizacoes ON loja.localizacao = localizacoes.id INNER JOIN lojaproduto ON loja.loja_id = lojaproduto.loja_id_lp INNER JOIN produto ON lojaproduto.prod_id_lp = produto.prod_id WHERE produto.prod_id = $1`;
            let result = await pool.query(sql,[prod_id]);

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


    static async getLojas(){
        try {
            let dbResult = await pool.query("Select * from loja");
            let dbLojas = dbResult.rows;
            let lojas = [];
            for (let dbLoja of dbLojas) {
                lojas.push(dbLojaToLoja(dbLoja));
            }
            return {status:200, result: lojas};
        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }

    getProducts(){
        return this.products;
    }

    addProduct(Produto){
        this.products.push(Produto);
    }

}
module.exports = Loja;

