const { registerUser, registerDevice, getRegisteredUser } = require("../models/registerUserModel");
const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.registerUser = async (req, res) => {
    try {
        // const dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");
        var date_created = moment.utc().format().replace("T"," ").replace("Z"," ");  // can have formate inside it
        // const dateT = new Date();
        // var offset = dateT.getTimezoneOffset();
        // var offset = -offset/60;

        // console.log(dateTime);
        // console.log(dateT);
        console.log(date_created);

        const body = req.body;
        const phoneNumber = body.phone_num;
        const dob = body.dob;


        var date = dob.split("/");
        const yy = date[2];
        const mm = date[0];
        const dd = date[1]; 
        const DOB = yy+-+mm+-+dd;
        // console.log(yy+"/"+mm+"/"+dd);
        // console.log(DOB);
        
        const jwtToken = jwt.sign({ phoneNumber, DOB }, "key");

        const getSignUpInformation = await registerUser(body, jwtToken, DOB, date_created);

        console.log(getSignUpInformation);
        const userId = getSignUpInformation.insertId;

        const getSignUpDeviceInformation = await registerDevice(body, userId, date_created);
        console.log(getSignUpDeviceInformation);

        const results = await getRegisteredUser(userId);
            console.log(results);
            // let yy = results[0].dob.getFullYear();
            // let mm = results[0].dob.getMonth() + 1;
            // let dd = results[0].dob.getDate();
            // const DOB = `${mm}/${dd}/${yy}`;

            return res.status(200).json({
                success: 1,
                data: {
                    user_id: `${results[0].user_id}`,
                    full_name: `${results[0].full_name}`,
                    phone_num: `${results[0].phone_num}`,
                    country_code: `${results[0].country_code}`,
                    email_id: `${results[0].email_id}`,
                    dob: `${dob}`,
                    auth_Key: `${results[0].auth_key}`,
                    profile_pic: `${results[0].profile_pic}`,
                    gender: `${results[0].gender}`,
                    bio: `${results[0].bio}`,
                    is_blocked: `${results[0].is_blocked}`,
                    is_active: `${results[0].is_active}`,
                    is_email_verified:`${results[0].is_email_verified}`,
                    time_offset:`${results[0].time_offset}`,
                    is_private:`${results[0].is_private}`
                }
            })
    } catch (error) {
        console.log("Database Error");
        console.log(error);
        res.status(500).json({
            success: 0,
            message: "Database Error",
            error: error
        });
    }
};
