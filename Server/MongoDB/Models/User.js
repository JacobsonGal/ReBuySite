const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String, required: false },
    products: [{ type: Schema.Types.ObjectId, ref: "Product", null: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
