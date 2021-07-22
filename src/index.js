const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const method = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"))

app.set("port",process.env.PORT || 3000)
app.listen(app.get("port"), () => console.log("Server started http://localhost:"+app.get("port")))

app.use(express.static(path.resolve(__dirname, "../public")));

const main = require('./routes/web');
app.use(main);

const product = require('./routes/product');
app.use(product)
