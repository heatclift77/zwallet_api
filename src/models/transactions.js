const connection = require("../config/db")
const transaction = {
    getTransLimit : (id_user, limit, page) =>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT id_transaction, username, img_profil, amount FROM transaction INNER JOIN user ON transaction.id_reciever=user.id_user WHERE transaction.id_user='${id_user}' LIMIT ${limit}`, (err, results) => {
                if(!err){
                    resolve({
                        data : results,
                        status : 200
                    })
                }else{
                    reject({
                        message : err,
                        status : 500
                    })
                }
            })
        })
    },
    getTrans : (id_user, limit, page) =>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT username, img_profil, amount FROM transaction INNER JOIN user ON transaction.id_reciever=user.id_user WHERE transaction.id_user='${id_user}' LIMIT ${limit} OFFSET ${page}`, (err, results) => {
                if(!err){
                    resolve({
                        data : results,
                        status : 200
                    })
                }else{
                    reject({
                        message : err,
                        status : 500
                    })
                }
            })
        })
    },
    getTrans : (id_transaction) =>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM transaction WHERE id_transaction='${id_transaction}'`, (err, results) => {
                if(!err){
                    resolve({
                        data : results[0],
                        status : 200
                    })
                }else{
                    reject({
                        message : err,
                        status : 500
                    })
                }
            })
        })
    },
    getTransTodayLimit : (id_user, limit, page) =>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT id_transaction, username, img_profil, amount FROM transaction INNER JOIN user ON transaction.id_reciever=user.id_user WHERE transaction.id_user='${id_user}' AND dayofweek(transaction.date) = dayofweek(now()) LIMIT ${limit} OFFSET ${page}`, (err, results) => {
                if(!err){
                    resolve({
                        data : results,
                        status : 200
                    })
                }else{
                    reject({
                        message : err,
                        status : 500
                    })
                }
            })
        })
    },
    getTransThisWeekLimit : (id_user, limit, page) =>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT id_transaction, username, img_profil, amount FROM transaction INNER JOIN user ON transaction.id_reciever=user.id_user WHERE transaction.id_user='${id_user}' AND transaction.date > date_sub(now(), interval 1 week) LIMIT ${limit} OFFSET ${page}`, (err, results) => {
                if(!err){
                    resolve({
                        data : results,
                        status : 200
                    })
                }else{
                    reject({
                        message : err,
                        status : 500
                    })
                }
            })
        })
    },
    getTransThisMonthLimit : (id_user, limit, page) =>{
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT id_transaction, username, img_profil, amount FROM transaction INNER JOIN user ON transaction.id_reciever=user.id_user WHERE transaction.id_user='${id_user}' AND transaction.date > date_sub(now(), interval 1 week) LIMIT ${limit} OFFSET ${page}`, (err, results) => {
                if(!err){
                    resolve({
                        data : results,
                        status : 200
                    })
                }else{
                    reject({
                        message : err,
                        status : 500
                    })
                }
            })
        })
    },
    insertTransaction : (id_trans, id_user, id_reciever, reciever, amount, notes) => {
        return new Promise((resolve, reject)=>{
            connection.query(`INSERT INTO transaction 
            (id_transaction, id_user, reciever, method, id_reciever, amount, notes)
            VALUES
            ('${id_trans}', '${id_user}', '${reciever}', 'transfer','${id_reciever}', '${amount}', '${notes}')
            `, (err, results) => {
                if(!err){
                    resolve({
                        message : "Transaction Success",
                        status : 200
                    })
                }else{
                    reject({
                        message : err,
                        status : 500
                    })
                }
            })
        })
    },
    setSaldoReciever : (id_reciever, amount) => {
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT saldo FROM wallet WHERE id_user='${id_reciever}'`, (err, results) => {
                if(!err){
                    if(results.length > 0){
                        const saldo = Number(results[0].saldo)  + Number(amount) 
                        connection.query(`UPDATE wallet SET saldo='${saldo}' WHERE id_user='${id_reciever}'`, (err, results)=>{
                            if(!err){
                                resolve({status:200})
                            }else{
                                reject({
                                    message : err,
                                    status : 500
                                })
                            }
                        })
                    }else{
                        reject({
                            message : "penerima tidak ditemukan",
                            status : 500
                        })
                    }
                }else{
                    reject({
                        message : err,
                        status : 500
                    })
                }
            })
        })
    },
    setSaldoSender : (id_user, amount)=> {
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT saldo FROM wallet WHERE id_user='${id_user}'`, (err, results) => {
                if(!err){
                    if(results.length > 0){
                        const saldo = results[0].saldo - amount 
                        connection.query(`UPDATE wallet SET saldo='${saldo}' WHERE id_user='${id_user}'`, (err, results)=>{
                            if(!err){
                                resolve({status:200})
                            }else{
                                reject({
                                    message : err,
                                    status : 500
                                })
                            }
                        })
                    }else{
                        reject({
                            message : "pengirim tidak ditemukan",
                            status : 500
                        })
                    }
                }else{
                    reject({
                        message : err,
                        status : 500
                    })
                }
            })
        })
    }
}
module.exports = transaction