const express = require("express");
const userRouter = express.Router();
const { validationResult } = require("express-validator");

//Requerimos el controlador
const userController = require("../controllers/userController");
const userControllerSq = require("../controllers/userControllerSq");

//Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validationsUserRegister = require('../middlewares/validateUserRegisterMiddleware');
const validationsUserUpdate = require('../middlewares/validateUserUpdateMiddleware');
const validationsUserLogin = require('../middlewares/validateUserLoginMiddleware');
const guestMiddleware =  require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


//Login
userRouter.get('/login', guestMiddleware, userControllerSq.login);
//userRouter.post('/login', userController.loginProcess);
userRouter.post('/login', validationsUserLogin, userControllerSq.loginProcess);
//Formulario de registro de usuario - Creación
//userRouter.get('/userRegister', userController.userRegister);
userRouter.get('/userRegister', guestMiddleware, userControllerSq.userRegister)
//userRouter.post('/userRegister', uploadFile.single('avatar'), userController.processRegister);
userRouter.post('/userRegister', uploadFile.single('avatar'), validationsUserRegister, userControllerSq.processRegister);
//Detalle de usuario
// userRouter.get('/userDetail/:id', userController.userDetail);
userRouter.get('/userDetail/:id', authMiddleware, userControllerSq.userDetail);
//Modificar un Usuario
//userRouter.get('/userUpdate/:id', userController.updateUser);
userRouter.get('/userUpdate/:id', userControllerSq.updateUser);
userRouter.put('/userUpdate/:id', uploadFile.single('avatar'), validationsUserUpdate, userControllerSq.editUser);
//Eliminar usuario
// userRouter.delete('/userDelete/:id', userController.delete);
userRouter.delete('/userDelete/:id', userControllerSq.delete);
//Listar usuarios
// userRouter.get('/usersList', userController.usersList);
userRouter.get('/usersList', userControllerSq.usersList);

userRouter.get('/logout', userControllerSq.logout);

module.exports = userRouter;
