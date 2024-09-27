const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connection = require("./src/config/dbConf");

// routes importing
const userRoutes =require("./src/routes/user-route");

// other imports
const errorHandler = require("./src/middleware.js/error-handler");

// app configs
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.json({msg: "yes its working!"});
});


app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, async () => {
    await connection();
    console.log("server started at", PORT);
});
