const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema({
    token: {type: String}
});

const BlacklistedToken = mongoose.model("blacklisted_token", blacklistedTokenSchema, "blacklisted_token");

module.exports = BlacklistedToken;