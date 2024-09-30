const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        storeId: { type: String, required: true },
        prodId: { type: String, required: true },
        quantity: { type: Number, default: 0 },
        grossPrice: { type: Number, default: 0 },
        tax: { type: Number, default: 0 },
        totalPrice: { type: Number },
        status: { type: String, enum: ["pending", "fulfilled", "rejected"], default: "pending" },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("order", orderSchema, "order");

module.exports = Order;
