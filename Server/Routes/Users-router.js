const express = require("express");

const UserCtrl = require("../controllers/User-ctrl");

const router = express.Router();

router.post("/user", UserCtrl.createUser);
router.put("/user/:id", UserCtrl.updateUser);
router.delete("/user/:id", UserCtrl.deleteUser);
router.get("/user/:id", UserCtrl.getUserById);
router.get("/user", UserCtrl.getUsers);

module.exports = router;
