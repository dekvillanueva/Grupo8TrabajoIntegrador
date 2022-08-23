const express = require("express");
const manageProductsController = require("../controllers/manageProductsController");
const manageProductsControllerSq = require("../controllers/manageProductsControllerSq");
const path = require('path');

const multer = require('multer')
// const uploadProductImages = path.join(__dirname, "../public/assets/images/uploads/");
const uploadProductImages = path.join(__dirname.replace("\src", ""), "../public/assets/images/uploads/");

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


// productRouter.get('/productsList', manageProductsController.listProducts);
productRouter.get('/productsList', manageProductsControllerSq.listProducts);
// productRouter.get('/productCreate', manageProductsController.createProduct);
productRouter.get('/productCreate', manageProductsControllerSq.createProduct);
// productRouter.post('/productCreate', upload.single('image'), manageProductsController.addProduct);
productRouter.post('/productCreate', upload.single('image'), manageProductsControllerSq.addProduct);


// productRouter.get('/productUpdate/:id', manageProductsController.updateProduct);
productRouter.get('/productUpdate/:id', manageProductsControllerSq.updateProduct);
// productRouter.put('/productUpdate/:id', upload.single('image'), manageProductsController.editProduct);
productRouter.put('/productUpdate/:id', upload.single('image'), manageProductsControllerSq.editProduct);


// productRouter.get('/productDetail/:id', manageProductsController.detail);
productRouter.get('/productDetail/:id', manageProductsControllerSq.detail);

// productRouter.delete('/productDelete/:id', manageProductsController.delete);
productRouter.delete('/productDelete/:id', manageProductsControllerSq.delete);


module.exports = productRouter;