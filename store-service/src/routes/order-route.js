const express = require("express");

const orderController = require("../controller/order.js");

const authChecker = require("../middleware.js/auth-checker.js");

const router = express.Router();

router.use(authChecker);
router.get("/create-order", orderController.createOrder);
router.get("/get-all-orders", orderController.getAllOrders);

module.exports = router;
