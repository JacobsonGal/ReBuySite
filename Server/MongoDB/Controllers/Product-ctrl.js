const Product = require("../models/Product");
const fs = require("fs");
const { query } = require("express");

const createProduct = (req, res) => {
  const { name, condition, description, address, price, ownerId } = req.body;

  const images = req.files.map((image) => {
    return image.path.split("\\").join("/");
  });

  const product = new Product({
    name,
    condition,
    description,
    address,
    images,
    price,
    ownerId,
  });

  if (!product) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide a Product" });
  }

  product
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: product._id,
        message: "Product created!",
      });
    })
    .catch((error) => {
      console.log(error);
    });

  // return res.status(400).json({
  //   error,
  //   message: "Product not created!",
  // });
};

const updateProduct = async (req, res) => {
  const { name, condition, description, address, price, ownerId } = req.body;

  const images = req.files.map((image) => {
    return image.path.split("\\").join("/");
  });

  Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Product not found!",
      });
    }
    if (req.files) {
      product.images.map((path) => fs.unlink(path, (err) => console.log(err)));
    }
    product.name = name;
    product.condition = condition;
    product.description = description;
    product.address = address;
    product.images = images;
    product.price = price;
    product.ownerId = ownerId;
    product
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: product._id,
          message: "Product updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Product not updated!",
        });
      });
  });
};

const deleteProduct = async (req, res) => {
  await Product.findOneAndDelete({ _id: req.params.id }, (err, product) => {
    if (err) {
      console.log("Error");
      return res.status(400).json({ success: false, error: err });
    }
    if (!product) {
      console.log("no product");
      return res
        .status(404)
        .json({ success: false, error: `Product not found` });
    }
    product.images.map((path) => fs.unlink(path, (err) => console.log(err)));

    return res.status(200).json({ success: true, data: product });
  }).catch((err) => console.log(err));
};

const getProductById = async (req, res) => {
  await Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: `Product not found` });
    }
    return res.status(200).json({ success: true, data: product });
  }).catch((err) => console.log(err));
};

const getProducts = async (req, res) => {
  await Product.find({}, (err, product) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!product.length) {
      return res
        .status(404)
        .json({ success: false, error: `Product not found` });
    }
    return res.status(200).json({ success: true, data: product });
  }).catch((err) => console.log(err));
};

const search = async (req, res) => {
  const products = await Product.find(
    { name: new RegExp(req.query.query, "i") },
    (err, product) => {
      if (err) {
        console.log("there is an error", err);
      } else {
      }
    }
  );

  res.send(products);
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  search,
};
