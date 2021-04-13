const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: { type: String, required: true },
    condition: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: false },
    address: { type: String, required: true },
    images: { type: Array, required: true },
    price: { type: Number, required: true },
    ownerId: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", Product);
