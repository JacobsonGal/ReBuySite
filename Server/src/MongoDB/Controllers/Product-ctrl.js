const firebase = require("../DB/db");
const firestore = firebase.firestore();

const createProduct = async (req, res) => {
  console.log("Adding product : " + req.body.name);
  const body = req.body;
  console.log(req.body);
  firestore
    .collection("products")
    .doc()
    .set(body)
    .then(() => {
      return res.status(200).json({
        success: true,
        data: "Product has been added successfully",
      });
    })
    .catch((error) => {
      return res.status(404).json({ success: false, error: error.message });
    });
};

const updateProduct = async (req, res) => {
  console.log("Updating product : " + req.params.id);
  const prodName = req.params.id;
  const { name, condition, description, address, price, category, owner } =
    req.body;

  await firestore
    .collection("products")
    .where("name", "==", prodName)
    .get()
    .then((Snapshot) => {
      if (Snapshot.docs.length == 0)
        return res
          .status(401)
          .json({ success: false, data: "Product not found" });
      Snapshot.forEach((doc) => {
        doc.ref.update({
          name: name,
          condition: condition,
          description: description,
          address: address,
          price: price,
          category: category,
          owner: owner,
        });
        return res.status(200).json({
          success: true,
          message: "Product has been updated successfully",
        });
      });
    })
    .catch((error) => {
      return res.status(404).json({ success: false, error: error.message });
    });
};

const deleteProduct = async (req, res) => {
  console.log("Deleting product : " + req.params.id);
  const prodName = req.params.id;
  firestore
    .collection("products")
    .where("name", "==", prodName)
    .get()
    .then((Snapshot) => {
      if (Snapshot.docs.length == 0)
        return res
          .status(401)
          .json({ success: false, data: "Product not found" });
      Snapshot.forEach((doc) => {
        doc.ref.delete();
        return res.status(200).json({
          success: true,
          data: "Product has been deleted successfully",
        });
      });
    })
    .catch((error) => {
      return res.status(404).json({ success: false, error: error.message });
    });
};

const getProductById = async (req, res) => {
  console.log("Getting product : " + req.params.id);
  const prodName = req.params.id;
  firestore
    .collection("products")
    .where("name", "==", prodName)
    .get()
    .then((Snapshot) => {
      if (Snapshot.docs.length == 0)
        return res
          .status(401)
          .json({ success: false, data: "Product not found" });
      Snapshot.forEach((doc) => {
        return res.status(200).json({ success: true, data: doc.data() });
      });
    })
    .catch((error) => {
      return res.status(404).json({ success: false, error: error.message });
    });
};

const getProducts = async (req, res) => {
  // console.log("Getting products");
  firestore
    .collection("products")
    .get()
    .then((Snapshot) => {
      if (Snapshot.docs.length == 0)
        return res.status(401).json({ success: false, data: "No Products" });
      let response = [];
      Snapshot.docs.map((doc) => response.push(doc.data()));
      return res.status(200).json({ success: true, data: response });
    })
    .catch((error) => {
      return res.status(404).json({ success: false, error: error.message });
    });
};

const search = async (req, res) => {
  const { condition, price, category } = req.query;
  console.log("searching");
  let products = [];
  firestore
    .collection("products")
    .get()
    .then((Snapshot) => {
      if (Snapshot.docs.length == 0)
        return res.status(401).json({ success: false, data: "No Products" });
      Snapshot.forEach((doc) => {
        products.push(doc.data());
      });

      console.log(condition);
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
      return res.status(200).json({ success: true, data: products });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).json({ success: false, error: error.message });
    });
};

const sort = async (req, res) => {
  firestore
    .collection("products")
    .get()
    .then((Snapshot) => {
      if (Snapshot.docs.length == 0)
        return res.status(401).json({ success: false, data: "No Products" });
      const products = Snapshot.docs.find({}, (err, product) => {
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
    })
    .catch((error) => {
      return res.status(404).json({ success: false, error: error.message });
    });
};

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

const addToFavorites = async (req, res) => {
  const userId = req.body.user.uid;
  const product = req.body.product;
  let favor = [];

  firestore
    .collection("users")
    .doc(userId)
    .get()
    .then((res) => {
      if (res.data().favorites && res.data().favorites != 0)
        favor = res.data().favorites;
      if (!res.data().favorites.includes(product)) favor.push(product);
      firestore.collection("users").doc(userId).update({ favorites: favor });
    })
    .catch((error) => {
      console.log("error", error);
      return res.status(404).json({ success: false, error: error.message });
    });
};

const removeFromFavorites = async (req, res) => {
  console.log("stam");
  const userId = req.body.user.uid;
  const product = req.body.product;
  let favorites = [];
  firestore
    .collection("users")
    .doc(userId)
    .get()
    .then((res) => {
      if (res.data().favorites && res.data().favorites != 0)
        favorites = res.data().favorites;
      if (favorites.some((prod) => prod.name === product.name)) {
        favorites = favorites.filter((prod) => prod.name !== product.name);
        firestore
          .collection("users")
          .doc(userId)
          .update({ favorites: favorites });
      }
    })
    .catch((error) => {
      console.log("error", error);
      return res.status(404).json({ success: false, error: error.message });
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
  groupByCity,
  addToFavorites,
  removeFromFavorites,
};