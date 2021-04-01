const Product = require("../models/Product");
const fs = require("fs");

const createProduct = (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));
  console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Product",
    });
  }

  const product = new Product(body);
  const files = req.files;
  // const { path: image } = req.file;
  // product.image = image.split("\\").join("/");

  let imgArray = files.map((file) => {
    let img = fs.readFileSync(file.path);
    return (encode_image = img.toString("base64"));
  });

  let result = imgArray.map((src, i) => {
    let finalImg = {
      filename: files[i].originalname,
      contentType: files[i].mimetype,
      imageBase64: src,
    };
  });
  product.image = imgArray;

  console.log(product);
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
      if (error.name === "MongoError" && error.code === 11000) {
        return Promise.reject({
          error: `Duplicate${files[i].originalname}. File Already exists!`,
        });
      }

      return res.status(400).json({
        error,
        message: "Product not created!",
      });
    });
};

const updateProduct = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Product not found!",
      });
    }
    product.name = body.name;
    product.condition = body.condition;
    product.description = body.description;
    product.image = body.image;
    product.price = body.price;
    product.ownerId = body.ownerId;
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

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
};
