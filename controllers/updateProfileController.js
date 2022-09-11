const { updateProfile } = require("../models/updateProfileModel");

exports.updateProfile = async (req,res)=>{
    try{
        const body = req.body;
        const phoneNum = body.phone_num;
        const dob = body.dob;
        const id = req.user_id;

        var date = dob.split("/");
        const yy = date[2];
        const mm = date[0];
        const dd = date[1]; 
        const DOB = yy+-+mm+-+dd;

        // const authKey = jwt.sign({ phoneNum,DOB }, "key");
        // let token = req.get("auth_key");
        // // token = token.slice(7);
        // console.log(token);
        
        const getUpdatedInfo = await updateProfile(body, DOB, id);
        // console.log(getUpdatedInfo);

        console.log("profile updated successfully!.");

        return res.status(200).json({
            success:1,
            message:"Profile Updated Successfully!.",
        })

    }catch(err){
        console.log("database error");
        res.status(500).json({
            success: 0,
            message: "Sorry, Database Error",
            error: err
        });
    }
}
