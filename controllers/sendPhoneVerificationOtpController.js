const { sendPhoneVerificationOtp, userUpdateDevice, InsertPhoneVerificationCode } = require("../models/sendPhoneVerificationOtpModel");

exports.sendPhoneVerificationOtp = async (req, res) => {
    try {
        const body = req.body;

        function generateOTP() {

            var digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < 4; i++ ) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            return OTP;
        }
        const phoneOtp = generateOTP();
        console.log(phoneOtp);
        // const phoneNumber = body.phone_no;
        // const dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

        const result = await sendPhoneVerificationOtp(body, phoneOtp);
        // console.log(signInInformation.length,"....");
        // console.log(signInInformation[0].phone_num);  // error 

        // if (signInInformation.length > 0 && signInInformation[0].phone_num == phoneNumber) {
        //     // console.log(signInInformation);
        //     const userId = signInInformation[0].user_id;
        //     const created_datetime = signInInformation[0].created_datetime;
        //     let year = signInInformation[0].dob.getFullYear();
        //     let mm = signInInformation[0].dob.getMonth() + 1;
        //     let dd = signInInformation[0].dob.getDate();
        //     const dob = `${mm}-${dd}-${year}`;

            // const updateDeviceInformation = await userUpdateDevice(body, userId, dateTime, created_datetime);
            // console.log("Device updated successfully");
            return res.status(200).json({
                status: 1,
                message: "OTP Sent Successfully!!.",
                // result: result, 
                OTP: {
                    OTP:`${phoneOtp}`
                    // user_id: `${signInInformation[0].user_id}`,
                    // full_name: `${signInInformation[0].full_name}`,
                    // phone_no: `${signInInformation[0].phone_no}`,
                    // dob: `${dob}`,
                    // auth_Key: `${signInInformation[0].auth_key}`,
                    // profile_pic: `${signInInformation[0].profile_pic}`,
                    // gender: `${signInInformation[0].gender}`,
                    // bio: `${signInInformation[0].bio}`,
                    // is_block: `${signInInformation[0].is_block}`,
                    // is_active: `${signInInformation[0].is_active}`,
                }
            })
        // } else {
        //     // 201 Created success status response code indicates that the request has succeeded 
        //     // and has led to the creation of a resource.
        //     console.log("Number not found");
        //     const phoneVerificationCode = await InsertPhoneVerificationCode(body);
        //     return res.status(201).json({
        //         // status: 0,
        //         // message: "Number not registered",
        //         data:[{
        //             phone_verification_code:`${body.phone_verification_code}`
        //         }]
        //     });
        // }
    } catch (err) {
        console.log("Sorry, Database Error");
        res.status(500).json({
            success: 0,
            message: "Sorry, Database Error",
            error: err
        });
    }
}