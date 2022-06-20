const manageProductsController = {
  manageProducts: (req, res) => {
    res.render("manageProducts");
  },
  listProducts: (req, res) => {
    res.render("productDetail");
  },
  createProduct: (req, res) => {
    res.send(req.body.productName);
    console.log(req.body);
  },

  detail: (req, res) => {
    let id = req.params.id;
    let producto = products.find((p) => p.id == id);
    res.render("detail", { producto: producto });
  },
};

module.exports = manageProductsController;
