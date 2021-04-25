const Product = require("../models/Product");
const Image = require("../models/Image");
const User = require("../models/User");
const fs = require("fs");
const db = require("../DB/index");

const createUser = (req, res) => {
  const { name, phone, email } = req.body;
  console.log(req.body);
  console.log(name + phone + email);
  const file = req.file;
  console.log("files : " + req.file);

  if (!file) {
    return res
      .status(401)
      .json({ success: false, error: "You must provide images" });
  }

  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a User",
    });
  }
  const image64 = (encode_image = fs
    .readFileSync(file.path)
    .toString("base64"));

  let finalImg = {
    fileName: file.originalname,
    contentType: file.mimetype,
    imageBase64: image64,
  };

  let newImage = new Image(finalImg);
  let id = newImage._id;

  const image = newImage;
  newImage
    .save()
    .then((result) => {
      console.log(newImage.fileName + "Inserted to collection!");
    })
    .catch((error) => {
      console.log(error.message);
    });

  const user = new User({ name, phone, email, image });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide a User" });
  }

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User created!",
      });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(400).json({
        400: "400",
        error,
        message: error.message,
      });
    });
};

const updateUser = async (req, res) => {
  const body = req.body;
  const file = req.file;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  const images64 = (encode_image = fs
    .readFileSync(file.path)
    .toString("base64"));
  let finalImg = {
    fileName: images64.originalname,
    contentType: images64.mimetype,
    imageBase64: images64,
  };
  let newImage = new Image(finalImg);
  newImage
    .save()
    .then(() => {
      console.log(newImage.fileName + "Inserted to collection!");
    })
    .catch((error) => {
      console.log(error.message);
    });

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    user.email = body.email;
    user.name = body.name;
    user.phone = body.phone;
    user.image = body.image;
    user.image = newImage;

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });
};

const deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

const getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

const getUsers = async (req, res) => {
  await User.find({}, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!user.length) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
};
