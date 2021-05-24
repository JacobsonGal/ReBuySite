const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const http = require("http");
const productRouter = require("../MongoDB/routes/Product-router");
const userRouter = require("../MongoDB/routes/Users-router");
const app = express();
const apiPort = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("../netlify.toml/functions/api", productRouter);
app.use("../netlify.toml/functions/api", userRouter);
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origins: ["http://localhost:4200", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: false,
  },
});
let count = 0;
io.on("connection", (socket) => {
  // console.log("connect socket io");
  if (socket.handshake.headers.origin.includes("3001")) {
    count++;
    socket.broadcast.emit("count", count);
    console.log(count + " Connected Users");
    socket.on("disconnect", () => {
      count--;
      socket.broadcast.emit("count", count);
      console.log(count + " Connected Users");
    });
  }
});
app.get("/", (req, res) => {
  res.send("ReBuy Server is Alive!");
});
server.listen(apiPort, () => {
  console.log(`ReBuy Server running on port ${apiPort}`);
});

module.exports.handler = serverless(app);
