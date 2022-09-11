const dbConn = require("../configur/database"); 

exports.blockUser = async (block_by,block_to)=>{
    return new Promise((resolve,reject)=>{
        dbConn.query(`Insert into blocked_users(blocked_by,blocked_to) values(?,?)`,
        [
            block_by,
            block_to
        ],(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

