const express = require('express');
const router = express.Router();
const brands = require('../controllers/brandController');

router.get("/brands/",brands.index) // Listado de marcas

// router.get("/product/create",product.create) // Creación de productos (Crud 1/2) (Punto 2)

router.get("/brands/:id",brands.show) // Visualización de los productos de una marca

// router.get("/product/edit/:id",product.edit) // Edición de productos (crUd 1/2) (Punto 5)

// router.post("/product/create", [upload.single("productImage")],product.save) // Envío del formulario de creación (Crud 2/2) (Punto 4)

// router.post("/product/edit/:id", [upload.single("productImage")],product.update) // Envío del formulario de edición (crUd 2/2) (Punto 6)

// router.post("/product/:id/", product.delete) // Eliminación de un producto (cruD 1/1) (Punto 7)

module.exports = router