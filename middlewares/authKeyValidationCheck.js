const dbConn = require("../configur/database");

exports.authKeyValidation = (req, res, next) => {
    
    let token = req.get("auth_key");
    // token = token.slice(7);
    console.log(token);
    dbConn.query(`select * from users where auth_key=?`,
        [
            token
        ], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database Error locating auth key",
                    err: err
                });
            }
            // console.log("success");
            // console.log(result);
            // console.log("success");
            // console.log(result.length);
            if (result.length > 0) {
                console.log(result[0].user_id);
                req.user_id = result[0].user_id;
                next();
            } else {
                console.log("User Not Found");
                return res.status(404).json({
                    success: 0,
                    message: "Token Not Matched."
                })
            }
        }
    );
}