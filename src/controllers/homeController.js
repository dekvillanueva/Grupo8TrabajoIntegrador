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
    res.render("home", {
      userLogged: req.session.userLogged,
      listOfProductsWithDiscount: listOfProductsWithDiscount
    });
  },
};

module.exports = homeController;