const express = require("express");

const categoryController = require("../controller/category.js");
const productController = require("../controller/product.js");

const authChecker = require("../middleware.js/auth-checker.js");

const router = express.Router();

router.get("/get-categories", categoryController.getCategories);
router.get("/get-products", productController.getProducts);

router.use(authChecker);
router.post("/add-categories", categoryController.addCategory);
router.delete("/delete-categories", categoryController.deleteCategory);
router.post("/add-products", productController.addProducts);
router.delete("/delete-product", productController.deleteProducts);

module.exports = router;
