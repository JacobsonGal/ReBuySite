const mongoose = require("mongoose");
const Product = require("./Product");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
