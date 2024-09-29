const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    storeId: {type: String, required: true},
    prodId: { type: String, required: true },
    quantity: {type: Number, default: 0}
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("cart", cartSchema, "cart");

module.exports = Cart;
