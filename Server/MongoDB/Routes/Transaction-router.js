const express = require("express");
const TransactionCtrl = require("../controllers/Transaction-ctrl");
const router = express.Router();

router.post("/transaction", TransactionCtrl.createTransaction);
router.put("/transaction/:id", TransactionCtrl.updateTransaction);
router.delete("/transaction/:id", TransactionCtrl.deleteTransaction);
router.get("/transaction/:id", TransactionCtrl.getTransactionsById);
router.get("/transactions", TransactionCtrl.getTransactions);

module.exports = router;
