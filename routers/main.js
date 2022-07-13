const express = require("express");
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const cartController = require("../controllers/cartController");
const { application } = require("express");

const router = express.Router();

router.get('/', homeController.home,);
router.get('/login', loginController.login);
router.get('/register', registerController.register);
router.get('/cart', cartController.cart);



module.exports = router;
