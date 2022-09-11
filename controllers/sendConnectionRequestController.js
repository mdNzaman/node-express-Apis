const { sendConnectionRequest, checkIfRequestAlreadySent, getRequestByFullName, getRequestToDeviceToken, insertInNotification } = require("../models/sendConnectionRequestModel");
const sendPushNotifications = require("../middlewares/fcm");
const moment = require("moment");


exports.sendConnectionRequest = async (req, res) => {
    try {
        const req_to = req.body.request_to;
        const req_by = req.user_id;
        const place_id = req.body.place_id;
        console.log("req_to: "+ req_to);
        // var created_dateTime = moment.utc().format().replace("T"," ").replace("Z"," ");
        var created_datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var device_type = "";
        console.log("created_datetime: " + created_datetime);

        const checkIfReqExist = await checkIfRequestAlreadySent(place_id, req_to, req_by); 
        
        if (checkIfReqExist.length > 0) {
            return res.status(405).json({
                success: 0,
                message: "Request is already sent.",
            })
        }
        else {

            const name = await getRequestByFullName(req_by);
            console.log(name[0].full_name);
            const full_name = name[0].full_name;

            const title = "Flok22";
            const body = `${full_name} wants to connect with you.`;
            const type = 1;
            var notification_datetime = new Date().toISOString().
                replace(/T/, ' ').      
                replace(/\..+/, '');
            
                console.log("notification_datetime: " + notification_datetime);

            var payload = {
                // received_by : receiver_id,
                // send_by : sender_id,
                // message : message,
                // type : notification_type,
                // chat_id : chat_id,
                // last_message_id : message_id,
                // user_name : user_name,
                // user_profile_pic : user_profile_pic,
                // online_status : online_status,
                notification_datetime : notification_datetime,
                title : title,
                body : body,
                type : type
            }

            // var payload = {
            //     received_by : request_by,
            //     send_by : user_id,
            //     message : body,
            //     user_name : user_name,
            //     user_profile_pic : profile_pic,
            //     start_datetime: chat_id[0].start_datetime,
            //     title: title,
            //     body: body,
            //     chat_id: chat_id[0].chat_id,
            //     type: type
            // }

            // Android Device Token
            const androidDevceTokenDetails = await getRequestToDeviceToken(req_to, device_type = "A");

            console.log("check..1");
            if (androidDevceTokenDetails.length > 0) {
                const A_device_token = androidDevceTokenDetails.map((item, index) => {
                    const result = item.device_token;
                    return result;
                })
                console.log("android: " + A_device_token);
                // await sendPushNotifications.sendPushNotifications(A_device_token, title, body, device_type = "A", type);
                sendPushNotifications.sendPushNotifications(A_device_token, title, body, device_type = "A", type, payload);
            }

            // I-Phone Device Token
            const iPhoneDevceTokenDtails = await getRequestToDeviceToken(req_to, device_type = "I");

            if (iPhoneDevceTokenDtails.length > 0) {
                const i_phone_device_token = iPhoneDevceTokenDtails.map((item, index) => {
                    const result = item.device_token;
                    return result;
                })
                console.log("I-phone: " + i_phone_device_token);
                await sendPushNotifications.sendPushNotifications(i_phone_device_token, title, body, device_type = "I", type, payload);
            }

            // const insertInNotificationDetail = await insertInNotification(req_by,req_to,type);

            const result = await sendConnectionRequest(place_id, req_to, req_by, created_datetime);

            return res.status(200).json({
                success: 1,
                message: "Request sent successfully.",
                "notification-type": 1  //send
            })
        }
    } catch (error) {
        console.log("Database Error");
        console.log(error);
        res.status(500).json({
            success: 0,
            message: "Database Error",
            error: error
        })
    }
}