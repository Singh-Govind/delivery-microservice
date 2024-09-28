const Store = require("../model/store");
const StoreIdCacheModel = require("../model/store_id");

const { STATUS_OK } = require("../constants/status-codes");

// main functions
const getStores = async (req, res, next) => {
  try {
    const stores = await Store.find().limit(10);

    res.status(STATUS_OK).json({ msg: "list of stores", stores, status: STATUS_OK });
  } catch (e) {
    next(e);
  }
};

module.exports = { getStores };
