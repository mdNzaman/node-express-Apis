const dbConn = require("../configur/database"); 

exports.deleteAccount = async (user_id)=>{
    return new Promise((resolve,reject)=>{
        dbConn.query(`DELETE FROM users WHERE user_id = ?`,
        [
            user_id
        ],(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

