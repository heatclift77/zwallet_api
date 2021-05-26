const model = require("../models/transactions")
const {v4:uuidv4} = require("uuid");
exports.getTrans = (req, res) => {
    let {id_user, limit, sort, page} = req.query
    if(page === 1){
        page = 0
    }else{
        page = (page - 1) * limit 
    }
    limit = Number(limit)
    if(sort == "Sort" || sort == undefined){
        if(limit == undefined){
            model.getTrans(id_user, limit, page)
            .then(response => {
                res.status(response.status).json({data : response.data})
            })
            .catch(err=> {
                res.status(err.status).json({message : err.message})
            })
        }else{
            model.getTransLimit(id_user, limit, page)
            .then(response => {
                res.status(response.status).json({data : response.data})
            })
            .catch(err=> {
                res.status(err.status).json({message : err.message})
            })
        }
    }else{
        if(sort == "today"){
            model.getTransTodayLimit(id_user, limit, page)
            .then(response => {
                res.status(response.status).json({data : response.data})
            })
            .catch(err=> {
                res.status(err.status).json({message : err.message})
            })
        }else if(sort == "thisWeek"){
            model.getTransThisWeekLimit(id_user, limit, page)
            .then(response => {
                res.status(response.status).json({data : response.data})
            })
            .catch(err=> {
                res.status(err.status).json({message : err.message})
            })
        }else if(sort == "thisMonth"){
            model.getTransThisMonthLimit(id_user, limit, page)
            .then(response => {
                res.status(response.status).json({data : response.data})
            })
            .catch(err=> {
                res.status(err.status).json({message : err.message})
            })
        }else{
            res.status(400).json({message : "metode pengurutan tidak di dukung"})
        }
    }
}
exports.getDetailTrans = (req, res) => {
    const {id_transaction} = req.query
    model.getDetailTrans(id_transaction)
        .then(response => {
            res.status(response.status).json({data : response.data})
        })
        .catch(err=> {
            res.status(err.status).json({message : err.message})
        })
}
exports.setSaldoReciever = (req, res, next) => {
    const { id_reciever, amount } = req.body
    model.setSaldoReciever(id_reciever, amount)
    .then(response => {
        if(response.status == 200){
            next()
        }
    })
    .catch(err => {
        res.status(err.status).json({message : err.message})
    })
}
exports.setSaldoSender = (req, res, next)=> {
    const { id_user, amount } = req.body
    model.setSaldoSender(id_user, amount)
    .then(response => {
        if(response.status == 200){
            next()
        }
    })
    .catch(err => {
        res.status(err.status).json({message : err.message})
    })
}
exports.createTransaction = (req, res) => {
    const id_trans = uuidv4()
    const { id_user, id_reciever, reciever, amount, notes } = req.body
    if(id_user == undefined || id_reciever == undefined || reciever == undefined || amount == undefined || notes == undefined ){
        res.status(400).json({message : "beberapa field tidak terbaca"})
    }else{
        model.insertTransaction(id_trans, id_user, id_reciever, reciever, amount, notes)
        .then(response => {
            res.status(response.status).json({message : response.message})
        })
        .catch(err => {
            res.status(err.status).json({message : err.message})
        })
    }
}