const path = require('path');

const { body } = require("express-validator");

module.exports = [
 
    body("productName")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío")
    .bail()
    .isLength({min: 2})
    .withMessage("EL nombre del producto debe tener al menos 2 caracteres"),
    body("price")
        .notEmpty()
        .withMessage("Este campo no puede estar vacío")
        .bail()
        .isNumeric()
        .withMessage("Este campo solo puede contener valores numéricos"),
   
    body("image").custom((value, { req }) => {
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
