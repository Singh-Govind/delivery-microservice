const mongoose = require("mongoose");

const connection = () => {
    return mongoose.connect("mongodb://mongodb:27017/delivery-service");
}

module.exports = connection;