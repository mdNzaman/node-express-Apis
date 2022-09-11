const dbConn = require("../configur/database");

exports.registeredPhoneNumberCheck = (req, res, next) => {
    try {
        const body = req.body;
        const phoneNumber = body.phone_num;
        dbConn.query(`select * from users where phone_num=?`,
            [
                phoneNumber
            ],
            (err, result) => {
                if (err) {
                    // console.log("Database Error locating phoneNumber");
                    return res.status(500).json({
                        success:0,
                        message:"Database error locating phone number",
                        err:err
                    });
                }
                console.log(result.length);
                if (result.length > 0) {
                    console.log("User Already Registered");
                    return res.status(409).json({
                        success:0,
                        message:"User Already Registered."
                    })
                }else{
                    next();
                }
            }
        );
    } catch (err) {
        res.status(500).json({
            success: 0,
            err: err,
        });
    }
};
