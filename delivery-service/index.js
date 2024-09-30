const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connection = require("./src/config/dbConf");

const deliveryRoute = require("./src/routes/delivery-route");

// other imports
const errorHandler = require("./src/middleware.js/error-handler");
const dataExtracter = require("./src/middleware.js/data-extracter");

// app configs
const app = express();

app.use(cors());
app.use(express.json());

app.use(dataExtracter);


app.use("/orders", deliveryRoute);

app.get("/", (req, res) => {
  res.json({ msg: "deliver services!" });
});

app.use(errorHandler);

const PORT = 5002;
app.listen(PORT, async () => {
  await connection();
  console.log("server started at", PORT);
});
