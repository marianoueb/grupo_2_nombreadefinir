const express = require('express');
const router = express.Router();
const product = require('../../controllers/api/productAPIController');

router.get("/api/product/",product.index) 

router.get("/api/product/:id",product.show) 

module.exports = router