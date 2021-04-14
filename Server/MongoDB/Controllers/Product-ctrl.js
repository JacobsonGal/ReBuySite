const Product = require("../models/Product");
const Image = require("../models/Image");
const User = require("../models/User");
const fs = require("fs");
const db = require("../DB/index");

const createProduct = async (req, res) => {
  const {
    name,
    condition,
    category,
    description,
    address,
    price,
    ownerId,
  } = req.body;
  let email = ownerId;
  const files = req.files;
  const owner = await User.findOne({ email });
  if (!owner) {
    return res.status(402).json({ success: false, error: "No such user" });
  }
  if (!files) {
    return res
      .status(401)
      .json({ success: false, error: "You must provide images" });
  }
  const images = [];
  const images64 = files.map((image) => {
    let img = fs.readFileSync(image.path);
    return (encode_image = img.toString("base64"));
  });
  images64.map((src, index) => {
    let finalImg = {
      fileName: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src,
    };
    let newImage = new Image(finalImg);
    let id = newImage._id;
    console.log(newImage._id);
    console.log(id);
    images.push(newImage._id);
    newImage
      .save()
      .then((result) => {
        console.log(newImage.fileName + "Inserted to collection!");
      })
      .catch((error) => {
        console.log(error.message);
      });
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
  const {
    name,
    condition,
    description,
    address,
    price,
    category,
    ownerId,
  } = req.body;

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
  });
  images64.map((src, index) => {
    let finalImg = {
      fileName: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src,
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
    images.push(newImage);
  });

  Product.findOne({ _id: req.params.id }, (err, product) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Product not found!",
      });
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
  const { condition, price, category } = req.query;
  let products = await Product.find({}, (err, product) => {
    if (err) {
      console.log(err);
    }
  });
  if (condition) {
    products = products.filter((product) => {
      return product.condition === condition;
    });
  }
  if (category) {
    products = products.filter((product) => {
      return product.category === category;
    });
  }
  if (price) {
    products = products.filter((product) => {
      if (price == "less than 500") {
        return product.price < 500;
      } else if (price == "500-1000") {
        return product.price >= 500 && product.price < 1000;
      } else if (price === "1000-5000") {
        return product.price >= 1000 && product.price < 5000;
      } else {
        return product.price >= 5000;
      }
    });
  }
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
const groupBy = async (req, res) => {
  const data = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: 1 },
      },
    },
  ]);
  let products;
  if (!req.query.category) {
    products = await Product.find({}, (err, product) => {
      if (err) console.log(err);
    });
  } else {
    products = await Product.find(
      { category: req.query.category },
      (err, product) => {
        if (err) {
          console.log("there is an error", err);
        }
      }
    );
  }
  const newProducts = products.sort((a, b) => {
    let nameA = a.category.toLowerCase(),
      nameB = b.category.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  console.log(data);
  res.json({ products: newProducts, data: data });
};

const mapAndReduce = async (req, res) => {
  var mapFunction1 = function () {
    console.log("stam");
    emit(this.category, this.price);
  };
  var reduceFunction1 = function (keyCategory, valuesPrices) {
    // return Array.sum(valuesPrices);
    return 1;
  };
  Product.mapReduce(mapFunction1, reduceFunction1, {
    out: "map_reduce_example",
  });
  res.send("hey");
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  search,
  sort,
  groupBy,
  mapAndReduce,
};
