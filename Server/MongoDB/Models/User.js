const mongoose = require("mongoose");
const Product = require("./Product");
const Image = require("./Image");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: Schema.Types.ObjectId, ref: "Image", required: false },
    products: [{ type: Schema.Types.ObjectId, ref: "Product", null: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
