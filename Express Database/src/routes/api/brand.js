const express = require('express');
const router = express.Router();
const brand = require('../../controllers/api/brandAPIController');

router.get("/api/brands/",brand.index) 

router.get("/api/brand/:id",brand.show) 

router.get("/api/brands/most", brand.biggerBrand) 

module.exports = router