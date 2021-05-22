const express = require("express");
const ProductCtrl = require("../Controllers/Product-ctrl");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post("/product", upload.array("images", 10), ProductCtrl.createProduct);
router.put(
  "/product/:id",
  upload.array("images", 10),
  ProductCtrl.updateProduct
);
router.delete("/product/:id", ProductCtrl.deleteProduct);
router.get("/product/:id", ProductCtrl.getProductById);
router.get("/products", ProductCtrl.getProducts);
router.get("/products/search", ProductCtrl.search);
router.get("/products/sort", ProductCtrl.sort);
router.get("/products/groupByCity", ProductCtrl.groupByCity);
module.exports = router;
