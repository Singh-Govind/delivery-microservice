const express = require("express");

const cartController = require("../controller/cart.js");

const authChecker = require("../middleware.js/auth-checker.js");

const router = express.Router();

router.use(authChecker);
router.get("/get-cart-details", cartController.getCartDetails);
router.post("/add-to-cart", cartController.addToCart);
router.delete("/delete-cart/:cartId", cartController.removeFromCart);

module.exports = router;
