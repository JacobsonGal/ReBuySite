const Transaction = require("../Models/Transaction");
const fs = require("fs");
const { query } = require("express");

const createTransaction = (req, res) => {
  const { price, buyer, seller, approved } = req.body;

  let transaction = new Transaction({
    price,
    buyer,
    seller,
    approved,
  });

  if (!transaction) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide a Transaction" });
  }

  transaction
    .save()
    .then(() => {
      // console.log(transaction.id + "Inserted to collection!");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const updateTransaction = async (req, res) => {
  const { price, buyer, seller, approved } = req.body;

  Transaction.findOne({ _id: req.params.id }, (err, transaction) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Transaction not found!",
      });
    }
    (transaction.price = price),
      (transaction.buyer = buyer),
      (transaction.seller = seller),
      (transaction.approved = approved),
      transaction
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: image._id,
            message: "Transaction updated!",
          });
        })
        .catch((error) => {
          return res.status(404).json({
            error,
            message: "Transaction not updated!",
          });
        });
  });
};

const deleteTransaction = async (req, res) => {
  await Transaction.findOneAndDelete(
    { _id: req.params.id },
    (err, transaction) => {
      if (err) {
        console.log("Error");
        return res.status(400).json({ success: false, error: err });
      }
      if (!transaction) {
        return res
          .status(404)
          .json({ success: false, error: `Transaction not found` });
      }
      return res.status(200).json({ success: true, data: transaction });
    }
  ).catch((err) => console.log(err));
};

const getTransactionsById = async (req, res) => {
  await Transaction.findOne({ _id: req.params.id }, (err, transaction) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, error: `Transaction not found` });
    }
    return res.status(200).json({ success: true, data: transaction });
  }).catch((err) => console.log(err));
};

const getTransactions = async (req, res) => {
  await Transaction.find({}, (err, transaction) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!transaction.length) {
      return res
        .status(404)
        .json({ success: false, error: `Transaction not found` });
    }
    return res.status(200).json({ success: true, data: transaction });
  }).catch((err) => console.log(err));
};

module.exports = {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsById,
  getTransactions,
};
