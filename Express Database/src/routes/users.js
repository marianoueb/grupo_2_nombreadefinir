const express = require('express');
const router = express.Router();
const users = require('../controllers/usersController');
const path = require('path');
const db = require('../database/models');
const validations = require("../middleware/validations");

const multer = require('multer');
let dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        cb(null, path.resolve(__dirname,"../../public/img","users"))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})
const upload = multer({storage:dest});

router.get("/users/",users.index) // Listado de usuarios

router.get("/register/",users.create) // Registro de usuarios

router.get("/users/:id",users.show) // Vista del perfil de un usuario

router.get("/users/:id/edit",users.edit) // Edición del perfil
 
router.post("/register/", upload.single("avatar"), validations.register, users.save) // Envío del formulario de registro

router.post("/users/:id/edit", [upload.single("avatar")], validations.updateProfile,users.update) // Envío del formulario de edición

router.get("/login/", users.loginForm) // Vista del formulario de login

router.post("/login/", users.loginProcess) // Envío del formulario de login 

router.post("/logout/", users.logout) // Cierre de sesión

router.post("/users/:id/delete", users.delete) // Eliminación de un usuario

router.post("/admin/:id/", users.admin) // Hacer administrador

router.post("/remove/:id/", users.remove) // Quitar administrador

router.post("/owner/:id", users.owner) // Dar rango de creador

module.exports = router