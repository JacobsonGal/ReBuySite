const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transaction = new Schema({
  price: { type: Number, required: true },
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
  seller: { type: Schema.Types.ObjectId, ref: "User" },
  approved: { type: Boolean, required: false },
});

module.exports = mongoose.model("transactions", Transaction);
