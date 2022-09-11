const dbConn = require("../configur/database");

exports.verifyPhoneVerificationOtp = async (body)=>{
    return new Promise((resolve, reject)=>{
        dbConn.query(`select * from user_phone_verification where phone_num=?`,
        [
            body.phone_num
        ],(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

exports.signedUpUser = async (body)=>{
    return new Promise((resolve,reject)=>{
        dbConn.query(`select * from users where phone_num=?`,
        [
            body.phone_num
        ],(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

exports.updateUserInfo = async (time_offset,user_id)=>{
    return new Promise((resolve, reject)=>{
        dbConn.query(`UPDATE users SET time_offset = ? WHERE user_id = ?`,
        [
            time_offset,
            user_id
        ],(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}
