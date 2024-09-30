const connection = require("../../config/dbConf");
const Order = require("../../model/order");

/** will get param of order ids and stauts in array of obj */
const updateOrderStatus = async (deliveryStatus = []) => {
    
    try {
        await connection();
        const bulkUpdate = deliveryStatus.map((item) => {
            let status = "pending";
            if (item.status === "delivered") {
                status = "fulfilled";
            }
            if (item.status === "rejected") {
                status = "rejected";
            }
            return {
                updateOne: {
                    filter: { _id: item.orderId },
                    update: { $set: { status: status } },
                },
            };
        });

        const a = await Order.bulkWrite(bulkUpdate);
        return true;
    } catch (e) {
        console.log("some err", e.message);
    }
};

module.exports = { updateOrderStatus };
