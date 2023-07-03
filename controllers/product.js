const Product = require("../model/Product");

exports.getAddProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("add-product", {
      prods: products,
      pageTitle: "Add Product",
      path: "/admin/add-product",
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product({ ...req.body });
  product.save();
  res.redirect("/");
};

exports.getProduct = (req, res, next) => {
  if (!req.cookies.cart) {
    res.cookie("cart", JSON.stringify([]), {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: false,
    });
  }
  Product.fetchAll((products) => {
    return res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      cart: req.cookies.cart,
    });
  });
};

exports.getCart = (req, res, next) => {
  if (!req.cookies.cart) {
    res.cookie("cart", JSON.stringify([]), {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: false,
    });
    return res.send([]);
  }
  Product.fetch(JSON.parse(req.cookies.cart), (cart) => {
    return res.render("including/itemcart", {
      cart,
    });
  });
};

exports.getProductDetail = (req, res, next) => {
  const { id } = req.params;
  Product.fetchId(id, (product) => {
    return res.render("products/product-detail", {
      product: product[0],
      pageTitle: "Product Detail",
    });
  });
};
