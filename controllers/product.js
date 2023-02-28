const Product = require('../model/Product');
exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    cart: JSON.parse(req.cookies.cart),
  });
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product({ ...req.body });
  product.save();
  res.redirect('/');
}

exports.getProduct = (req, res, next) => {
  if (!req.cookies.cart) {
    res.cookie('cart', JSON.stringify([]), { maxAge: 900000, httpOnly: false });
  }
  const data = Product.fetchAll((products) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      cart:  req.cookies.cart,
    });
  })
}

exports.getCart = (req, res, next) => {
  res.send(JSON.parse(req.cookies.cart));
}
