const express = require("express");
// const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const http = require("http");
const router = express.Router();
const productRouter = require("./MongoDB/Routes/Product-router");
const userRouter = require("./MongoDB/Routes/Users-router");
const app = express();
const apiPort = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api", productRouter);
app.use("/api", userRouter);
// app.use("/", router);
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origins: ["http://localhost:3001","https://rebuy.netlify.app/"],
    methods: ["GET", "POST"],
    credentials: false,
  },
});
let count = 0;
io.on("connection", (socket) => {
  // console.log("connect socket io");
  if (socket.handshake.headers.origin.includes("3001") ||socket.handshake.headers.origin.includes("rebuy.netlify.app") ) {
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

// module.exports.handler = serverless(app);
