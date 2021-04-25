const express = require("express")
const router = express.Router()
const user = require("./user")
const transaction = require("./transactions")

router
.use("/user", user)
.use("/transactions", transaction)
module.exports = router