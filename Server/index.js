const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");
const productRouter = require("./routes/product-router");
const userRouter = require("./routes/user-router");

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("ReBuy Server is Alive!");
});

app.use("/api", userRouter);
app.use("/api", productRouter);

app.listen(apiPort, () =>
  console.log(`ReBuy Server running on port ${apiPort}`)
);
