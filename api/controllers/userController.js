const {
    googleSignInServiceFunc,
    signUpResendOtpServiceFunc,
    verifySignUpOtpServiceFunc,
    sendSignUpOtpServiceFunc,
    getAllUsersServiceFunc,
    getUserViaIdServiceFunc,
    updateUserServiceFunc,
    loginUserServiceFunc,
    deleteUserServiceFunc,
    deleteAllUsersServiceFunc,
    getAllFriendsViaUserIdServiceFunc,
    updateAccountSettingServiceFunc,
    updateTimelineSettingServiceFunc,
    deactivateAccountServiceFunc,
    deleteAccountServiceFunc,
    changeAccountSettingServiceFunc,
    blockUserServiceFunc
} = require('@services/userService');

exports.googleSignIn = async (req, res) => {
    console.log('req,,,,,,,,,,,,,,,,,,,,', req.body);
   try {
        return await googleSignInServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

exports.updateUser = async (req, res) => {
   try {
        return await updateUserServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

exports.signUpResendOtp = async (req, res) => {
    try {
        return await signUpResendOtpServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

exports.verifySignUpOtp = async (req, res) => {
    try {
        return await verifySignUpOtpServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

exports.sendSignUpOtp = async (req, res) => {
    try {
        return await sendSignUpOtpServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@private
//@usage : get all users from the db.
exports.getAllUsers = async (req, res) => {
    try {
        return await getAllUsersServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@private
//@usage : get single user detail via userId
exports.getUserViaId = async (req, res) => {
    try {
        console.log('gurminder', req.body);
        return await getUserViaIdServiceFunc(req, res);

    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@public
//@usage : login The user.
exports.loginUser = async (req, res) => {
    try {
        return await loginUserServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@private
//@usage : get single user and delete it via userId
exports.deleteUser = async (req, res) => {
    try {
        return await deleteUserServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@private
//@usage : get single user and delete it via userId
exports.deleteAllUsers = async (req, res) => {
    try {
        return await deleteAllUsersServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@private
//@usage : get all friends via User Id
exports.getAllFriendsViaUserId = async (req, res) => {
    try {
        return await getAllFriendsViaUserIdServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@private
//@usage : update Account Setting
exports.updateAccountSetting = async (req, res) => {
    try {
        return await updateAccountSettingServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@private
//@usage : update Timeline Setting
exports.updateTimelineSetting = async (req, res) => {
    try {
        return await updateTimelineSettingServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@private
//@usage : change Account Setting
exports.changeAccountSetting = async (req, res) => {
    try {
        return await changeAccountSettingServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@private
//@usage : block User
exports.blockUser = async (req, res) => {
    try {
        return await blockUserServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@usage : deactivate Account
exports.deactivateAccount = async (req, res) => {
    try {
        return await deactivateAccountServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}

//@usage : delete Account
exports.deleteAccount = async (req, res) => {
    try {
        return await deleteAccountServiceFunc(req, res);
    } catch(err) {
        return res.json({
            status: 500,
            success: false,
            message: err
        });
    }
}