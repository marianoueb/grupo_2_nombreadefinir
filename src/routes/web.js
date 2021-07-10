const express = require("express");
const app = express.Router();
const fs = require("fs");
const path = require("path");
const footer = require('../../controllers/footer.js')
const head = require('../../controllers/head.js')
const header = require('../../controllers/header.js')
const index = require('../../controllers/index.js')
const login = require('../../controllers/login.js')
const productCart = require('../../controllers/productCart.js')
const productDetails = require('../../controllers/productDetails.js')
const register = require('../../controllers/register.js')

app.get("/", index);
app.get("/login/", login);
app.get("/register/", register);
app.get("/productCart/", productCart);
app.get("/productDetails/", productDetails);


/* app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, "../views/index.html")))
app.get("/productDetails/", (req, res) => res.sendFile(path.resolve(__dirname, "../views/productDetails.html")))
app.get("/productCart/", (req, res) => res.sendFile(path.resolve(__dirname, "../views/productCart.html")))
app.get("/register/", (req, res) => res.sendFile(path.resolve(__dirname, "../views/register.html")))
app.get("/login/", (req, res) => res.sendFile(path.resolve(__dirname, "../views/login.html"))) */

// Adicional para poder redirigir los enlaces al home
/* app.get("/home/", (req, res) => res.sendFile(path.resolve(__dirname, "../views/index.html"))) */

module.exports = app;


