const path = require('path');

const { body } = require("express-validator");

module.exports = [
 
    body("email")
        .notEmpty()
        .withMessage("Debes escribir una dirección de email")
        .bail()
        .isEmail()
        .withMessage("Debes escribir un un formato de email válido"),
    body("password").notEmpty().withMessage("Debes escribir una contraseña"),
    body("avatar").custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".jpeg", ".jpg", ".png", ".gif"];

        if (!file) {
            throw new Error("Debes agregar una imagen");
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son: ${acceptedExtensions.join(", ")}`);
            }
        }
        return true;
    }),
];
