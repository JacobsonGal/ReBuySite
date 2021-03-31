const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://manu:academind123@cluster0.xsgi4.mongodb.net/rebuyApp?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
