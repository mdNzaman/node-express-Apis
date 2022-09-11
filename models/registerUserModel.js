const dbConn = require("../configur/database");

exports.registerUser = async (body, jwtToken, dob, dateTime) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `insert into users(full_name,phone_num,country_code,email_id,auth_key,dob,profile_pic,gender,bio,created_datetime,time_offset)values(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                body.full_name,
                body.phone_num,
                body.country_code,
                body.email_id,
                jwtToken,
                dob,
                body.profile_pic,
                body.gender,
                body.bio,
                dateTime,
                body.time_offset
            ],
            (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            }
        );
    });
};

exports.registerDevice = async (
    body,
    userId,
    dateTime
) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            `replace into users_devices(user_id,device_type,device_token,created_datetime)
    values(?,?,?,?)`,
            [
                userId, body.device_type, body.device_token, dateTime
            ],
            (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            }
        );
    });
};

exports.getRegisteredUser = async (userId) => {
    return new Promise((resolve, reject)=>{
        dbConn.query(
            `select * from users join users_devices on users.user_id = users_devices.user_id where users.user_id=?`,
            [
                userId
            ],(err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            }
        );
    })
};
