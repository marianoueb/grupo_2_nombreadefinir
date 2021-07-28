const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"))

app.set("port",process.env.PORT || 3000)
app.listen(app.get("port"), () => console.log("Server started http://localhost:"+app.get("port")))

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.urlencoded({extended: false}))

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const methodOverride = require('method-override');
app.use(methodOverride("_method"))

const main = require('./routes/web');
app.use(main);

const product = require('./routes/product');
app.use(product)
