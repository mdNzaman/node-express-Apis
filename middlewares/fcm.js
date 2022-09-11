const FCM = require("fcm-node");
// const FCM = require("fcm-notification");

// var fcm = new FCM('FIREBASE-KEY');
// var serverKey = 'SERVER_KEY';
var serverKey = 'SERVER_KEY';
var fcm = new FCM(serverKey);

exports.sendPushNotifications = (deviceTokens, title, body, deviceType, type, payload) => {
 //   return new Promise((resolve,reject)=>{
    // console.log("*****");
    console.log(payload);
        if (deviceType == "I") {
            var message = {
                // to: deviceTokens,
                registration_ids: deviceTokens,
                // notification: {
                //     title: title,
                //     body: body,
                //     type: type
                // }
                notification: payload
            };
        } else {
            console.log("..");
            var message = {
                // to : deviceTokens,
                registration_ids: deviceTokens,
                // collapse_key : '',
                // priority:'high',
                // sound: "default",
                // vibrate: 1,
                data: payload
            };
            console.log("..");
        } 
        fcm.send(message, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!");
                console.log(err);
                // console.log(err[46]);
                //reject(err);
            } else {
                console.log("push notification sent successfully.");
                console.log("Successfully sent with response: ", response);
                //resolve(response);
            }
        });
 //   })
    
}
