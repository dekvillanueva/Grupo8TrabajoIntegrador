const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const uploadProductImagesPath = "/assets/images/uploads/";
const manageProductsController = {

  /**
   * list all products from 'products.json'
   * @param {*} req 
   * @param {*} res 
   */
  listProducts: (req, res) => {
    const listOfProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    res.render("productsList.ejs", {
      products: listOfProducts
    });
  },
  /**
   * render create product view for add new product 
   * @param {*} req 
   * @param {*} res 
   */
  createProduct: (req, res) => {
    let categories = [];
    let discounts = [];
    let aux = 0;
    for (let product of products) {
      categories.push(product.category);
    }
    for (let i = 0; i < 7; i++) {
      discounts.push(aux);
      aux += 5;
    }
    res.render("productCreate.ejs", {
      categories: categories,
      discounts: discounts
    });
  },
  /**
   * add new product to products.json file
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  addProduct: (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a Image File')
      error.httpStatusCode = 400
      return next(error)
    }
    let fileName = uploadProductImagesPath + req.file.filename;
    let name = req.body.productName;
    let description = req.body.productDescription;
    let category = req.body.category;
    let price = req.body.price;
    let discount = req.body.discount;
    let id = products[products.length - 1].id + 1;

    let productToSave = {
      name: name,
      description: description,
      category: category,
      price: price,
      discount: discount,
      id: id,
      image: fileName
    }

    let productsToSave = products;
    productsToSave.push(productToSave);

    try {
      fs.writeFileSync(productsFilePath, JSON.stringify(productsToSave, null, 2));
      console.log("Product was saved.");
    } catch (error) {
      console.error(error);
    }
    res.redirect('/productDetail/:' + id);
  },

  /**
   * Render de update product view
   * @param {*} req 
   * @param {*} res 
   */
  updateProduct: (req, res) => {
    let id = req.params.id;
    const productToEdit = products.filter((p) => (p.id == id));
    let categories = [];
    let discounts = [];
    let aux = 0;
    for (let product of products) {
      categories.push(product.category);
    }
    for (let i = 0; i < 7; i++) {
      discounts.push(aux);
      aux += 5;
    }
    res.render("productUpdate.ejs",
    {
      product: productToEdit[0],
      categories: categories,
      discounts: discounts
    });
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  editProduct: (req, res) => {
    let id = req.params.id;
    const file = req.file
    let fileName = '';
    let modificarImagen = false;
    if (file) {
      fileName = uploadProductImagesPath + req.file.filename;
      modificarImagen = true
    }else{

    }
    
    let name = req.body.productName;
    let description = req.body.productDescription;
    let category = req.body.category;
    let price = req.body.price;
    let discount = req.body.discount;
    
    const productToUpdate = products.filter((p) => (p.id == id))[0];

    productToUpdate.name = name;
    productToUpdate.description = description;
    productToUpdate.category = category;
    productToUpdate.price = price;
    productToUpdate.discount = discount;
    if(modificarImagen){
      productToUpdate.image = fileName;
    }
    let productsToSave = products;
    const target = productsToSave.find(p => p.id == id);
    
    const productToReplace = Object.assign(target, productToUpdate);
    productsToSave.splice(findIndex(products, id), 1, productToReplace);

    try {
      fs.writeFileSync(productsFilePath, JSON.stringify(productsToSave, null, 2));
      console.log("Product was updated.");
    } catch (error) {
      console.error(error);
    }
    res.redirect('/productsList');
  },
  /**
   * Render Details view
   * @param {*} req 
   * @param {*} res 
   */
  detail: (req, res) => {
    let id = req.params.id;
    const producto = products.filter(p => p.id == id);
    res.render("productDetail.ejs", {
      product: producto[0]
    });
  },

  /**
   * Delete product items by id
   * @param {*} req 
   * @param {*} res 
   */
  delete: (req, res) => {
    let id = req.params.id;
    const productsToSave = products.filter(p => p.id != id);
    try {
      fs.writeFileSync(productsFilePath, JSON.stringify(productsToSave, null, 2));
      console.log("Product was deleted.");
    } catch (error) {
      console.error(error);
    }
    res.redirect('/productsList');
  }

};

function findIndex(list, id) {
  for(let i=0; i<list.length; i++) {
    if (list[i].id == id) {
      return i;
    }
  }
}

module.exports = manageProductsController;