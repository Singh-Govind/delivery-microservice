const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connection = require("./src/config/dbConf");

const routes = require("./src/routes/store-route");
const productsRoute = require("./src/routes/product-route");

// other imports
const errorHandler = require("./src/middleware.js/error-handler");
const dataExtracter = require("./src/middleware.js/data-extracter");

// app configs
const app = express();

app.use(cors());
app.use(express.json());

app.use(dataExtracter);

app.use("/stores", routes);
app.use("/products", productsRoute);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to our store!" });
});

app.use(errorHandler);

const PORT = 5001;
app.listen(PORT, async () => {
  await connection();
  console.log("server started at", PORT);
});
