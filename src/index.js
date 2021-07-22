const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const method = require('method-override');

const puerto = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"))

app.listen(puerto, () => console.log("Servidor iniciado exitosamente en el puerto", puerto))

app.use(express.static(path.resolve(__dirname, "../public")));

const main = require('./routes/web');
app.use(main);

const product = require('./routes/product');
app.use(product)
