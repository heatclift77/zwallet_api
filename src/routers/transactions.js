const express = require("express")
const router = express.Router()
const transactions = require("../controllers/transaction")
router
.get("/", transactions.getTrans)
.get("/details", transactions.getDetailTrans)
.post("/", transactions.setSaldoReciever, transactions.setSaldoSender, transactions.createTransaction)

module.exports = router