const express = require("express");
const ImageCtrl = require("../controllers/Images-ctrl");
const router = express.Router();

router.get("/images", ImageCtrl.getImages);

module.exports = router;
