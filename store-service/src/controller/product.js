const Product = require("../model/product");
const Category = require("../model/category");
const Store = require("../model/store");

const { STATUS_OK } = require("../constants/status-codes");
const createId = require("../utils/id-creator");

// main functions
const getProducts = async (req, res, next) => {
  const { storeId } = req.query;
  try {
    const products = await Product.find({ storeId: storeId }).limit(10);

    res.status(STATUS_OK).json({ msg: "list of products", products, status: STATUS_OK });
  } catch (e) {
    next(e);
  }
};

const addProducts = async (req, res, next) => {
  const { storeId, catId, name, description, picUrl, originalPrice = 0, discountedPrice = 0, isVeg } = req.body;

  try {
    if (!storeId || !catId || !name || !req.user || !isVeg || originalPrice === 0 || discountedPrice === 0) {
      return res.json({ msg: "oh stree kal aana" });
    }

    const store = await Store.findOne({ storeId });

    if (!store) {
      return res.json({ msg: "oh stree kal aana2" });
    }

    if (store.owner != req.user.id || store.managers != req.user.id) {
      return res.json({ msg: "oh stree kal aana3" });
    }

    const productsCount = await Product.find({ storeId: storeId }).countDocuments();

    const prodId = createId(name, productsCount);;

    const prodObj = {
      storeId,
      catId,
      prodId,
      name,
      description: description || "",
      picUrl: picUrl || "",
      originalPrice,
      discountedPrice,
      isVeg,
    };

    await Product.create(prodObj);

    res.status(STATUS_OK).json({ msg: "Product created", status: STATUS_OK });
  } catch (e) {
    next(e);
  }
};

module.exports = { getProducts, addProducts };
