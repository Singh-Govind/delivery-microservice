const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    storeId: { type: String, required: true, unique: true },
    catId: { type: String, required: true },
    prodId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    picUrl: { type: String },
    quantity: { type: Number, default: 0 },
    originalPrice: { type: Number, default: 0 },
    discountedPrice: { type: Number, default: 0 },
    isVeg: { type: Boolean, required: true }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema, "product");

module.exports = Product;
