// helper functions
const { STATUS_OK } = require("../constants/status-codes");

// main functions
const getStores = async (req, res, next) => {
  try {
    res.status(STATUS_OK).json({ msg: "list of stores",status: STATUS_OK });
  } catch (e) {
    next(e);
  }
};

module.exports = { getStores };
