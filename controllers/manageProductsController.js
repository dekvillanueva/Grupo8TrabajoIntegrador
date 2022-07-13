const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let productoGuardado = null;
const manageProductsController = {
  
  listProducts: (req, res) => {
    console.log(products);
    res.render("productsList.ejs", {products: products});
  },
  createProduct: (req, res) => {
    res.render("productCreate.ejs");
  },
  addProduct: (req, res) =>{
    //Gaurdar en la base de datos
    productoGuardado = req.body;
    res.redirect('/productDetail', {producto:"hola"});
  },
  updateProduct: (req, res) => {
    res.render("productUpdate.ejs");
     console.log(req.body);
  },
  editProduct: (req, res) => {
    //Gaurdar cambios en la base de datos

    let productoEditado;
    res.redirect("/productDetail", {product: productoEditado})
  },
  detail: (req, res) => {
    // let id = req.params.id;
    // console.log(id);
    // let producto = products.find((p) => p.id == id);
    res.render("productDetail.ejs", {product: "algo"});
  },

  //   detail: (req, res) => {
  
  //   res.render("productDetail");
  // },
};

module.exports = manageProductsController;
