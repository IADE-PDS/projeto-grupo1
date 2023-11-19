const express = require('express');
const router = express.Router();
const Product = require("../models/productsModel");
 

  

// Get shoplists of the authenticated user
router.get('',  async function (req, res, next) {
    try { 

        let nome = req.query.search; 

        if(nome != null && nome != "" ){
            
            console.log("Get all products filtered by name");
            let result = await Product.getAllProducts(nome);
            res.status(result.status).send(result.result);
            return;
        }

        console.log("Get all products");
        let result = await Product.getProducts();
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err); 
    } 
});

router.get('/:id',  async function (req, res, next) {

    try{
        console.log("Get product");
        let result = await Product.getProduct(req.params.id);
        res.status(result.status).send(result.result);
    }catch(err){
        console.log(err);
        res.status(500).send(err); 
    }
});

router.get('/predef', async function (req, res, next) {
    try {

         console.log("Get predefined products");
        let result = await Product.getPredefinedProducts(); 
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
