const router = require("express").Router();

//Controllers
const { sendPhoneVerificationOtp } = require("../controllers/sendPhoneVerificationOtpController");
const { verifyPhoneVerificationOtp } = require("../controllers/verifyPhoneVerificationOtpController");
const { registerUser } = require("../controllers/registerUserController");
const { updateDeviceToken } = require("../controllers/updateDeviceTokenController");
const { updateProfile } = require("../controllers/updateProfileController");
const { sendConnectionRequest } = require("../controllers/sendConnectionRequestController");
const { blockUser } = require("../controllers/blockUserController");
const { deleteAccount } = require("../controllers/deleteAccountController");

//Middlewares
const { registeredPhoneNumberCheck } = require("../middlewares/registeredPhoneNumberCheck");
const { authKeyValidation } = require("../middlewares/authKeyValidationCheck");
 //const { validateUserRequestTo } = require("../middlewares/validateUserRequestTo");

//Routes
router.post("/send-phone-verification-otp", sendPhoneVerificationOtp);
router.post("/verify-phone-verification-otp", verifyPhoneVerificationOtp);
router.post("/register-user", registeredPhoneNumberCheck, registerUser );
router.post("/update-device-token", authKeyValidation, updateDeviceToken);
router.post("/update-profile", authKeyValidation, updateProfile );
router.post("/send-connection-request",authKeyValidation, sendConnectionRequest);
router.post("/block-user", authKeyValidation, blockUser);
router.post("/delete-account", authKeyValidation, deleteAccount);

module.exports = router;
