const express = require("express");

const storeController = require("../controller/store-controller.js");

const router = express.Router();

router.get("/get-stores", storeController.getStores);

module.exports = router;
