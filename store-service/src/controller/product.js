const Product = require("../model/product");
const Category = require("../model/category");
const Store = require("../model/store");

const { STATUS_OK, STATUS_BAD_REQUEST, STATUS_UNAUTHORIZED, STATUS_NOT_FOUND, STATUS_ALREADY_EXISTS } = require("../constants/status-codes");
const { VALIDATION_ERROR, UNAUTHORIZED_ERROR, NOT_FOUND_ERROR } = require("../constants/error-constants");
const { throwError } = require("../utils/error-maker");
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
            throwError("Please provide all the details!", VALIDATION_ERROR, STATUS_BAD_REQUEST);
        }

        const store = await Store.findOne({ storeId });

        if (!store) {
            throwError("No store found!", NOT_FOUND_ERROR, STATUS_NOT_FOUND);
        }

        if (store.owner != req.user.id || store.managers != req.user.id) {
            throwError("You are not authorize to make the request!", UNAUTHORIZED_ERROR, STATUS_UNAUTHORIZED);
        }

        const categoriesCount = await Category.find({ catId: catId }).countDocuments();

        if (categoriesCount <= 0) {
            throwError("No category found with the category id!", NOT_FOUND_ERROR, STATUS_NOT_FOUND);
        }

        const productsCount = await Product.find({ storeId: storeId }).countDocuments();

        const prodId = createId(name, productsCount);

        const productExists = await Product.findOne({
            $and: [
                { storeId },
                { catId },
                {
                    $or: [{ prodId }, { name }],
                },
            ],
        });

        if (productExists) {
            throwError("Product already exists!", VALIDATION_ERROR, STATUS_ALREADY_EXISTS);
        }

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

const deleteProducts = async (req, res, next) => {
  const { storeId, prodId } = req.body;

  try {
      if (!storeId || !prodId) {
          throwError("Please provide all the details!", VALIDATION_ERROR, STATUS_BAD_REQUEST);
      }

      const store = await Store.findOne({ storeId });

      if (!store) {
          throwError("No store found!", NOT_FOUND_ERROR, STATUS_NOT_FOUND);
      }

      if (store.owner != req.user.id || store.managers != req.user.id) {
          throwError("You are not authorize to make the request!", UNAUTHORIZED_ERROR, STATUS_UNAUTHORIZED);
      }

      const cat = await Product.deleteOne({
          $and: [{ storeId }, { prodId }],
      });

      if(!cat.acknowledged) {
        throwError("not able to delete product", INTERNAL_SERVER_ERROR, STATUS_INTERNAL_SERVER_ERROR)
      }

      res.status(STATUS_OK).json({ msg: "product deleted", status: STATUS_OK });
  } catch (e) {
      next(e);
  }
};

module.exports = { getProducts, addProducts, deleteProducts };
