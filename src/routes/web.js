const express = require("express");
const app = express.Router();
const fs = require("fs");
const path = require("path");

const indexController = require('../controllers/web');
app.get("/", indexController.index);
app.get("/home/", indexController.home);

module.exports = app;