const mongoose = require("mongoose");

const connection = () => {
    return mongoose.connect(`${process.env.MONGO_URL}/delivery-service`);
}

module.exports = connection;