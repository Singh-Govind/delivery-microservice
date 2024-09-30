const express = require("express");

const deliveryController = require("../controller/delivery-controller.js");
const authChecker = require("../middleware.js/auth-checker.js");

const router = express.Router();

router.use(authChecker);
router.get("/order-status", deliveryController.getStatus);

// for delivery persons

router.get("/items-to-deliver", deliveryController.getItemsToDeliver);
router.post("/order-status-update", deliveryController.updateStatus);

module.exports = router;
