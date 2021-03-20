const express = require("express");

const UserCtrl = require("../controllers/User-ctrl");

const UserRouter = express.Router();

UserRouter.post("/user", UserCtrl.createUser);
UserRouter.put("/user/:id", UserCtrl.updateUser);
UserRouter.delete("/user/:id", UserCtrl.deleteUser);
UserRouter.get("/user/:id", UserCtrl.getUserById);
UserRouter.get("/user", UserCtrl.getUsers);

module.exports = UserRouter;
