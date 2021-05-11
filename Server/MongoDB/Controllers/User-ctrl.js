const Product = require("../models/Product");
const User = require("../models/User");
const fs = require("fs");
const firebase = require("../DB/db");
require("firebase/storage");
const firestore = firebase.firestore();

async function uploadImage(file) {
  const ref = firebase.storage().ref();
  const name = file.filename.toString();
  const metadata = { contentType: file.mimetype };
  const task = ref.child(name).put(file, metadata);

  await task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      console.log(url);
      return url;
    })
    .catch(console.error);
}

const createUser = async (req, res) => {
  // console.log("Adding user : " + req.body.name);
  // const { name, phone, email, products } = req.body;
  // // const file = await uploadImage(req.file);
  // const image = "";
  // console.log(req.body);

  // firestore
  //   .collection("users")
  //   .doc()
  //   .set({ name, phone, email, image, products })
  //   .then(() => {
  //     return res.status(200).json({
  //       success: true,
  //       data: "User has been added successfully",
  //     });
  //   })
  //   .catch((error) => {
  //     return res.status(404).json({ success: false, error: error.message });
  //   });

  console.log("Adding user : " + req.body.name);
  const body = req.body;
  console.log(req.body);
  firestore
    .collection("users")
    .doc()
    .set(body)
    .then(() => {
      return res.status(200).json({
        success: true,
        data: "User has been added successfully",
      });
    })
    .catch((error) => {
      return res.status(404).json({ success: false, error: error.message });
    });
};

const updateUser = async (req, res) => {
  console.log("Updating user : " + req.params.id);
  const userEmail = req.params.id;
  const { name, phone, email, image, products } = req.body;

  await firestore
    .collection("users")
    .where("email", "==", userEmail)
    .get()
    .then((Snapshot) => {
      if (Snapshot.docs.length == 0)
        return res.status(401).json({ success: false, data: "User not found" });
      Snapshot.forEach((doc) => {
        doc.ref.update({
          name: name,
          phone: phone,
          email: email,
          image: image,
          products: products,
        });
        return res.status(200).json({
          success: true,
          message: "User has been updated successfully",
        });
      });
    })
    .catch((error) => {
      return res.status(404).json({ success: false, error: error.message });
    });
};

const deleteUser = async (req, res) => {
  console.log("Deleting user : " + req.params.id);
  const userEmail = req.params.id;
  firestore
    .collection("users")
    .where("email", "==", userEmail)
    .get()
    .then((Snapshot) => {
      if (Snapshot.docs.length == 0)
        return res.status(401).json({ success: false, data: "User not found" });
      Snapshot.forEach((doc) => {
        doc.ref.delete();
        return res.status(200).json({
          success: true,
          data: "User has been deleted successfully",
        });
      });
    })
    .catch((error) => {
      return res.status(404).json({ success: false, error: error.message });
    });
};

const getUserById = async (req, res) => {
  console.log("Getting user : " + req.params.id);
  const userEmail = req.params.id;
  firestore
    .collection("users")
    .where("email", "==", userEmail)
    .get()
    .then((Snapshot) => {
      if (Snapshot.docs.length == 0)
        return res.status(401).json({ success: false, data: "User not found" });
      Snapshot.forEach((doc) => {
        return res.status(200).json({ success: true, data: doc.data() });
      });
    })
    .catch((error) => {
      return res.status(404).json({ success: false, error: error.message });
    });
};

const getUsers = async (req, res) => {
  console.log("Getting users");
  firestore
    .collection("users")
    .get()
    .then((Snapshot) => {
      if (Snapshot.docs.length == 0)
        return res.status(401).json({ success: false, data: "No Users" });
      let response = [];
      Snapshot.docs.map((doc) => response.push(doc.data()));
      return res.status(200).json({ success: true, data: response });
    })
    .catch((error) => {
      return res.status(404).json({ success: false, error: error.message });
    });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
};
