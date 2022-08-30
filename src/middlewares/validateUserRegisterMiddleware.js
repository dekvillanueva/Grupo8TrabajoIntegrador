const path = require('path');

const { body } = require("express-validator");

module.exports = [
 
    body("userName")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío")
    .bail()
    .isLength({min: 2})
    .withMessage("EL nombre de usuario debe tener al menos 2 caracteres"),
    body("userEmail")
        .notEmpty()
        .withMessage("Este campo no puede estar vacío")
        .bail()
        .isEmail()
        .withMessage("Debes escribir un un formato de email válido"),
    body("userPassword")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío")
    .bail()
    .isLength({min: 8})
    .withMessage("Debes escribir una contraseña con al menos 8 caracteres")
    .bail(),
    body("userRepitPassword")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío")
    .bail()
    .isLength({min: 8})
    .withMessage("Debes escribir una contraseña con al menos 8 caracteres")
    .bail()
    .custom((value,{req}) =>{
        if(value !== req.body.userPassword){
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    body("avatar").custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".jpeg", ".jpg", ".png", ".gif"];

        if (!file) {

        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son: ${acceptedExtensions.join(", ")}`);
            }
        }
        return true;
    }),
];
