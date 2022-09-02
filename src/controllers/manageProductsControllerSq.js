const DB = require("../database/models");
const Product = require("../database/models/Product");
const Category = require("../database/models/Category");
const sequelize = DB.sequelize;
const { Op } = require("sequelize");
const moment = require("moment");
const uploadProductImagesPath = "/assets/images/uploads/";

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let isFromGet = false;

const manageProductsController = {

  /**
   * list all products from 'products.json'
   * @param {*} req 
   * @param {*} res 
   */
  listProducts: async (req, res) => {
    const listOfProducts = await DB.Product.findAll();
    res.render("productsList.ejs", {
      products: listOfProducts
    });
  },
  /**
   * render create product view for add new product 
   * @param {*} req 
   * @param {*} res 
   */
  createProduct: async (req, res) => {
    isFromGet = true;
    let categories = [];
    let discounts = [];
    let aux = 0;

    let cat = await DB.Category.findAll();

    for (c of cat) {
      categories.push(c.name);
    }

    for (let i = 0; i < 7; i++) {
      discounts.push(aux);
      aux += 5;
    }
    res.render("productCreate.ejs", {
      categories: categories,
      discounts: discounts,
      isFromGet: isFromGet,
    });
  },

  /**
   * add new product to products.json file
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  addProduct: async (req, res, next) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      isFromGet = false;
      res.render("productCreate.ejs", {
        isFromGet: isFromGet,
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } else {

    const file = req.file
    if (!file) {
      const error = new Error('Please upload a Image File')
      error.httpStatusCode = 400
      return next(error)
    }
    let fileName = uploadProductImagesPath + req.file.filename;
    let name = req.body.productName;
    let description = req.body.productDescription;
    let category = await DB.Category.findAll({ where: { name: req.body.category } });
    let price = req.body.price;
    let discount = req.body.discount;
    let id = products[products.length - 1].id + 1;

    let productToSave = {
      product_name: name,
      product_description: description,
      product_category_id: category[0].dataValues.id,
      product_price: price,
      product_discount: discount,
      product_image: fileName
    }

    DB.Product.create(productToSave)
      .then(function () {
        return res.redirect("/productsList");
      })
      .catch(function (error) {
        return res.send(error);
      });
    }
  },

  /**
   * Render de update product view
   * @param {*} req 
   * @param {*} res 
   */
  updateProduct: async (req, res) => {
    isFromGet = true;
    let id = req.params.id;
    let productToEdit = await DB.Product.findByPk(id);

    let categories = [];
    let discounts = [];
    let aux = 0;

    let cat = await DB.Category.findAll();

    for (c of cat) {
      categories.push(c);
    }
    for (let i = 0; i < 7; i++) {
      discounts.push(aux);
      aux += 5;
    }
    res.render("productUpdate.ejs",
      {
        product: productToEdit,
        categories: categories,
        discounts: discounts,
        isFromGet: isFromGet,
      });
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  editProduct: async (req, res) => {
    const id = req.params.id
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a Image File')
      error.httpStatusCode = 400
      res.send(error)
    }

    let fileName = uploadProductImagesPath + req.file.filename;
    let name = req.body.productName;
    let description = req.body.productDescription;
    let category = await DB.Category.findByPk(req.body.category);
    let price = req.body.price;
    let discount = req.body.discount;


    const actualizada = await DB.Product.update(
      {
        product_name: name,
        product_description: description,
        product_category_id: category.dataValues.id,
        product_price: price,
        product_discount: discount,
        product_image: fileName
      },
      {
        where: {
          product_id: id,
        },
      }
    );

    res.redirect("/productsList");

  },

  /**
   * Render Details view
   * @param {*} req 
   * @param {*} res 
   */
  detail: async (req, res) => {
    let id = req.params.id;
    const productInDB = await DB.Product.findByPk(id)
    res.render("productDetail.ejs", { productToShow: productInDB.dataValues });
  },

  /**
   * Delete product items by id
   * @param {*} req 
   * @param {*} res 
   */
  delete: async (req, res) => {
    let product = await DB.Product.findByPk(req.params.id);
    product.destroy();
    res.redirect("/productsList");
  }

};

function findIndex(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      return i;
    }
  }
}

module.exports = manageProductsController;