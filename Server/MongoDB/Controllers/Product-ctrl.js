const Product = require("../models/Product");
const fs = require("fs");
const request = require('request-promise'); 
let axios = require('axios');
let cheerio = require('cheerio');
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


const createProductForScrapping = async (name,image,price) => {
  Product.findOne({ name:name }, function (err, p) {
    if (err) console.log(err);
    if (p) console.log("This term already been created");
    else {
      var product = new Product({
          name: name,
          condition:"New",
          description: "this is a scraped product",
          address : "Ness Ziona",
          images:image,
          price:price,
          ownerId:100

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
 const page = await axios.get('https://www.amazon.com/s?bbn=16225014011&rh=n%3A16225014011%2Cp_36%3A1253555011&dc&qid=1618237164&rnid=386589011&ref=lp_16225014011_nr_p_36_0')    
  const $ = cheerio.load(page.data); 
  $('.s-asin').each((i,el)=> {
    const name = $(el).find('h2 span').text();  
    const price = $(el).find('.a-price-whole').text();
    const image = $(el).find('.s-image').attr('src');
    createProductForScrapping(name,image,price);
    
});
};




module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  search,
  scrape
};
