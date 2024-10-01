const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
    {
        storeId: { type: String, required: true, unique: true },
        storeName: { type: String, required: true },
        location: { type: String, required: true },
        geoLocation: {
            lat: String,
            lon: String,
        },
        owner: { type: String, required: true },
        managers: { type: String },
        operators: { type: [String] },
        picUrl: { type: String },
    },
    {
        timestamps: true,
    }
);

const Store = mongoose.model("store", storeSchema, "store");

module.exports = Store;
