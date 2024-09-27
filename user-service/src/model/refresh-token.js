const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    refresh_token: { type: String }
});

const TokenMod = mongoose.model("token", tokenSchema, "token");

module.exports = TokenMod;