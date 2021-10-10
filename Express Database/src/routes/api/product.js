const express = require('express');
const router = express.Router();
const product = require('../../controllers/api/productAPIController');

router.get("/api/products/",product.index) 

router.get("/api/product/:id",product.show) 

router.get("/api/products/last", product.lastUploaded)

router.get("/api/products/most", product.mostBought)

router.get("/api/products/sold", product.sold)

module.exports = router