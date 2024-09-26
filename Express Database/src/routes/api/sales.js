const express = require('express');
const router = express.Router();
const sales = require('../../controllers/api/salesAPIController');

router.get("/api/sales/products", sales.products) 

router.get("/api/sales/buyers", sales.buyers)

router.get("/api/sales/topbuyers", sales.topBuyers)

router.get("/api/sales/topbought", sales.topBought)

module.exports = router