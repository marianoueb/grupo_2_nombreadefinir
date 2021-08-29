const express = require('express');
const router = express.Router();
const brands = require('../controllers/brandController');

router.get("/brands/",brands.index) // Listado de marcas

router.get("/brands/:id",brands.show) // Visualización de los productos de una marca

module.exports = router