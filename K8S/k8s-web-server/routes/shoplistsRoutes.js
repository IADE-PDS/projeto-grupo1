const express = require('express');
const router = express.Router();
const ShopList = require("../models/shoplistsModel");
const auth = require("../middleware/auth");

// Get shoplists of the authenticated user
router.get('/auth',auth.verifyAuth,  async function (req, res, next) {
    try {
        console.log("Get shoplists of the authenticated user");
        let result = await ShopList.getUserShoplists(req.user.id);
        if (result.status != 200)
            res.status(result.status).send(result.result);
        else {
            let shoplists = result.result.map((sl)=> sl.export());
            res.status(200).send(shoplists);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Get a shoplist of the authenticated user
router.get('/auth/:id',auth.verifyAuth,  async function (req, res, next) {
    try {
        console.log("Get a shoplist of the authenticated user");
        let result = await ShopList.getUserShoplist(req.user.id,req.params.id);
        if (result.status != 200)
            res.status(result.status).send(result.result);
        else {
            res.status(200).send(result.result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/auth/buy/:id',auth.verifyAuth,  async function (req, res, next) {
    try {
        console.log("Buy the products inside the shoplist");
        let result = await ShopList.buyShopListProds(req.user.id,req.params.id);
        if (result.status != 200)
            res.status(result.status).send(result.result);
        else {
            res.status(200).send(result.result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


router.post('/auth/:id/items',auth.verifyAuth,  async function (req, res, next) {
    try {
        console.log("Add item to a shoplist of the authenticated user");

        let shopList_id = req.params.id;

        //Check if there is enought products available on the store
        let result = await ShopList.checkQuantityStore(req.body.lojaId, req.body.prodId, req.body.quant);
        if(result.status != 200){
            res.status(result.status).send(result.result);
        }else{
            if(shopList_id=='null'){
                //Create ShopList
                result = await ShopList.createShopList(req.user.id);
                if(result.status == 200){
                    shopList_id = result.result.id;
                }else{
                    res.status(400).send(result.result);
                }
            }
    
            if(result.status == 200){
                result = await ShopList.addItem(req.user.id, shopList_id,
                                                    req.body.prodId,
                                                    req.body.quant,
                                                    req.body.lojaId);
                if (result.status != 200)
                    res.status(result.status).send(result.result);
                else {
                    res.status(200).send({result: shopList_id});
                }
            }
        }

        
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});



router.get('/bought',  async function (req, res, next) {
    try {
        console.log("Get purchases from a user");
        let result = await ShopList.getUserPurchases(req.user.id);
        if (result.status != 200)
            res.status(result.status).send(result.result);
        else {
            res.status(200).send(result.result);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/purchases/:id', async function(req, res, next){

    let purchases = req.params.id;
    try {
        console.log(`Sending compras do utilizador by id: ${purchases}`);
        
        let result = await ShopList.getCompras(req.params.id);
        res.status(result.status).send(result.result);
    } catch (error) {
        console.log(error)
    }
});

router.get('/getcart', async function(req, res, next){
    try {

        let result = await ShopList.getCartProducts();
        res.status(result.status).send(result.result);
    } catch (error) {
        console.log(error)
    }
});

router.post('/purchased', async function (req, res, next) {
    try {
        const userID = req.body.userID; // Ajuste conforme a estrutura do seu objeto no frontend
        const products = req.body.products; // Ajuste conforme a estrutura do seu objeto no frontend

        const result = await ShopList.purchase(userID, products); // Chame a função de compra

        if (result.status === 200) {
            res.status(200).send(result.result); // Envie o ID da compra em caso de sucesso
        } else {
            res.status(500).send(result.result); // Envie a mensagem de erro em caso de falha
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message); // Envie a mensagem de erro em caso de exceção
    }
});

router.post('/add-to-cart', async (req, res) => {
    const products = req.body;  // Isso deve ser uma lista de produtos

    if (!Array.isArray(products)) {
        return res.status(400).send({ error: 'Products should be an array.' });
    }

    // Excluir todos os registros existentes na tabela carrinho
    await ShopList.clearCart();

    // Inserir os novos produtos no carrinho
    for (const product of products) {
        const { produto_id, quantidade, preco, loja_id, loja_nome } = product;
        await ShopList.addTocart(produto_id, quantidade, preco, loja_id, loja_nome);
    }

    res.status(200).send({ message: 'Produtos adicionados ao carrinho com sucesso!' });
});




module.exports = router;