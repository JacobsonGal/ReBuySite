const Product = require("../models/Product");
const Image = require("../models/Image");
const User = require("../models/User");
const fs = require("fs");
const db = require("../DB/index");
const axios = require("axios");
const cheerio = require("cheerio");

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
  const files = req.files;
  let email = ownerId.toUpperCase();
  const owner = await User.findOne({ email });
  if (!owner) {
    email = ownerId.toLowerCase();
    owner = await User.findOne({ email });
    if (!owner)
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
      User.updateOne(
        {
          _id: owner._id,
        },
        { $push: { products: product._id } }
      ).then(console.log("owner updated"));
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
  if (files.length !== 0) {
    const images64 = files.map((image) => {
      let img = fs.readFileSync(image.path);
      return (encode_image = img.toString("base64"));
    });
    images64.map(async (src, index) => {
      let finalImg = {
        fileName: files[index].originalname,
        contentType: files[index].mimetype,
        imageBase64: src,
      };
      // let cache = Image.findOne({ fileName: files[index].originalname });
      let cache;
      try {
        const cache = await Image.findOne(
          { fileName: files[index].originalname },
          function (err, image) {
            if (err) console.log(err.message);
            if (!image) console.log(`Image not found`);
          }
        );

        console.log(cache);
        if (cache) {
          images.push(cache);
          console.log(cache.fileName + "Inserted to product!");
        } else {
          let newImage = new Image(finalImg);
          newImage
            .save()
            .then(() => {
              console.log(newImage.fileName + "Inserted to collection!");
            })
            .catch((error) => {
              if (error.code === 11000)
                images.push(
                  Image.find({ fileName: files[index].originalname })
                );
              console.log(error.message);
            });
          images.push(newImage);
        }
      } catch (error) {
        console.log(error.message);
        // res.send({ error: error.message });
      }
    });
  }
  console.log(images);

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
    if (files.length !== 0) product.images = images;
    else product.images = product.images;
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
  await Product.find({})
    .sort({ createdAt: "desc" })
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!product.length) {
        return res
          .status(404)
          .json({ success: false, error: `Product not found` });
      }
      return res.status(200).json({ success: true, data: product });
    });
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
  // console.log(data);
  res.json({ products: newProducts, data: data });
};
const mapAndReduce = async (req, res) => {
  var mapFunction1 = function () {
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


const createProductForScrapping = async (name, image, price) => {
  Product.findOne({ name: name }, function (err, p) {
    if (err) console.log(err);
    if (p) console.log("This term already been created");
    else {
      let image = [];
      image.push("6078b6e34f270e6860150cba");
      var product = new Product({
        name: name,
        condition: "New",
        description: "this is a scraped product",
        address: "נס ציונה",
        price: price,
        category: "sports",
        images: image,
        owner: "60757be962462652dc9289b3"


      });
      product.save(function (err, example) {
        if (err) console.log(err);
        console.log("New term created!");
        return product;
      });
    }
  });
};

const scrape = async () => { //add scrape from amazon
  console.log("im here");
  console.log("im here");
  console.log("im here");
  const page = await axios.get('https://www.amazon.com/s?i=sporting-intl-ship&bbn=16225014011&rh=n%3A10971181011%2Cn%3A3422251%2Cp_36%3A1253555011&dc&qid=1618576123&rnid=10971181011&ref=sr_nr_n_12')
  const $ = cheerio.load(page.data);
  $('.s-asin').each((i, el) => {
    const name = $(el).find('h2 span').text();
    const price = $(el).find('.a-price-whole').text();
    const image = $(el).find('.s-image').attr('src');
    createProductForScrapping(name, image, price);

  });
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
  scrape
};
