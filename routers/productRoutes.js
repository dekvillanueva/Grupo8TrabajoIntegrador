const express = require("express");
const manageProductsController = require("../controllers/manageProductsController");

const productRouter = express.Router();

productRouter.get('/productCreate', manageProductsController.createProduct);
productRouter.post('/productCreate', manageProductsController.addProduct);
productRouter.get('/productUpdate', manageProductsController.updateProduct);
productRouter.post('/productUpdate', manageProductsController.editProduct);
productRouter.get('/productsList', manageProductsController.listProducts);
productRouter.get('/productDetail', manageProductsController.detail);



module.exports = productRouter;