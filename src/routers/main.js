const express = require("express");
const homeController = require("../controllers/homeController");

//const cartController = require("../controllers/cartController");
const { application } = require("express");

const router = express.Router();

router.get('/', homeController.home,);
//router.get('/cart', cartController.cart);



module.exports = router;
