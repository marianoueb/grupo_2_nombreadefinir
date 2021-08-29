const express = require('express');
const router = express.Router();
const cats = require('../controllers/categoryController');

router.get("/categories/",cats.index) // Listado de categorias

router.get("/categories/:id",cats.show) // Visualización de los productos de una categoria

module.exports = router