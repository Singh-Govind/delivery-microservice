const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connection = require("./src/config/dbConf");

const routes = require("./src/routes/store-route");

// other imports
const errorHandler = require("./src/middleware.js/error-handler");

// app configs
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("url", req.originalUrl);
    next();
})
app.use("/stores", routes);

app.get("/", (req, res) => {
    res.json({msg: "Welcome to our store!"});
});


app.use(errorHandler);

const PORT = 5001;
app.listen(PORT, async () => {
    await connection();
    console.log("server started at", PORT);
});
