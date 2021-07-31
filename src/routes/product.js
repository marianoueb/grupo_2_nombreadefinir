const express = require('express');
const router = express.Router();
const product = require('../controllers/product');
const path = require('path');

const multer = require('multer');
let dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        if(extension.indexOf("jpg") > 0){
            cb(null, path.resolve(__dirname,"../../public/img","products"))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})
const upload = multer({storage:dest});

router.get("/product/",product.index) // Listado de productos (cRud 1/2) (Punto 1)

router.get("/product/create",product.create) // Creación de productos (Crud 1/2) (Punto 2)

router.get("/product/:id",product.show) // Visualización de un producto individual (cRud 2/2) (Punto 3)

router.get("/product/edit/:id",product.edit) // Edición de productos (crUd 1/2) (Punto 5)

router.post("/product/create", [upload.single("productImage")],product.save) // Envío del formulario de creación (Crud 2/2) (Punto 4)

router.post("/product/edit/:id", [upload.single("productImage")],product.update) // Envío del formulario de edición (crUd 2/2) (Punto 6)

router.post("/product/:id/", product.delete) // Eliminación de un producto (cruD 1/1) (Punto 7)

module.exports = router