const { verifyPhoneVerificationOtp, signedUpUser, updateUserInfo } = require("../models/verifyPhoneVerificationOtpModel");

exports.verifyPhoneVerificationOtp = async (req, res) => {
    try {
        const body = req.body;
        const time_offset = body.time_offset;

        const userOtpInfo = await verifyPhoneVerificationOtp(body);
        console.log(userOtpInfo);

        if (userOtpInfo.length > 0 && userOtpInfo[0].phone_otp == body.otp) {
            console.log("OTP verified successfully!");

            const getSignedUpUserInfo = await signedUpUser(body);
            // console.log(getSignedUpUserInfo);


            if (getSignedUpUserInfo.length > 0) {

                const user_id = getSignedUpUserInfo[0].user_id;
                let year = getSignedUpUserInfo[0].dob.getFullYear();
                let mm = getSignedUpUserInfo[0].dob.getMonth() + 1;
                let dd = getSignedUpUserInfo[0].dob.getDate();
                const dob = `${mm}/${dd}/${year}`;

                const updatetimeoffset = await updateUserInfo(time_offset,user_id);

                return res.status(200).json({
                    success: 1,
                    // message: "OTP verified successfully!.",
                    data: {
                        user_id: `${getSignedUpUserInfo[0].user_id}`,
                        full_name: `${getSignedUpUserInfo[0].full_name}`,
                        phone_num: `${getSignedUpUserInfo[0].phone_num}`,
                        country_code:`${getSignedUpUserInfo[0].country_code}`,
                        email_id:`${getSignedUpUserInfo[0].email_id}`,
                        dob: `${dob}`,
                        auth_Key: `${getSignedUpUserInfo[0].auth_key}`,
                        profile_pic: `${getSignedUpUserInfo[0].profile_pic}`,
                        gender: `${getSignedUpUserInfo[0].gender}`,
                        bio: `${getSignedUpUserInfo[0].bio}`,
                        is_block: `${getSignedUpUserInfo[0].is_blocked}`,
                        is_active: `${getSignedUpUserInfo[0].is_active}`,
                        is_email_verified:`${getSignedUpUserInfo[0].is_email_verified}`,
                        time_offset:`${getSignedUpUserInfo[0].time_offset}`,
                        is_private:`${getSignedUpUserInfo[0].is_private}`
                    }
                })
            } else {
                return res.status(201).json({
                    // phone_num: `${userOtpInfo[0].phone_num}`,
                    // otp: `${userOtpInfo[0].phone_otp}`
                    message:"Success"
                })
            }
        }
        else {
            console.log("invalid otp");
            return res.status(400).json({
                success: 0,
                message: "invalid OTP"
            })
        }

    } catch (err) {
        console.log("Database error");
        res.status(500).json({
            success: 0,
            message: "Sorry, Database Error",
            error: err
        });
    }
}