const mongoose = require("mongoose");

const storeId = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    refresh_token: { type: String }
});

const StoreIdMod = mongoose.model("store_id_creator", storeId, "store_id_creator");

module.exports = StoreIdMod;