const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./MongoDB/DB");
const productRouter = require("./MongoDB/routes/product-router");
const userRouter = require("./MongoDB/routes/Users-router");

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("ReBuy Server is Alive!");
});

app.use("/api", userRouter);
app.use("/api", productRouter);
app.listen(apiPort, () =>
  console.log(`ReBuy Server running on port ${apiPort}`)
);
