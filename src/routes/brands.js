const express = require('express');
const router = express.Router();
const brands = require('../controllers/brandController');
const path = require('path');

const multer = require('multer');
let dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        if(extension.indexOf("jpg") > 0){
            cb(null, path.resolve(__dirname,"../../public/img","brands"))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})
const upload = multer({storage:dest});

router.get("/brands/",brands.index) // Listado de marcas

router.get("/brands/create",brands.create) // Formulario de creación de la marca

router.get("/brands/:id",brands.show) // Visualización de los productos de una marca


router.post("/brands/created", [upload.single("logo")],brands.save) // Guardado de la marca nueva

router.post("/brands/deleted/:id", brands.delete) // Eliminación de la marca

module.exports = router