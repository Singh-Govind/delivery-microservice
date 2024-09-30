const mongoose = require("mongoose");

const connection = () => {
    return mongoose.connect("mongodb://localhost:27017/delivery-service");
}

module.exports = connection;