// const fs = require('fs');
// const path = require('path');

// const productsFilePath = path.join(__dirname, '../database/products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const homeController = {
  home: (req, res) => {
    if(req.session.userLogged){
      res.render("home", {userLogged: req.session.userLogged}); //recibe un JSON con los productos como parámetro  
    }else{
      res.render("home", {userLogged: req.session.userLogged}); //recibe un JSON con los productos como parámetro
    }
  },
};

module.exports = homeController;
