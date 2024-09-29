const Cart = require("../model/cart");

const { STATUS_OK } = require("../constants/status-codes");
const sendTask = require("../tasks/sendMsgQueue");

// main functions
const createOrder = async (req, res, next) => {
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
                $unwind: "$product",
            },
        ]);

        sendTask(cartDetails);

        res.status(STATUS_OK).json({ msg: "order created", status: STATUS_OK });
    } catch (e) {
        next(e);
    }
};

module.exports = { createOrder };
