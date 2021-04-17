const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://manu:academind123@cluster0.xsgi4.mongodb.net/ReBuySite?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
