const express = require("express")
const app = express()
const router = require("./src/routers")
const cors = require("cors")
const cookieParser = require('cookie-parser')

const optionCors = {
    origin: 'http://localhost:3000',
    credentials: true
}

app
.use(cors(optionCors))
.use(express.urlencoded({ extended: false }))
.use(express.json())
.use(cookieParser())
.use("/v1", router)
.use("/img", express.static(`${__dirname}/src/assets`))
.listen(5000,()=>{
    console.log("running on port 5000")
})