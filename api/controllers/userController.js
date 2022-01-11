const {
  signUpServiceFunc,
  getAllUsersServiceFunc,
  getUserViaIdServiceFunc,
  updateUserServiceFunc,
  signInServiceFunc
} = require('@services/userService')

exports.getAllUsers = async (req, res) => {
  console.log('req,,,,,,,,,,,,,,,,,,,,', req.body)
  try {
    return await getAllUsersServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}

exports.getUserViaId = async (req, res) => {
  try {
    return await getUserViaIdServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}

exports.signUp = async (req, res) => {
  try {
    return await signUpServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}

exports.signIn = async (req, res) => {
  try {
    return await signInServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    return await updateUserServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}
