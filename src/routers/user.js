const express = require("express")
const router = express.Router()
const user = require("../controllers/user")
const { sendVerification, tokenValidation } = require("../middlewares")
const upload = require("../middlewares/uploadImageProfilConfig")

router
.post("/register", user.register, sendVerification)
.post("/login", user.login)
.post("/cekPin", user.cekPin)
.get("/saldo", user.getSaldoByUser)
.get("/search", user.search)
.get("/cekAcount", user.cekEmailAndUsername)
.get("/verifycation/:email", user.verifyAcount)
.get("/cekToken", tokenValidation, user.sendDataUser)
.put("/changePin", user.changePin)
.put("/", user.updateProfil)
.put("/changeImage", upload, user.updateImgProfil)

module.exports = router