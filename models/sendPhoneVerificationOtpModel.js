const dbConn = require("../configur/database");

exports.sendPhoneVerificationOtp = async (body, phoneOtp) => {
    return new Promise((resolve, reject) => {
        dbConn.query(`Replace into user_phone_verification(country_code,phone_num,phone_otp)
        values(?,?,?)`,
            [
                body.country_code,
                body.phone_num,
                phoneOtp
            ], (err, result, fileds) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
    })
}

exports.userUpdateDevice = async (data, userId, dateTime, created_datetime) => {
    return new Promise((resolve, reject) => {
        dbConn.query(`Replace into users_devices(user_id,device_type,device_token,created_datetime,updated_datetime)
            values(?,?,?,?,?)`,
            [
                userId,
                data.device_type,
                data.device_token,
                created_datetime,
                dateTime
            ], (err, result, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
    })
}

exports.InsertPhoneVerificationCode = async (body) => {
    return new Promise((resolve, reject) => {
        dbConn.query(`Replace into users_phone_verification(country_code,phone_num,phone_verification_code)
        values(?,?,?)`,
            [
                body.country_code,
                body.phone_no,
                body.phone_verification_code
            ], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
    })
}