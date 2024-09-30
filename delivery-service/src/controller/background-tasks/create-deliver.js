const Delivery = require("../../model/delivery");
const connection = require("../../config/dbConf");

const createDelivery = async (orders) => {
    try {
        await connection();
        const deliverableOrdersArr = [];

        orders.map((item) => {
            const obj = {
                userId: item.userId,
                orderId: item._id,
                status: "waiting",
            };
            deliverableOrdersArr.push(obj);
        });

        await Delivery.insertMany(deliverableOrdersArr);

        console.log("delivery created");
    } catch (e) {
        console.log("error creating delivery", e.message);
    }
};

module.exports = { createDelivery };
