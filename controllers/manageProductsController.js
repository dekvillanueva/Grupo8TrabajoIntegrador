const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const manageProductsController = {
  manageProducts: (req, res) => {
    res.render("manageProducts");
  },
  listProducts: (req, res) => {
    res.render("productDetail");
  },
  createProduct: (req, res) => {
    res.send(req.body.productName);
    console.log(req.body);
  },

  detail: (req, res) => {
    let id = req.params.id;
    let producto = products.find((p) => p.id == id);
    res.render("productDetail", { producto: producto });
  },
};

module.exports = manageProductsController;
