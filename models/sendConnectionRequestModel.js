const dbConn = require("../configur/database")

exports.sendConnectionRequest = async (place_id, req_to, req_by,created_dateTime)=>{
    return new Promise((resolve,reject)=>{
        dbConn.query(`insert into users_connection_request(place_id,request_to,request_by,created_datetime) values(?,?,?,?)`,
        [
            place_id,
            req_to,
            req_by,
            created_dateTime
        ],(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

exports.checkIfRequestAlreadySent = async (place_id, req_to, req_by)=>{
    return new Promise((resolve,reject)=>{
        dbConn.query(`SELECT * FROM users_connection_request WHERE place_id =? AND request_by = ? AND request_to = ?`,
        [
            place_id,
            req_by,
            req_to     
            
        ],(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}
exports.getRequestToDeviceToken = async (request_by_id, device_type) => {
    return new Promise((resolve, reject) => {
        dbConn.query(`SELECT device_token FROM users INNER JOIN users_devices ON users.user_id = users_devices.user_id WHERE users.user_id = ? AND device_type = ?`,
            [
                request_by_id,
                device_type
            ], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
    })
}

exports.getRequestByFullName = async (request_by) => {
    return new Promise((resolve, reject) => {
        dbConn.query(`SELECT full_name FROM users WHERE users.user_id = ?`,
            [
                request_by
            ], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
    })
}

exports.insertInNotification = async (user_id,request_to_id,type)=>{
    return new Promise((resolve,reject)=>{
        dbConn.query(`Insert into notification(received_by,send_by,notification_type) values(?,?,?)`,[
            request_to_id,
            user_id,
            type
        ],(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}