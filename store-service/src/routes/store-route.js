const express = require("express");

const storeController = require("../controller/store-controller.js");
const authChecker = require("../middleware.js/auth-checker.js");

const router = express.Router();

router.get("/get-stores", storeController.getStores);

router.use(authChecker);
router.post("/add-stores", storeController.createStores);

module.exports = router;
