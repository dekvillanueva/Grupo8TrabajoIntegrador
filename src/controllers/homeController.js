const DB = require("../database/models");
const { Op } = require('sequelize');

const homeController = {
  home: async (req, res) => {
    const listOfProductsWithDiscount = await DB.Product.findAll({
      where: {
        product_discount: {
          [Op.gt]: 0
        }
      }
    });

    let categoriesImages = [];
    categoriesImages.push("/assets/images/categories/s-temperatura.jpeg", "/assets/images/categories/s-flujo.jpeg", 
    "/assets/images/categories/s-gases.jpeg", "/assets/images/categories/s-presion.jpeg", "/assets/images/categories/s-posicion.jpeg");

    const listOfCategories = await DB.Category.findAll();

    res.render("home", {
      userLogged: req.session.userLogged,
      listOfProductsWithDiscount: listOfProductsWithDiscount,
      categories: listOfCategories,
      catImages: categoriesImages
    });
  },

};

module.exports = homeController;