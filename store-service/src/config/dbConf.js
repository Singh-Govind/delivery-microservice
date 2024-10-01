const mongoose = require("mongoose");

const connection = () => {
    return mongoose.connect("mongodb://mongodb:27017/store-service");
}

module.exports = connection;