const Category = require("../model/category");
const Store = require("../model/store");

const { STATUS_OK } = require("../constants/status-codes");
const createId = require("../utils/id-creator");

// main functions
const getCategories = async (req, res, next) => {
  const { storeId } = req.query;
  try {
    const categories = await Category.find({ storeId: storeId }).limit(10);

    res.status(STATUS_OK).json({ msg: "list of categories", categories, status: STATUS_OK });
  } catch (e) {
    next(e);
  }
};

const addCategory = async (req, res, next) => {
  const { storeId, name, description, picUrl } = req.body;

  try {
    if (!storeId || !name || !req.user) {
      return res.json({ msg: "oh stree kal aana" });
    }

    const store = await Store.findOne({ storeId });

    if (!store) {
      return res.json({ msg: "oh stree kal aana2" });
    }

    if (store.owner != req.user.id || store.managers != req.user.id) {
      return res.json({ msg: "oh stree kal aana3" });
    }

    const categoriesCount = await Category.find({ storeId: storeId }).countDocuments();

    const catId = createId(name, categoriesCount);

    const catObj = {
      storeId,
      catId,
      name,
      description: description || "",
      picUrl: picUrl || "",
    };

    await Category.create(catObj);

    res.status(STATUS_OK).json({ msg: "category created", status: STATUS_OK });
  } catch (e) {
    next(e);
  }
};

module.exports = { getCategories, addCategory };
