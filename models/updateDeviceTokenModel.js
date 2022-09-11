const dbConn = require("../configur/database");

// exports.getUserId = async (user_id)=>{
//     return new Promise((resolve,reject)=>{
//         dbConn.query(`select * from users where user_id=?`,
//         [
//             authKey
//         ],(err,result)=>{
//             if(err){
//                 reject(err);
//             }
//             resolve(result);
//         })
//     })
// }

exports.updateDeviceToken = async (body,id)=>{
    return new Promise((resolve,reject)=>{
        dbConn.query(`Replace into users_devices(user_id,device_type,device_token) 
        values(?,?,?)`,
        [
            id,
            body.device_type,
            body.device_token
        ],(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}