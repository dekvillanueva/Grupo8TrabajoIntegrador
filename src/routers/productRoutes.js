const express = require("express");
// const path = require('path');
const productRouter = express.Router();
const { validationResult } = require("express-validator");

//Requerimos el controlador
const manageProductsController = require("../controllers/manageProductsController");
const manageProductsControllerSq = require("../controllers/manageProductsControllerSq");

//Middlewares
const multerMidd = require("../middlewares/multerMiddlewareProducts");
const validationProduct = require("../middlewares/validateProductMiddleware");

//Rutas
// productRouter.get('/productsList', manageProductsController.listProducts);
productRouter.get('/productsList', manageProductsControllerSq.listProducts);
//productRouter.get('/productCreate', manageProductsController.createProduct);
productRouter.get('/productCreate', manageProductsControllerSq.createProduct);
// productRouter.post('/productCreate', multerMidd.single('image'), manageProductsController.addProduct);
productRouter.post('/productCreate', multerMidd.single('image'), validationProduct, manageProductsControllerSq.addProduct);

// productRouter.get('/productUpdate/:id', manageProductsController.updateProduct);
productRouter.get('/productUpdate/:id', manageProductsControllerSq.updateProduct);
// productRouter.put('/productUpdate/:id', multerMidd.single('image'), manageProductsController.editProduct);
productRouter.put('/productUpdate/:id', multerMidd.single('image'), validationProduct, manageProductsControllerSq.editProduct);

// productRouter.get('/productDetail/:id', manageProductsController.detail);
productRouter.get('/productDetail/:id', manageProductsControllerSq.detail);

// productRouter.delete('/productDelete/:id', manageProductsController.delete);
productRouter.delete('/productDelete/:id', manageProductsControllerSq.delete);


module.exports = productRouter;