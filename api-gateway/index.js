const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config();

// app configs
const app = express();

const USER_SERVICE_URL = "http://localhost:5000";
const STORE_SERVICE_URL = "http://localhost:5001";


app.use(
  "/api/users",
  (req, res, next) => {
    console.log(req.url);
    next();
  },
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/users/",
    },
    on: {
        proxyReq: (proxyReq, req, res) => {
            console.log(`Forwarding Request: ${req.originalUrl} to ${proxyReq.path}`);
        },
        proxyRes: (proxyReq, req, res) => {
            console.log(`Forwarding Request: ${req.originalUrl} to ${proxyReq}`);
        }
    }
  })
);

app.use(
  "/api/stores",
  createProxyMiddleware({
    target: STORE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/stores/",
    },
    on: {
        proxyReq: (proxyReq, req, res) => {
            console.log(`Forwarding Request: ${req.originalUrl} to ${proxyReq.path}`);
        }
    }
  })
);

app.get("/", (req, res) => {
    res.send("welcome to the gateway!")
})

const PORT = 3000;
app.listen(PORT, async () => {
  console.log("server started at", PORT);
});
