const express = require("express");
const upload = require("../middlewares/upload");
const ProductCtrl = require("../controllers/Product-ctrl");

const router = express.Router();

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
router.get("/products/groupby", ProductCtrl.groupBy);
router.get("/products/mapreduce", ProductCtrl.mapAndReduce);

module.exports = router;
