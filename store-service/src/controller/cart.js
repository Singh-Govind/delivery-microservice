const Cart = require("../model/cart");

const { STATUS_OK, STATUS_BAD_REQUEST, STATUS_NOT_FOUND } = require("../constants/status-codes");
const { throwError } = require("../utils/error-maker");
const { VALIDATION_ERROR, NOT_FOUND_ERROR } = require("../constants/error-constants");
const Product = require("../model/product");

// main functions
const getCartDetails = async (req, res, next) => {
    try {
        const cartDetails = await Cart.aggregate([
            {
                $match: { userId: req.user.id },
            },
            {
                $lookup: {
                    from: "product",
                    localField: "prodId",
                    foreignField: "prodId",
                    as: "product",
                },
            },
            {
                $unwind: "$product"
            }
        ]);

        res.status(STATUS_OK).json({ msg: "carts", cartDetails, status: STATUS_OK });
    } catch (e) {
        next(e);
    }
};

const addToCart = async (req, res, next) => {
    const { storeId, prodId, quantity = 1 } = req.body;

    try {
        if (!prodId || !storeId) {
            throwError("Please provide all the details!", VALIDATION_ERROR, STATUS_BAD_REQUEST);
        }

        const product = await Product.findOne({
            $and: [{ storeId }, { prodId }],
        });

        if (!product) {
            throwError("Product doesn't exists!", NOT_FOUND_ERROR, STATUS_NOT_FOUND);
        }

        let cartObj = { storeId, prodId, userId: req.user.id, quantity };

        await Cart.updateOne({ storeId, prodId, userId: req.user.id }, cartObj, { upsert: true });

        res.status(STATUS_OK).json({ msg: "Added to cart", status: STATUS_OK });
    } catch (e) {
        next(e);
    }
};

const removeFromCart = async (req, res, next) => {
    const { cartId } = req.params;
    try {
        if (!cartId) {
            throwError("Please provide all the details!", VALIDATION_ERROR, STATUS_BAD_REQUEST);
        }

        await Cart.deleteOne({ _id: cartId });

        res.status(STATUS_OK).json({ msg: "Cart deleted", status: STATUS_OK });
    } catch (e) {
        next(e);
    }
};

module.exports = { getCartDetails, addToCart, removeFromCart };
