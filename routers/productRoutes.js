const express = require("express");
const manageProductsController = require("../controllers/manageProductsController");
const path = require('path');

const multer  = require('multer')
const uploadProductImages = path.join(__dirname, "../public/assets/images/uploads/");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadProductImages)
  },
  filename: function (req, file, cb) {
    cb(null, "image" + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage });


const productRouter = express.Router();

productRouter.get('/productCreate', manageProductsController.createProduct);
productRouter.post('/productCreate', upload.single('image'), manageProductsController.addProduct);
productRouter.get('/productUpdate/:id', manageProductsController.updateProduct);
productRouter.put('/productUpdate/:id', upload.single('image'), manageProductsController.editProduct);
productRouter.get('/productsList', manageProductsController.listProducts);
productRouter.get('/productDetail/:id', manageProductsController.detail);
productRouter.delete('/productDelete/:id', manageProductsController.delete);

module.exports = productRouter;