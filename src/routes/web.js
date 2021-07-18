const express = require("express");
const app = express.Router();
const fs = require("fs");
const path = require("path");
const footer = require('../../controllers/footer.js')
const head = require('../../controllers/head.js')
const header = require('../../controllers/header.js')

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

module.exports = app;


