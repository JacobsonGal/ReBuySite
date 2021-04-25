const userService = require("../services/userService");

const createUser = (req, res) => { 
   const user = await userService.createUser(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }};

const updateUser = async (req, res) => {
   const user = await userService.updateUser(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  };
};

const deleteUser = async (req, res) => {
   const user = await userService.deleteUser(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  };
};

const getUserById = async (req, res) => {
   const user = await userService.getUserById(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  };
};

const getUsers = async (req, res) => {
   const user = await userService.getUsers(req);
  try {
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  };
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
};
