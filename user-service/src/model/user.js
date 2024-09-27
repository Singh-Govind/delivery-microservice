const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    first_name: {type: String},
    last_name: {type: String},
    dob: {type: String},
    role: {type: String, enum: ["user", "store", "admin"], default: "user"}
});

const User = mongoose.model("user", userSchema, "user");

module.exports = User;