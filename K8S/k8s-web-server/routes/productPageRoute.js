const express = require('express');
const router = express.Router();
const path = require('path');

// passa o caminho de produto.html
router.get('',  async function (req, res, next) {
    try {
        res.sendFile(path.join(__dirname, '../public', 'produto.html'));
    } catch (err) {
        console.log(err);
        res.status(500).send(err); 
    }
});


module.exports = router;