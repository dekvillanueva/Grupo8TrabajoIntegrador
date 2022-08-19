const express = require("express");
const userRouter = express.Router();

//Requerimos el controlador
const userController = require("../controllers/userController");
const userControllerSq = require("../controllers/userControllerSq");

//Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
//const validations = require('../middlewares/validateRegisterMiddleware')


//Login
userRouter.get('/login', userController.login);
//userRouter.post('/login', userController.loginProcess);
userRouter.post('/login', userControllerSq.loginProcess);
//Formulario de registro de usuario - Creación
//userRouter.get('/userRegister', userController.userRegister);
userRouter.get('/userRegister', userControllerSq.userRegister)
//userRouter.post('/userRegister', uploadFile.single('avatar'), userController.processRegister);
userRouter.post('/userRegister', uploadFile.single('avatar'), userControllerSq.processRegister);
//Detalle de usuario
// userRouter.get('/userDetail/:id', userController.userDetail);
userRouter.get('/userDetail/:id', userControllerSq.userDetail);
//Modificar un Usuario
//userRouter.get('/userUpdate/:id', userController.updateUser);
userRouter.get('/userUpdate/:id', userControllerSq.updateUser);
userRouter.put('/userUpdate/:id', uploadFile.single('avatar'), userControllerSq.editUser);
//Eliminar usuario
// userRouter.delete('/userDelete/:id', userController.delete);
userRouter.delete('/userDelete/:id', userControllerSq.delete);
//Listar usuarios
// userRouter.get('/usersList', userController.usersList);
userRouter.get('/usersList', userControllerSq.usersList);

module.exports = userRouter;
