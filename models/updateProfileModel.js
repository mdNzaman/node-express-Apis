const dbConn = require("../configur/database");

exports.updateProfile = async (body, DOB, id)=>{
    return new Promise((resolve,reject)=>{
        dbConn.query(`update users set full_name=?,dob=?,profile_pic=?,gender=?,bio=? where user_id=?`,
        [
            body.full_name,
            DOB,
            body.profile_pic,
            body.gender,
            body.bio,
            id

        ],(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}