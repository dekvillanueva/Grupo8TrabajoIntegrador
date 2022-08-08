const express = require("express");
const userRouter = express.Router();

//Requerimos el controlador
const userController = require("../controllers/userController");

//Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
//const validations = require('../middlewares/validateRegisterMiddleware')


//Login
userRouter.get('/login', userController.login);
userRouter.post('/login', userController.loginProcess);
//Formulario de registro de usuario - Creación
userRouter.get('/userRegister', userController.userRegister);
userRouter.post('/userRegister', uploadFile.single('avatar'), userController.processRegister);
//Detalle de usuario
userRouter.get('/userDetail/:id', userController.userDetail);
//Modificar un Usuario
userRouter.get('/userUpdate/:id', userController.updateUser);
userRouter.put('/userUpdate/:id', uploadFile.single('avatar'), userController.editUser);
//Eliminar usuario
userRouter.delete('/userDelete/:id', userController.delete);
//Listar usuarios
userRouter.get('/usersList', userController.usersList);

module.exports = userRouter;
