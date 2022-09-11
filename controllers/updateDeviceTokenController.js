const { getUserId, updateDeviceToken } = require("../models/updateDeviceTokenModel");

exports.updateDeviceToken = async (req,res)=>{
    try{
        const body = req.body;
        // const authKey = body.auth_key;
        const user_id = req.user_id;

        // const userId = await getUserId(user_id);
        // console.log(userId);
        // const id = userId[0].user_id;
        // console.log(id);

        const getDeviceToken = await updateDeviceToken(body, user_id);

        return res.status(200).json({
            success:1,
            message:"Device Token Updated Successfully!."
        })

    }catch(err){
        console.log("Sorry, Database Error");
        res.status(500).json({
            success: 0,
            message: "Sorry, Database Error",
            error: err
        });
    }
}
