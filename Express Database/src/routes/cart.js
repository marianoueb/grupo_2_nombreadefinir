const express = require('express');
const router = express.Router();
const cart = require('../controllers/cartController');
const order = require('../controllers/orderController');
const path = require('path');

router.get("/cart",cart.index) // Vista del carrito

router.post("/cart/order", order.create) // Creación de una orden (conjunto de productos relacionados al carrito)

router.get("/cart/clear", cart.clear) // Limpieza total del carrito

router.get("/cart/completed", cart.completed) // Finaliza una compra y crea otro carrito

router.get("/cart/remove/:id", cart.removeOnce) // Elimina un articulo del carrito 

router.get("/cart/add/:id", cart.addOnce) // Añade un punto a la cantidad del producto del carrito

module.exports = router