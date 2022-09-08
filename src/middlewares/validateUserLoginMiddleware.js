const { body } = require("express-validator");
const bcryptjs = require("bcryptjs");
const DB = require("../database/models");

module.exports = [

    body("userEmail")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un un formato de email válido")
    .bail()
    .custom(async (value) => {
        const user = await DB.User.findOne(
            {
                where: { email: value }
            });
        if (user == null) {
            throw new Error('El Email no se encuetra registrado');
        }
        return true;
    })
    .bail(),

    body("userPassword")
    .notEmpty()
    .withMessage("Este campo no puede estar vacío")
    .bail()
    .custom(async (value, {req}) => {
        let user = await DB.User.findOne(
            {
                where: {email: req.body.userEmail}
            });
        if(user != null){
            if (!bcryptjs.compareSync(value, user.password)) {
                throw new Error('Contraseña incorrecta');
            }
        }

        return true;
    }),
];