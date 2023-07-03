const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const productController = require("../controllers/product");
const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", productController.postAddProduct);

// /admin/edit-product => POST
router.post("/edit-product", adminController.postEditProduct);
// /admin/edit-product => GET
router.get("/edit-product/:id", adminController.getEditProduct);

// /admin/delete-product => POST
router.post("/delete-product", adminController.postDeleteProduct);
// /admin/delete-product => GET
router.get("/delete-product/:id", adminController.getDeleteProduct);

exports.routes = router;
