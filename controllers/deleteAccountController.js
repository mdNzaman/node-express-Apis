const { deleteAccount } = require("../models/deleteAccountModel");

exports.deleteAccount = async (req, res) => {
    try {
        // const body = req.body;
        // const block_to = body.blocked_to;
        const user_id = req.user_id;
        // var created_dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        await deleteAccount(user_id);
        return res.status(200).json({
            success: 1,
            message: "Account Deleted.",
        })


    } catch (error) {
        console.log("Server Error");
        console.log(error);
        res.status(500).json({
            success: 0,
            message: "Server Error",
            error: error
        })
    }
}