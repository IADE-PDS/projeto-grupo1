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



router.get('/bought',auth.verifyAuth,  async function (req, res, next) {
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



module.exports = router;