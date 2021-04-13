const Product = require("../models/Product");
const Image = require("../Models/Transaction");
const User = require("../models/User");
const fs = require("fs");
const { query } = require("express");

const createProduct = (req, res) => {
  console.log(req.body);
  const {
    name,
    condition,
    category,
    description,
    address,
    price,
    ownerId,
  } = req.body;
  const owner = new User();
  // const owner = null;
  // User.findOne({ email: ownerId }).exec();
  // if (!owner) {
  //   return res.status(402).json({ success: false, error: "No such user" });
  // }
  const files = req.files;
  console.log("files " + files);
  if (!files) {
    return res
      .status(401)
      .json({ success: false, error: "You must provide images" });
  }
  const images = [];
  const images64 = files.map((image) => {
    let img = fs.readFileSync(image.path);
    return (encode_image = img.toString("base64"));
    // return image.path.split("\\").join("/");
  });
  images64.map((src, index) => {
    //create object to store images in the collection
    let finalImg = {
      fileName: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src,
    };
    // let newImage = new Image(finalImg);
    // newImage
    //   .save()
    //   .then((result) => {
    //     console.log(newImage.fileName + "Inserted to collection!");
    //   })
    //   .catch((error) => {
    //     // if (error) {
    //     //   if (error.name === "MongoError" && error.code === 11000) {
    //     //     console.log(Prom);
    //     //   }
    //     // }
    //     console.log(error.message);
    //   });
    images.push(finalImg.imageBase64);
  });

  const product = new Product({
    name,
    condition,
    description,
    category,
    address,
    price,
    owner,
    images,
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

const sort = async (req, res) => {
  const products = await Product.find({}, (err, product) => {
    if (err) {
      console.log("there is an error", err);
    }
  });
  const newProd = products.sort((a, b) => {
    let nameA = a.name.toLowerCase(),
      nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  res.send(newProd);
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  search,
  sort,
};
