const Image = require("../models/Image");
const fs = require("fs");
const { query } = require("express");

const getImages = async (req, res) => {
  await Image.find({}, (err, image) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!image.length) {
      return res.status(404).json({ success: false, error: `Image not found` });
    }
    return res.status(200).json({ success: true, data: image });
  }).catch((err) => console.log(err));
};

module.exports = {
  getImages,
};
