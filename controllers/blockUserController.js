const { blockUser } = require("../models/blockUserModel");

exports.blockUser = async (req, res) => {
    try {
        const body = req.body;
        const block_to = body.blocked_to;
        const block_by = req.user_id;
        // var created_dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        await blockUser(block_by, block_to);
        return res.status(200).json({
            success: 1,
            message: "User Blocked Successfully.",
        })


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