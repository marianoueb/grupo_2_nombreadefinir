const path = require('path');
const db = require('../database/models');
const { body, validationResult } = require("express-validator");

const validations = {
    register: [
        body("name")
            .notEmpty().withMessage("El campo de nombre no puede estar vacío").bail()
            .isLength({ min: 2 }).withMessage("El nombre debe tener al menos dos caracteres"),
        body("surname")
            .notEmpty().withMessage("El campo de apellido no puede estar vacío").bail()
            .isLength({ min: 2 }).withMessage("El apellido debe tener al menos dos caracteres"),
        body("email")
            .notEmpty().withMessage("El campo de email no puede estar vacío").bail()
            .isEmail().withMessage("El email debe ser válido")
            .custom( async (value, { req }) => {
                let user = await db.User.findOne({
                    where: {
                        email: req.body.email
                    }
                }).then(result => {return result}).catch(error => {console.log(error)})
    
                if (user) {
                    throw new Error("El email ingresado ya se encuentra registrado")
                }
                return true
            }),
        body("password")
            .notEmpty().withMessage("El campo de contraseña no puede estar vacío").bail()
            .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos ocho caracteres"),
        body("tel")
            .notEmpty().withMessage("El campo de apellido no puede estar vacío").bail()
            .isNumeric().withMessage("El teléfono debe contener números unicamente").bail()
            .isLength({ min: 10 }).withMessage("El teléfono debe tener al menos diez caracteres"),
        body("avatar").custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = [".jpg",".png",".gif"];
    
            if (!file){
                throw new Error("Tienes que subir una imagen");
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error("La única extensión de archivo permitida es jpg")
                }
            }
            return true
        })
    ],
    updateProfile: [
        body("name")
            .notEmpty().withMessage("El campo de nombre no puede estar vacío").bail()
            .isLength({ min: 2 }).withMessage("El nombre debe tener al menos dos caracteres"),
        body("surname")
            .notEmpty().withMessage("El campo de apellido no puede estar vacío").bail()
            .isLength({ min: 2 }).withMessage("El apellido debe tener al menos dos caracteres"),
        body("email")
            .notEmpty().withMessage("El campo de email no puede estar vacío").bail()
            .isEmail().withMessage("El email debe ser válido"),
        body("tel")
            .notEmpty().withMessage("El campo de apellido no puede estar vacío").bail()
            .isNumeric().withMessage("El teléfono debe contener números unicamente").bail()
            .isLength({ min: 10 }).withMessage("El teléfono debe tener al menos diez caracteres"),
        body("avatar").custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = [".jpg",".png",".gif", ".jpeg"];
    
            if (!file){
                throw new Error("Tienes que subir una imagen");
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error("La única extensión de archivo permitida es jpg")
                }
            }
            return true
        })
    ],
    createProduct: [
        body("name")
            .notEmpty().withMessage("El campo del nombre del producto no puede estar vacío").bail()
            .isLength({ min: 5 }).withMessage("El nombre del producto debe tener al menos cinco caracteres"),
        body("description")
            .notEmpty().withMessage("El campo de descripción no puede estar vacío").bail()
            .isLength({ min: 20 }).withMessage("La descripción del producto debe tener al menos veinte caracteres"),
        body("price")
            .notEmpty().withMessage("El campo de precio no puede estar vacío").bail()
            .isNumeric().withMessage("El precio debe contener números unicamente").bail(),
        body("image").custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = [".jpg",".png",".gif", ".jpeg"];
    
            if (!file){
                throw new Error("Tienes que subir una imagen");
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error("La extensiones permitidas de archivo permitidas son .jpg, .png y .gif")
                }
            }
            return true
        })
    ],
    updateProduct: [
        body("name")
            .notEmpty().withMessage("El campo del nombre del producto no puede estar vacío").bail()
            .isLength({ min: 5 }).withMessage("El nombre del producto debe tener al menos cinco caracteres"),
        body("description")
            .notEmpty().withMessage("El campo de descripción no puede estar vacío").bail()
            .isLength({ min: 20 }).withMessage("La descripción del producto debe tener al menos veinte caracteres"),
        body("price")
            .notEmpty().withMessage("El campo de precio no puede estar vacío").bail()
            .isNumeric().withMessage("El precio debe contener números unicamente").bail(),
        body("image").custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = [".jpg",".png",".gif", ".jpeg"];
    
            if (!file){
                throw new Error("Tienes que subir una imagen");
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error("La extensiones permitidas de archivo permitidas son .jpg, .png y .gif")
                }
            }
            return true
        })
    ],
    createBrand: [
        body("brand")
            .notEmpty().withMessage("El campo de nombre de la marca no puede estar vacío"),
        body("logo").custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = [".jpg",".png",".gif", ".jpeg"];
    
            if (!file){
                throw new Error("Tienes que subir una imagen");
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error("La extensiones permitidas de archivo permitidas son .jpg, .png y .gif")
                }
            }
            return true
        })
    ]
}

module.exports = validations