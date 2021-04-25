const productService = require("../services/productService");

const createProduct = async (req, res) => {
  const product = await productService.createProduct(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateProduct = async (req, res) => {
  const product = await productService.updateProduct(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteProduct = async (req, res) => {
  const product = await productService.deleteProduct(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getProductById = async (req, res) => {
  const product = await productService.getProductById(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getProducts = async (req, res) => {
  const product = await productService.getProducts(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const search = async (req, res) => {
  const product = await productService.search(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const groupBy = async (req, res) => {
  const product = await productService.groupBy(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

const groupByCity = async (req, res) => {
  const product = await productService.groupByCity(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
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
  groupByCity,
};
