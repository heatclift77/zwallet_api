const sendVerification = require('./sendMailtoVerify')
const tokenValidation = require('./tokenValidation')
const upload = require("./uploadImageProfilConfig")

module.exports = {
    sendVerification, tokenValidation,  upload
}