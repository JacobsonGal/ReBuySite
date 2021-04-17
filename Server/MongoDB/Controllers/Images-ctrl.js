const Image = require("../models/Image");
const fs = require("fs");
const { query } = require("express");

const createImage = (req, res) => {
  const { fileName, contentType, imageBase64 } = req.body;

  let image = new Image({
    fileName,
    contentType,
    imageBase64,
  });

  if (!image) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide a Product" });
  }

  image
    .save()
    .then(() => {
      console.log(image.fileName + "Inserted to collection!");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const updateImage = async (req, res) => {
  const { fileName, contentType, imageBase64 } = req.body;

  Image.findOne({ _id: req.params.id }, (err, image) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Image not found!",
      });
    }
    (image.fileName = fileName),
      (image.contentType = contentType),
      (image.imageBase64 = imageBase64),
      image
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: image._id,
            message: "Image updated!",
          });
        })
        .catch((error) => {
          return res.status(404).json({
            error,
            message: "Image not updated!",
          });
        });
  });
};

const deleteImage = async (req, res) => {
  await Image.findOneAndDelete({ _id: req.params.id }, (err, image) => {
    if (err) {
      console.log("Error");
      return res.status(400).json({ success: false, error: err });
    }
    if (!image) {
      return res.status(404).json({ success: false, error: `Image not found` });
    }
    return res.status(200).json({ success: true, data: image });
  }).catch((err) => console.log(err));
};

const getImagesById = async (req, res) => {
  await Image.findOne({ _id: req.params.id }, (err, image) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!image) {
      return res.status(404).json({ success: false, error: `Image not found` });
    }
    return res.status(200).json({ success: true, data: image });
  }).catch((err) => console.log(err));
};

const getImages = async (req, res) => {
  await Image.find({}, (err, image) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!image.length) {
      return res.status(404).json({ success: false, error: `Image not found` });
    }
    console.log(image);
    return res.status(200).json({ success: true, data: image });
  }).catch((err) => console.log(err));
};

module.exports = {
  getImages,
  createImage,
  updateImage,
  deleteImage,
  getImagesById,
};
