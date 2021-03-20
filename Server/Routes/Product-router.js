const express = require("express");

const ProductCtrl = require("../controllers/Product-ctrl");

const ProductRouter = express.Router();

ProductRouter.post("/product", ProductCtrl.createProduct);
ProductRouter.put("/product/:id", ProductCtrl.updateProduct);
ProductRouter.delete("/product/:id", ProductCtrl.deleteProduct);
ProductRouter.get("/product/:id", ProductCtrl.getProductById);
ProductRouter.get("/products", ProductCtrl.getProducts);

module.exports = ProductRouter;
