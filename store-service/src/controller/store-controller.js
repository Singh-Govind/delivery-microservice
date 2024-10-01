const Store = require("../model/store");
const StoreIdCacheModel = require("../model/store_id");

const { STATUS_OK, STATUS_ALREADY_EXISTS, STATUS_UNAUTHORIZED, STATUS_BAD_REQUEST } = require("../constants/status-codes");
const { throwError } = require("../utils/error-maker");
const { VALIDATION_ERROR, UNAUTHORIZED_ERROR } = require("../constants/error-constants");

// helper functions
// storeid creator
const createStoreId = (storeName) => {
    return `STORE_${storeName.slice(0, 4).split(" ").join("").trim().toUpperCase()}_${Math.round(Math.random() * 10000)}`;
};

// main functions
const getStores = async (req, res, next) => {
    try {
        const stores = await Store.find().limit(10);

        res.status(STATUS_OK).json({ msg: "list of stores", stores, status: STATUS_OK });
    } catch (e) {
        next(e);
    }
};

const createStores = async (req, res, next) => {
    const { storeName, location, owner, managers = "", operators = [], picUrl = "" } = req.body;
    try {
        if (req.user.role !== "admin") {
            throwError("Not authorized to do this task", UNAUTHORIZED_ERROR, STATUS_UNAUTHORIZED);
        }

        if (!storeName || !location || !owner) {
            throwError("Please provide all details", VALIDATION_ERROR, STATUS_BAD_REQUEST);
        }

        const stores = await Store.findOne({
            $and: [{ storeName }, { location }, { owner }],
        });

        if (stores) {
            throwError("Store already exists", VALIDATION_ERROR, STATUS_ALREADY_EXISTS);
        }

        let storeId = createStoreId(storeName);
        let storeIdexits = true;

        while (storeIdexits) {
            const store = await Store.findOne({ storeId });
            if (!store) {
                storeIdexits = false;
                break;
            }
            storeId = createStoreId(storeName);
        }

        await Store.create({
            storeId,
            storeName,
            location,
            owner,
            managers,
            managers,
            operators,
            picUrl,
        });

        res.status(STATUS_OK).json({ msg: "store created", status: STATUS_OK });
    } catch (e) {
        next(e);
    }
};

module.exports = { getStores, createStores };
