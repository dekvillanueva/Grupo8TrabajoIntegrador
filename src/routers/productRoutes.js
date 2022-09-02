const express = require("express");
const multerMidd = require("../middlewares/multerMiddlewareProducts");
const userRouter = express.Router();
const manageProductsController = require("../controllers/manageProductsController");
const manageProductsControllerSq = require("../controllers/manageProductsControllerSq");
const path = require('path');
const productRouter = express.Router();


// productRouter.get('/productsList', manageProductsController.listProducts);
productRouter.get('/productsList', manageProductsControllerSq.listProducts);
//productRouter.get('/productCreate', manageProductsController.createProduct);
productRouter.get('/productCreate', manageProductsControllerSq.createProduct);
// productRouter.post('/productCreate', upload.single('image'), manageProductsController.addProduct);
productRouter.post('/productCreate', multerMidd.single('image'), manageProductsControllerSq.addProduct);


// productRouter.get('/productUpdate/:id', manageProductsController.updateProduct);
productRouter.get('/productUpdate/:id', manageProductsControllerSq.updateProduct);
// productRouter.put('/productUpdate/:id', upload.single('image'), manageProductsController.editProduct);
productRouter.put('/productUpdate/:id', multerMidd.single('image'), manageProductsControllerSq.editProduct);


// productRouter.get('/productDetail/:id', manageProductsController.detail);
productRouter.get('/productDetail/:id', manageProductsControllerSq.detail);

// productRouter.delete('/productDelete/:id', manageProductsController.delete);
productRouter.delete('/productDelete/:id', manageProductsControllerSq.delete);


module.exports = productRouter;