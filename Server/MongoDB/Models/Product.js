const mongoose = require("mongoose");
const Image = require("./Image");
const User = require("./User");
const Schema = mongoose.Schema;
const Product = new Schema(
  {
    name: { type: String, required: true },
    condition: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: false },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", Product);
