const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const verifyToken = require("./middleware/authorization");
const injectLoggedFlag = require("./middleware/injectFlag");

require("dotenv").config();


// app configs
const app = express();

const USER_SERVICE_URL = "http://user-service:5000";
const STORE_SERVICE_URL = "http://store-service:5001";
const DELIVERY_SERVICE_URL = "http://delivery-service:5002";

app.use(verifyToken);

app.use(
  "/api/users",
  injectLoggedFlag,
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/users/",
    },
  })
);

app.use(
  "/api/stores",
  injectLoggedFlag,
  createProxyMiddleware({
    target: STORE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/stores/",
    },
  })
);

app.use(
  "/api/products",
  injectLoggedFlag,
  createProxyMiddleware({
    target: STORE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/products/",
    },
  })
);

app.use(
  "/api/carts",
  injectLoggedFlag,
  createProxyMiddleware({
    target: STORE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/carts/",
    },
  })
);

app.use(
  "/api/order",
  injectLoggedFlag,
  createProxyMiddleware({
    target: STORE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/order/",
    },
  })
);

// this will go to delivery service
app.use(
  "/api/orders",
  injectLoggedFlag,
  createProxyMiddleware({
    target: DELIVERY_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/orders/",
    },
  })
);

app.get("/", (req, res) => {
    res.send("welcome to the gateway!")
})

const PORT = 3000;
app.listen(PORT, async () => {
  console.log("server started at", PORT);
});
