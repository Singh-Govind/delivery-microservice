const mongoose = require("mongoose");

const deliverSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        orderId: { type: String, required: true },
        status: { type: String, enum: ["waiting", "picked", "en_route", "delivered"], default: "waiting" },
    },
    {
        timestamps: true,
    }
);

const Delivery = mongoose.model("delivery", deliverSchema, "delivery");

module.exports = Delivery;
