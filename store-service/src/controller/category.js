const Category = require("../model/category");
const Store = require("../model/store");

const { STATUS_OK, STATUS_NOT_FOUND, STATUS_BAD_REQUEST, STATUS_UNAUTHORIZED, STATUS_ALREADY_EXISTS, STATUS_INTERNAL_SERVER_ERROR } = require("../constants/status-codes");
const { throwError } = require("../utils/error-maker");
const { NOT_FOUND_ERROR, VALIDATION_ERROR, UNAUTHORIZED_ERROR, INTERNAL_SERVER_ERROR } = require("../constants/error-constants");
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
            throwError("Please provide all the details!", VALIDATION_ERROR, STATUS_BAD_REQUEST);
        }

        const store = await Store.findOne({ storeId });

        if (!store) {
            throwError("No store found!", NOT_FOUND_ERROR, STATUS_NOT_FOUND);
        }

        if (store.owner != req.user.id || store.managers != req.user.id) {
            throwError("You are not authorize to make the request!", UNAUTHORIZED_ERROR, STATUS_UNAUTHORIZED);
        }

        const categoriesCount = await Category.find({ storeId: storeId }).countDocuments();

        const catId = createId(name, categoriesCount);

        const categoryExists = await Category.findOne({
            $and: [
                { storeId },
                {
                    $or: [{ catId }, { name }],
                },
            ],
        });

        if (categoryExists) {
            throwError("Category already exists!", VALIDATION_ERROR, STATUS_ALREADY_EXISTS);
        }

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

const deleteCategory = async (req, res, next) => {
    const { storeId, catId } = req.body;

    try {
        if (!storeId || !catId) {
            throwError("Please provide all the details!", VALIDATION_ERROR, STATUS_BAD_REQUEST);
        }

        const store = await Store.findOne({ storeId });

        if (!store) {
            throwError("No store found!", NOT_FOUND_ERROR, STATUS_NOT_FOUND);
        }

        if (store.owner != req.user.id || store.managers != req.user.id) {
            throwError("You are not authorize to make the request!", UNAUTHORIZED_ERROR, STATUS_UNAUTHORIZED);
        }

        const cat = await Category.deleteOne({
            $and: [{ storeId }, { catId }],
        });

        if(!cat.acknowledged) {
          throwError("not able to delete category", INTERNAL_SERVER_ERROR, STATUS_INTERNAL_SERVER_ERROR)
        }

        res.status(STATUS_OK).json({ msg: "category deleted", status: STATUS_OK });
    } catch (e) {
        next(e);
    }
};

module.exports = { getCategories, addCategory, deleteCategory };
