const express = require('express');
const router = express.Router();
const Loja = require("../models/lojaModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");
const tokenSize = 64;


// Get information about the authenticated user (only the name)
router.get('/auth',auth.verifyAuth,  async function (req, res, next) {
    try {
        console.log("Get authenticated loja"); 
        let result = await Loja.getById(req.loja.id);
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        let loja = new Loja();
        // sendig only the name
        loja.name = result.result.name;
        res.status(result.status).send(loja);
    } catch (err) {
        console.log(err); 
        res.status(500).send(err);
    }
});

router.post('', async function (req, res, next) {
    try {
        console.log("Register loja "); 
        let loja = new Loja();
        loja.name = req.body.name;
        loja.pass = req.body.pass;
        loja.email = req.body.email;
        let result = await Loja.register(loja);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.delete('/auth', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Logout loja ");
        // this will delete everything in the cookie
        req.session = null;
        // Put database token to null (req.user token is undefined so saving in db will result in null)
        let result = await Loja.saveToken(req.loja);
        res.status(200).send({ msg: "Loja logged out!" });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/auth', async function (req, res, next) {
    try {
        console.log("Login loja ");
        let loja = new Loja();
        loja.name = req.body.username;
        loja.pass = req.body.password;
        let result = await Loja.checkLogin(loja);
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
        // result has the loja with the database id
        loja = result.result;
        let token = utils.genToken(tokenSize);
        // save token in cookie session
        req.session.token = token;
        // and save it on the database
        loja.token = token;
        result = await Loja.saveToken(loja);
        res.status(200).send({msg: "Successful Login!"});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


router.get('',  async function (req, res, next) {
    try {
        console.log("Get all lojas");
        let result = await Loja.getLojas();
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err); 
    }
});

router.get('/produto/:id', auth.verifyAuth, async function(req, res, next){

    try {
        console.log("Get lojas dado um produto");
        let result = await Loja.getLojasByProduct(req.params.id, req.user.id);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err); 
    }
});

router.get('/prod/:id', async function(req, res, next){

    let prod_id = req.params.id;
    try {
        console.log(`Sending loja com produto by id: ${prod_id}`);
        
        let result = await Loja.getLojasProduct(req.params.id);
        res.status(result.status).send(result.result);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;