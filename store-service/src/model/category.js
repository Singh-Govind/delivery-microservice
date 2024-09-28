const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    storeId: { type: String, required: true, unique: true },
    catId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    picUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("category", categorySchema, "category");

module.exports = Category;
