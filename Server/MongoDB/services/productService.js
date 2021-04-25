/* Worker - Service Will take care of the hard work and the business logic:
    - Handle CRUD Operations
    - Fetching Data From DB
    - Will execute and run algorithms
    - Receives the request data it needs from the manager in order to perform its tasks
    - Is generally only concerned with the tasks he/she has to complete
    - Not responsible for making decisions about the "bigger" picture orchestrating the different service calls
    - Returns the completed work a response to the manager (Controller)
*/
const firebase = require('../DB/db')
const firestore = firebase.firestore();

const createProduct = async (req, res) => {
  try {
    console.log(req.body.name);
    const data = req.body;
    await firestore.collection('products').doc().set(data);
    res.send("The product create succesfully")
  } catch (error) {
    console.log("Notice the product NOT saved");
  }
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
    product.category = category;
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
  console.log("delete");
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
    console.log(product);

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

//aviv angular

const groupByCity = async (req, res) => {
  const data = await Product.aggregate([
    {
      $group: {
        _id: "$address",
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
      { address: req.query.address },
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
  //console.log(data);
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
  groupByCity
};
