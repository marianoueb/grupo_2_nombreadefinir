const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const puerto = 3000;

app.listen(puerto, () => console.log("Servidor iniciado exitosamente en el puerto", puerto))

app.use(express.static(path.resolve(__dirname, "../public")));

app.use(require("./routes/web.js"));