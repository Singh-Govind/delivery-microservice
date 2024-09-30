const Order = require("../../model/order");

/** will get param of order ids and stauts in array of obj */
const updateOrderStatus = async (deliveryStatus = []) => {
    try {
        const bulkUpdate = deliveryStatus.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item._id },
                    update: { $set: { status: item.status } },
                },
            };
        });

        await Order.bulkWrite(bulkUpdate);

        return true;
    } catch (e) {}
};

module.exports = { updateOrderStatus };
