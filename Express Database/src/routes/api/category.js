const express = require('express');
const router = express.Router();
const category = require('../../controllers/api/categoryAPIController');

router.get("/api/categories/",category.index) 

router.get("/api/category/:id",category.show) 

router.get("/api/categories/most", category.biggerCategory)

module.exports = router