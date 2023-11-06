const pool = require("../config/database");

function dbProdToProd (prod) {
    return new Product(prod.prod_id,prod.prod_nome,prod.img_url,prod.descricao);
}

class Product {
    constructor(id,nome,imgUrl, descricao) { 
        this.id = id;
        this.name = nome;
        this.imgUrl = imgUrl;
        this.descricao = descricao;

        this.preco = null;
        this.quantidade = null;
    }

   
//todos os produtos
    static async getProducts() {
        try {
            let dbResult = await pool.query("Select * from produto");
            let dbProducts = dbResult.rows; 
            let prods = [];
            for (let dbProd of dbProducts) {
                prods.push(dbProdToProd(dbProd));
            }
            return {status:200, result: prods};
        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }

    //produto pelo id
    static async getProduct(prod_id){ 
        try {
            let dbResult = await pool.query("Select * from produto where prod_id="+prod_id);
            let dbProducts = dbResult.rows;
           
            if(dbProducts.length > 0){
                return {status:200, result: dbProdToProd(dbProducts[0])};
            }else{
                return {status:404, result: {msg: "Something went wrong."}};
            }

        } catch (err) {
            console.log(err);
            return {status: 500, result: {msg: "Something went wrong."}};
        }
    }

    setPrice(preco){
        this.preco = preco;
    }

    getPrice(){
        return this.preco;
    }

    setQuantidade(quantidade){
        this.quantidade = quantidade;
    }

    getQuantidade(){
        return this.quantidade; 
    }

    //Procurar produto
static async getAllProducts(nome) {
    try {
      let dbResult = await pool.query("SELECT * FROM produto WHERE prod_nome ILIKE '%"+nome+"%'");
      let dbProducts = dbResult.rows;
      let prods = [];
      for (let dbProd of dbProducts) {
        prods.push(dbProdToProd(dbProd));
      }
      return { status: 200, result: prods };
    } catch (err) {
      console.log(err);
      return { status: 500, result: { msg: "Ocorreu um erro." } };
    }
  }
  
    
}


    
module.exports = Product;
