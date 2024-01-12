const express = require('express');
const router = express.Router();
const User = require("../models/usersModel");
const utils = require("../config/utils");
const auth = require("../middleware/auth");
const tokenSize = 64;


// Get information about the authenticated user (only the name)
router.get('/auth',auth.verifyAuth,  async function (req, res, next) {
    try {
        console.log("Get authenticated user");
        let result = await User.getById(req.user.id);
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        let user = new User();
        // sendig only the name
        user.id = result.result.id
        user.name = result.result.name;
        user.email = result.result.email;
        user.token = result.result.token
        res.status(result.status).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// get created user by name
router.get('/:name', async function (req, res, next) {
    try {
        console.log("Get created user");
        let result = await User.getByName(req.params.name);
        if (result.status != 200) 
            res.status(result.status).send(result.result);
        let user = new User();
        // sendig only the name
        user.id = result.result.id
        user.name = result.result.name;
        user.email = result.result.email;
        res.status(result.status).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

/*Regist User*/
router.post('', async function (req, res, next) {
    try {
        console.log("Register user "); 
        let user = new User();
        user.email = req.body.email;
        user.pass = req.body.password;
        user.name = req.body.username;
        user.localizacao = req.body.location;
        
        let result = await User.register(user);
        res.status(result.status).send(result.result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.delete('/auth', auth.verifyAuth, async function (req, res, next) {
    try {
        console.log("Logout user ");
        // this will delete everything in the cookie
        req.session = null;
        // Put database token to null (req.user token is undefined so saving in db will result in null)
        let result = await User.saveToken(req.user);
        res.status(200).send({ msg: "User logged out!" });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/auth', async function (req, res, next) {
    try {
        console.log("Login user ");
        let user = new User();
        user.name = req.body.username;
        user.pass = req.body.password;
        let result = await User.checkLogin(user);
        if (result.status != 200) {
            res.status(result.status).send(result.result);
            return;
        }
        // result has the user with the database id
        user = result.result;
        let token = utils.genToken(tokenSize);
        // save token in cookie session
        req.session.token = token;
        // and save it on the database
        user.id = result.result.id
        user.name = result.result.name;
        user.token = token;
        result = await User.saveToken(user);
        res.status(200).send({msg: "Successful Login!", user});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;