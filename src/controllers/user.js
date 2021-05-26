const model = require("../models/user");
const bcrypt = require('bcryptjs');
const {v4:uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");
exports.postUser = (req, res) => {
    const {firstName, lastName, email, password, phoneNumber} = req.body
    model()
}
exports.getSaldoByUser = (req, res) => {
    const {email} = req.query
    model.getSaldo(email)
    .then(response => {
        res.send(response.data)
    })
    .catch(err => {
        res.json({ error : err.error })
    })
}

exports.search = (req, res) => {
    const {key, id_user} = req.query
    model.search(key, id_user)
    .then(response => {
        res.json({
            data : response.data
        }).status(response.status)
    })
    .catch(err => {
        res.json({
            message : err.message,
        }).status(err.status)
    })
}
exports.register = (req, res, next) => {
    const {username, email, password, pin} = req.body
    if(username == undefined || email == undefined || password == undefined || pin == undefined){
        res.status(400).json({message : "beberapa field tidak terbaca, proses tidak bisa dilanjutkan"})
    }else{
        const id_wallet = uuidv4()
        const id_user = uuidv4()
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const img_profil_default = `${process.env.DIR_IMG}/default.jpg`
        model.register(id_wallet, id_user, hash, email, pin, username, img_profil_default)
        .then(response => {
            res.status(response.status).json({message : response.message})
            console.log(response.status);
            next()
        })
        .catch(err => {
            res.status(err.status).json({message : err.message})
        })
    }
}
exports.cekEmailAndUsername = (req, res) => {
    const {username, email} = req.query
    if(username == undefined || email == undefined){
        res.json({
            message : "beberapa field di perlukan untuk proses" 
        }).status(400)
    }else{
        model.cekAcount(username, email)
        .then(response => {
            res.status(response.status).json({message : response.message})
        })
        .catch(err => {
            res.status(err.status).json({message : err.message})
        })
    }
}
exports.verifyAcount = (req, res) => {
    const { email } = req.params
    model.verifyAcount(email)
    .then(response=>{
        res.redirect(`${process.env.APP}/verified_landing`)
    })
    .catch(err =>{
        res.status(err.status).json({message : err.message})
    })
}
exports.login = (req, res) => {
    const { email, pass } = req.body
    if(email == undefined || pass == undefined){
        res.status(400).json({message : "beberapa field tidak terbaca, proses tidak bisa dilanjutkan"})
    }else{
        model.login(email, pass)
        .then(response => {
            const payload = {email : response.data[0].email};
            jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: "24h" }, function(err, token){
                // res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                //     httpOnly: true,
                //     maxAge: 60 * 60,
                //     secure: false,
                //     path: '/',
                //     sameSite: 'strict'
                // }))
                res.status(response.status).json({
                    message : response.message,
                    token : token,
                    data : response.data[0],
                    saldo : ""
                })
            });
        })
        .catch(err => {
            res.status(err.status).json({message:err.message})
        })
    }
}
exports.sendDataUser = (req, res)=>{
    const {token} = req.query
    jwt.verify(token, process.env.PRIVATE_KEY, function(err, decode){
        if(!err){
            const email = decode.email
            model.sendDataUser(email)
            .then(response=>{
                res.status(response.status).json({data : response.data})
            })
            .catch(err=>{
                res.status(err.status).json({message : err.message})
            })
        }else{
            console.log(err);
        }
    });
}
exports.updateProfil = (req, res) => {
    const { update, value, id_user, email, pass } = req.body
    if(update == undefined || value == undefined){
        res.status(400).json({ message : "beberapa field tidak terbaca" })
    }else if( update == "password" ){
        model.login(email, pass)
        .then(response => {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            model.updateProfil(update, hash, id_user)
            .then(response =>{
                res.status(response.status).json({ message : response.message, data : response.data })
            })
        })
        .catch(err => {
            res.status(err.status).json({ message : err.message })
        })
    }
    else{
        model.updateProfil(update, value, id_user)
        .then(response =>{
            res.status(response.status).json({ message : response.message, data : response.data })
        })
        .catch(err => {
            res.status(err.status).json({ message : err.message })
        })
    }
}
exports.changePin = (req, res) => {
    const { id_user, pin } = req.body
    if(id_user == undefined || pin == undefined){
        res.status(400).json({message:"beberapa field tidak terbaca"})
    }else{
        model.changePin(id_user, pin)
        .then(response => {
            res.status(response.status).json({message:response.message})
        })
        .catch(err => {
            res.status(err.status).json({message:err.message})
        })
    }
}
exports.cekPin = (req, res) => {
    const { id_user, pin } = req.body
    if(id_user == undefined || pin == undefined){
        res.status(400).json({message:"beberapa field tidak terbaca"})
    }else{
        model.cekPin(id_user, pin)
        .then(response => {
            res.status(response.status).json({message:response.message})
        })
        .catch(err => {
            res.status(err.status).json({message:err.message})
        })
    }
}
exports.updateImgProfil = (req, res, next) => {
    const {id_user} = req.body
    const image = `${process.env.DIR_IMG}/${req.file.filename}`;
    if(image == undefined){
        res.status(400).json({message:"beberapa field tidak terbaca"})
    }else{
        model.setImgProfil(image, id_user)
        .then(response => {
            res.status(response.status).json({message:response.message, data:response.data})
        })
        .catch(err => {
            res.status(err.status).json({message:err.message})
        })
    }
}