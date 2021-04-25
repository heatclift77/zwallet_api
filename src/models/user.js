const connection = require("../config/db")
const bcrypt = require("bcryptjs");
const user = {
    insertUser : () => {
    },
    getSaldo : (email) => {
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT saldo FROM wallet where email='${email}'`, (err, results)=>{
                if(!err){
                    resolve({
                        data : results[0]
                    })
                }else{
                    reject({
                        err : err
                    })
                }
            })
        })
    },
    search : (key, id_user) => {
        if(key == undefined){
            return new Promise((resolve, reject)=>{
                connection.query(`SELECT * FROM user LIMIT 4`, (err, results)=>{
                    if(!err){
                        resolve({
                            data : results,
                            status : 200
                        })
                    }else{
                        reject({
                            message : err.message,
                            status : 500
                        })
                    }
                })
            })
        }else{
            return new Promise((resolve, reject)=>{
                connection.query(`SELECT * FROM user WHERE username LIKE '%${key}%' AND id_user !='${id_user}' LIMIT 4`, (err, results)=>{
                    if(!err){
                        resolve({
                            data : results,
                            status : 200
                        })
                    }else{
                        reject({
                            message : err.message,
                            status : 500
                        })
                    }
                })
            })
        }
    },
    register : (id_wallet, id_user, hash, email, pin, username, img_profil_default) => {
        return new Promise((resolve, reject)=>{
            connection.query(`INSERT INTO user 
            (id_user, firstName, lastName, email, password, phoneNumber, id_wallet, img_profil, username, verified) 
            VALUES 
            ('${id_user}', '-', '-', '${email}', '${hash}', '-', '${id_wallet}', '${img_profil_default}', '${username}', '0')`, (err, results)=>{
                if(!err){
                    connection.query(`INSERT INTO wallet 
                    (id_wallet, id_user, saldo, pin, email) 
                    VALUES
                    ('${id_wallet}', '${id_user}', '0', '${pin}'), '${email}'`, (err, results)=>{
                        if(!err){
                            resolve({
                                message : "Register Berhasil",
                                status : 200
                            })
                        }else{
                            reject({
                                message : err.message,
                                status : 500
                            })
                        }
                    })
                }else{
                    reject({
                        message : err.message,
                        status : 500
                    })
                }
            })
        })
    },
    cekAcount : (username, email) => {
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM user WHERE username='${username}'`, (err, results)=>{
                if(!err){
                    if(results.length == 0){
                        connection.query(`SELECT * FROM user WHERE email='${email}'`, (err, results)=>{
                            if(!err){
                                if(results.length == 0){
                                    resolve({
                                        message : "Nama dan Email Belum digunakan",
                                        status : 200
                                    })
                                }else{
                                    reject({
                                        message : "email sudah terdaftar",
                                        status : 400
                                    })
                                }
                            }else{
                                reject({
                                    message : err.message,
                                    status : 500
                                })
                            }
                        })
                    }else{
                        reject({
                            message : "username sudah digunakan",
                            status : 400
                        })
                    }
                }else{
                    reject({
                        message : err.message,
                        status : 500
                    })
                }
            })
        })
    },
    verifyAcount : (email) => {
        return new Promise((resolve, reject)=>{
            connection.query(`UPDATE user SET verified='1' WHERE email='${email}'`, (err, results)=>{
                if(!err){
                    resolve({
                        message : "acount verified",
                        status : 200
                    })
                }else{
                    reject({
                        message : err.message,
                        status : 500
                    })
                }
            })
        })
    },
    login : (email, pass) => {
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM user WHERE email='${email}'`,(err, results)=>{
                if(!err){
                    if(results.length !== 0){
                        if(results[0].verified == 1){
                            const passwordMatch = bcrypt.compareSync(pass, results[0].password);
                            if(passwordMatch){
                                resolve({
                                    message : "login sukses",
                                    data : results,
                                    status : 200
                                })
                            }else{
                                reject({
                                    message : "Password salah",
                                    status : 400
                                })
                            }
                        }else{
                            reject({
                                message : "email belum terverifikasi",
                                status : 400
                            })
                        }
                    }else{
                        reject({
                            message : "email belum terdaftar",
                            status : 400
                        })
                    }
                }else{
                    reject({
                        message : err.message,
                        status : 500
                    })
                }
            })
        })
    },
    sendDataUser : (email) => {
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM user WHERE email='${email}'`, (err, results)=>{
                if(!err){
                    resolve({
                        status : 200,
                        data : results[0]
                    })
                }else{
                    reject({
                        message : err.message,
                        status : 500
                    })
                }
            })
        })
    },
    updateProfil : (update, value, id_user) => {
        return new Promise((resolve, reject)=>{
            connection.query(`UPDATE user SET ${update}='${value}' WHERE id_user='${id_user}'`, (err, results)=>{
                if(!err){
                    connection.query(`SELECT * FROM user WHERE id_user='${id_user}'`, (err, results)=>{
                        if(!err){
                            resolve({
                                status : 200,
                                message : "update berhasil",
                                data : results[0]
                            })
                        }else{
                            reject({
                                message : err.message,
                                status : 500
                            })
                        }
                    })
                }else{
                    reject({
                        message : err.message,
                        status : 500
                    })
                }
            })
        })
    },
    changePin : (id_user, pin) => {
        return new Promise((resolve, reject)=>{
            connection.query(`UPDATE wallet SET pin='${pin}' WHERE id_user='${id_user}'`, (err, results)=>{
                if(!err){
                    resolve({
                        status : 200,
                        message : "update berhasil",
                    })
                }else{
                    reject({
                        message : err.message,
                        status : 500
                    })
                }
            })
        })
    },
    cekPin : (id_user, pin) => {
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM wallet WHERE id_user='${id_user}' AND pin='${pin}'`, (err, results)=>{
                if(!err){
                    if(results.length > 0){
                        resolve({
                            status : 200,
                            message : "pin terkonfirmasi",
                        })
                    }else{
                        reject({
                            message : "pin yang anda masukkan salah",
                            status : 500
                        })
                    }
                }else{
                    reject({
                        message : err.message,
                        status : 500
                    })
                }
            })
        })
    },
    setImgProfil : (image, id_user) => {
        return new Promise((resolve, reject)=>{
            connection.query(`UPDATE user SET img_profil='${image}' WHERE id_user='${id_user}'`, (err, results)=>{
                if(!err){
                    connection.query(`SELECT * FROM user WHERE id_user='${id_user}'`, (err, results)=>{
                        if(!err){
                            resolve({
                                status : 200,
                                message : "Update Profil Berhasil",
                                data : results[0]
                            })
                        }else{
                            reject({
                                message : err.message,
                                status : 500
                            })
                        }
                    })
                }else{
                    reject({
                        message : err.message,
                        status : 500
                    })
                }
            })
        })
    }
}

module.exports = user