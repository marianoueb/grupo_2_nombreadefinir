const express = require('express');
const router = express.Router();
const users = require('../controllers/usersController');
const path = require('path');

const multer = require('multer');
let dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        if(extension.indexOf("jpg") > 0){
            cb(null, path.resolve(__dirname,"../../public/img","users"))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})
const upload = multer({storage:dest});

router.get("/users/",users.index) // Listado de usuarios

router.get("/register/",users.create) // Registro de usuarios

router.get("/users/:id",users.show) // Vista del perfil de un usuario

router.get("/users/edit/:id",users.edit) // Edición del perfil

router.post("/register/", [upload.single("avatar")],users.save) // Envío del formulario de registro

router.post("/users/edit/:id", [upload.single("avatar")],users.update) // Envío del formulario de edición

router.post("/users/:id/", users.delete) // Eliminación de un usuario

module.exports = router