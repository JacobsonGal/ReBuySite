const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const db = require("./MongoDB/DB");
const productRouter = require("./MongoDB/routes/product-router");
const userRouter = require("./MongoDB/routes/Users-router");
const imageRouter = require("./MongoDB/routes/Image-router");

const app = express();
const apiPort = 3000;
app.use(cors());
app.use("/uploads", express.static("uploads"));

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.get("/", (req, res) => {
  res.send("ReBuy Server is Alive!");
});
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", imageRouter);
server.listen(apiPort, () => {
  console.log(`ReBuy Server running on port ${apiPort}`);
});
