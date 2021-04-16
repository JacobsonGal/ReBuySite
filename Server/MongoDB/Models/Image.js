const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Image = new Schema({
  fileName: { type: String, required: true, unique: true },
  contentType: { type: String, required: true },
  imageBase64: { type: String, required: true },
});

module.exports = mongoose.model("images", Image);
