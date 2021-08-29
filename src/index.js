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
app.use(express.json());

const methodOverride = require('method-override');
app.use(methodOverride("_method"))

const session = require("express-session");
app.use(session({ 
    secret: "Secreto!",
    resave: false,
    saveUninitialized: false
}))

const cookieParser = require("cookie-parser")
app.use(cookieParser()) 

const loginMiddleware = require("./middleware/loginMiddleware")
app.use(loginMiddleware);

const recordarMiddleware = require("./middleware/recordarMiddleware")
app.use(recordarMiddleware);

const main = require('./routes/web');
app.use(main);

const product = require('./routes/product');
app.use(product)

const users = require("./routes/users");
app.use(users)

const brands = require("./routes/brands");
app.use(brands)

const cats = require("./routes/categories");
app.use(cats)
