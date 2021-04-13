const express = require("express");
const ImageCtrl = require("../controllers/Images-ctrl");
const router = express.Router();

router.post("/image", ImageCtrl.createImage);
router.put("/image/:id", ImageCtrl.updateImage);
router.delete("/image/:id", ImageCtrl.deleteImage);
router.get("/image/:id", ImageCtrl.getImagesById);
router.get("/images", ImageCtrl.getImages);

module.exports = router;
