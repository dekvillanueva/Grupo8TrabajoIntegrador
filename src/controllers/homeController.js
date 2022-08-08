const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const homeController = {
  home: (req, res) => {
    res.render("home", {productos: products}); //recibe un JSON con los productos como parámetro
  },
};

module.exports = homeController;
