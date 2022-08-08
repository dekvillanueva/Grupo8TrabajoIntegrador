const express = require("express");
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");
const cartController = require("../controllers/cartController");
const { application } = require("express");

const router = express.Router();

router.get('/', homeController.home,);
router.get('/login', loginController.login);
router.get('/cart', cartController.cart);



module.exports = router;
