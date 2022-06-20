

const manageProductsController = {
    manageProducts: (req, res) => {
      res.render("manageProducts");
    },
    listProducts: (req, res) =>{
      res.render("productDetail");
    },
    createProduct: (req, res) =>{
      res.send(req.body.productName);
      console.log(req.body);
    }
  };
  
  module.exports = manageProductsController;