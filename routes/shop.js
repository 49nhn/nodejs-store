const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");
const productController = require("../controllers/product");

const router = express.Router();

router.get("/", productController.getProduct);
router.get("/cart", productController.getCart);

router.get("/products/product-detail/:id", productController.getProductDetail);

module.exports = router;
