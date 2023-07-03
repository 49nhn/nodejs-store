const Product = require("../model/Product");

exports.getEditProduct = (req, res, next) => {
  const id = req.params.id;
  Product.fetchAll((products) => {
    res.render("edit-product", {
      prods: products,
      pageTitle: "Edit Product",
      path: "/admin/edit-product/:id",
      id: id,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const product = Product.updateProd({ ...req.body });
  res.redirect("/admin/add-product/:id");
};

exports.getDeleteProduct = (req, res, next) => {
  const id = req.params.iddelete;
  Product.fetchAll((products) => {
    res.render("delete-product", {
      prods: products,
      pageTitle: "Delete Product",
      path: "/admin/delete-product/",
      id: id,
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const product = Product.delete({ ...req.body });
  res.redirect("/admin/add-product");
};
