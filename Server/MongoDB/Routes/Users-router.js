/*const express = require("express");
const upload = require("../middlewares/upload");
const UserCtrl = require("../controllers/User-ctrl");

const router = express.Router();

router.post("/user", upload.single("image"), UserCtrl.createUser);
router.put("/user/:id", upload.single("image"), UserCtrl.updateUser);
router.delete("/user/:id", UserCtrl.deleteUser);
router.get("/user/:id", UserCtrl.getUserById);
router.get("/users", UserCtrl.getUsers);

module.exports = router;*/
