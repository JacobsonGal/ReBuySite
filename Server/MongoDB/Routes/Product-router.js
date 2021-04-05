const express = require("express");
const upload = require("../middlewares/upload");
const ProductCtrl = require("../controllers/Product-ctrl");

const router = express.Router();

router.post("/product", upload.array("images", 4), ProductCtrl.createProduct);
router.put("/product/:id", ProductCtrl.updateProduct);
router.delete("/product/:id", ProductCtrl.deleteProduct);
router.get("/product/:id", ProductCtrl.getProductById);
router.get("/products", ProductCtrl.getProducts);

module.exports = router;
