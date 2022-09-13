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

    const listOfCategories = await DB.Category.findAll();

    res.render("home", {
      userLogged: req.session.userLogged,
      listOfProductsWithDiscount: listOfProductsWithDiscount,
      categories: listOfCategories
    });
  },

};

module.exports = homeController;