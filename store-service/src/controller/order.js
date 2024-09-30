const Cart = require("../model/cart");
const Order = require("../model/order");

const { STATUS_OK } = require("../constants/status-codes");
const sendTask = require("../../../delivery-service/src/tasks/sendMsgQueue");


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

        let orderObj = [];
        console.log(cartDetails.length);

        cartDetails.forEach((item) => {
            const grossPrice = parseFloat(item.product.discountedPrice) * parseInt(item.quantity);
            const tax = (((2.5)/100) * grossPrice);
            const totalPrice = grossPrice + tax;

            const obj = {
                userId: req.user.id,
                storeId: item.storeId,
                prodId: item.prodId,
                quantity: item.quantity,
                grossPrice,
                tax,
                totalPrice,
                status: "pending"
            }

            orderObj.push(obj);
        });

        const orders = await Order.insertMany(orderObj);
        await Cart.deleteMany({ userId: req.user.id });

        sendTask(orders);

        res.status(STATUS_OK).json({ msg: "order created", status: STATUS_OK });
    } catch (e) {
        next(e);
    }
};

module.exports = { createOrder };
