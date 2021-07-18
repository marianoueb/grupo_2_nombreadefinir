const express = require("express");
const app = express.Router();
const fs = require("fs");
const path = require("path");

const indexController = require('../../controllers/index');
app.get("/", indexController.index);

const login = require('../../controllers/login.js')
app.get("/login/", login.index);

const productCart = require('../../controllers/productCart.js')
app.get("/productCart/", productCart.index);

const productDetails = require('../../controllers/productDetails.js')
app.get("/productDetails/", productDetails.index);

const register = require('../../controllers/register.js')
app.get("/register/", register.index);

const createProduct = require("../../controllers/createProduct.js")
app.get("/create/", createProduct.index);

const editProduct = require("../../controllers/editProduct.js")
app.get("/edit/", editProduct.index);

module.exports = app;


