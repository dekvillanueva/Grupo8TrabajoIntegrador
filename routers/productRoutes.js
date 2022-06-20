const express = require("express");
const { manageProducts } = require("../controllers/manageProductsController");
const manageProductsController = require("../controllers/manageProductsController");

const productRouter = express.Router();

productRouter.get('/manageProducts', manageProductsController.manageProducts);
productRouter.post('/productsList', manageProductsController.createProduct);
productRouter.get('/productsList', manageProductsController.listProducts);
productRouter.get('/detail/:id', manageProductsController.detail);

module.exports = productRouter;