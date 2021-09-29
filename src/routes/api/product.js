const express = require('express');
const router = express.Router();
const product = require('../../controllers/api/productAPIController');

router.get("/api/products/",product.index) 

router.get("/api/product/:id",product.show) 

module.exports = router