const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const db = require("./MongoDB/DB");

const productRouter = require("./MongoDB/routes/Product-router");
const userRouter = require("./MongoDB/routes/Users-router");
const transactionRouter = require("./MongoDB/Routes/Transaction-router");

const app = express();
const apiPort = 3000;
app.use(cors());
app.use("/uploads", express.static("uploads"));

const server = http.createServer(app);

//socket io init

const io = socketIo(server, {
  cors: {
    origins: ["http://localhost:4200", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: false,
  },
});
//getting the number of clients logged in to the site
var count = 0;
io.on("connection", (socket) => {
  if (socket.handshake.headers.origin === "http://localhost:3001") {
    count++;
    socket.broadcast.emit("count", count);
    // console.log("number of users  " + " " + count);
    socket.on("disconnect", () => {
      count--;
      socket.broadcast.emit("count", count);
      // console.log("number of users  " + count);
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
app.use("/api", transactionRouter);

server.listen(apiPort, () =>
  console.log(`ReBuy Server running on port ${apiPort}`)
);
