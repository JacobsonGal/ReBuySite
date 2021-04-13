const mongoose = require("mongoose");
<<<<<<< HEAD
const Product = require("./Product");
const Image = require("./Image");
=======
>>>>>>> parent of 413847f (3 models and pictures)
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
<<<<<<< HEAD
    image: { type: Schema.Types.ObjectId, ref: "Image", required: false },
    products: [{ type: Schema.Types.ObjectId, ref: "Product", null: true }],
=======
    image: { type: String, required: true },
>>>>>>> parent of 413847f (3 models and pictures)
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
