const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const messages = require("@constants/messages");
const User = require("@models/userModel");
const signUpValidator = require("@validations/authRequest/signUpValidator");
const myAccountValidator = require("@validations/myAccountRequest/myAccountValidator");
const deleteAccountValidator = require("@validations/deactivateDeleteAccountRequest/deleteAccountValidator");
const deactivateAccountValidator = require("@validations/deactivateDeleteAccountRequest/deactivateAccountValidator");
const updateAccountSettingValidator = require("@validations/accountSettingRequest/updateAccountSettingValidator");
const updateTimelineSettingValidator = require("@validations/timeLineSettingRequest/updateTimelineSettingValidator");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const { GOOGLE } = require("@constants/keys");

//google signin
const googleSignInServiceFunc = async (req, res) => {
	const CLIENT_ID = GOOGLE.CLIENT_ID;
	//expected token and CLIENT_ID, client id should be store locally here in node js.
	const client = new OAuth2Client(CLIENT_ID);
	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: req.body.idToken,
			audience: CLIENT_ID,
		});
		const payload = ticket.getPayload();
		//  console.log('payload//////////////', payload);
		
		User.findOne({ email: payload.email }).then((outerResult) => {
			if (!outerResult) {
				bcrypt.hash("password123123", 10, (err, hash) => {
					if (err) {
						res.json({
							status: 500,
							success: false,
							message: err,
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							firstName: payload.given_name,
							lastName: payload.family_name,
							dob: null,
							userName: payload.email ? payload.email.split("@")[0] : "",
							accountType: "general",
							email: payload.email,
							role: "CUSTOMER",
							uniqueId: Math.random(),
							password: hash,
							provider: "googleSignIn",
							isVerified: payload.email_verified,
						});
						user.save().then((userResult) => {
							if (userResult) {
								const token = jwt.sign(
									{
										email: user.email,
										userId: user._id,
									},
									process.env.JWT_KEY,
									{
										expiresIn: "11h",
									}
									);
									res.json({
										status: 200,
										success: true,
										verified: payload.email_verified,
										message: messages.SUCCESS.AUTH.LOGGEDIN,
										token: token,
										data: {
											id: user._id,
											firstName: user.firstName,
											lastName: user.lastName,
											email: user.email,
											mobileNo: user.mobileNo,
											userName: user.userName,
											dob: user.dob,
											role: user.role,
											accountType: user.accountType,
										},
									});
								}
							});
						}
					});
				} else {
					const token = jwt.sign(
						{
							email: outerResult.email,
							userId: outerResult._id,
						},
						process.env.JWT_KEY,
						{
							expiresIn: "11h",
						}
						);
						res.json({
							status: 200,
							success: true,
							verified: outerResult.isVerified,
							message: messages.SUCCESS.AUTH.LOGGEDIN,
							token: token,
							data: {
								id: outerResult._id,
								firstName: outerResult.firstName,
								lastName: outerResult.lastName,
								email: outerResult.email,
								mobileNo: outerResult.mobileNo,
								userName: outerResult.userName,
								dob: outerResult.dob,
								role: outerResult.role,
								accountType: outerResult.accountType,
							},
						});
					}
				});
			}
			verify().catch((err) => {
				res.json({
					status: 500,
					success: false,
					message: err,
				});
			});
		};
		
		//done
const verifySignUpOtpServiceFunc = async (req, res) => {
	const filter = {
		mobileNo: req.body.mobileNo,
	};
	const data = {
		isVerified: true,
	};
	User.findOne(filter)
	.then((user) => {
		if (user.otp == req.body.otp) {
			User.findOneAndUpdate(
				filter,
				{ $set: data },
				{
					Original: false,
					useFindAndModify: false,
			}).then((result) => {
				res.json({
					status: 201,
					success: true,
					login: true,
					message: "OTP verified Successfully, You may login now",
				});
			});
		} else {
			res.json({
				status: 401,
				success: false,
				message: "OTP MisMatch retry or resend OTP.",
			});
		}
	})
	.catch((err) => {
		res.json({
			status: 500,
			success: false,
			message: "err",
		});
	});
};
			
			//done
			const getAllUsersServiceFunc = async (req, res) => {
				User.find()
				.select("-deletedAt")
				.exec()
				.then((docs) => {
					res.json({
						status: 200,
						count: docs.length,
						users: docs.map((doc) => {
							return {
								_id: doc && doc._id,
								firstName: doc && doc.firstName,
								lastName: doc && doc.lastName,
								dob: doc && doc.dob,
								userName: doc && doc.userName,
								mobileNo: doc && doc.mobileNo,
								role: doc && doc.role,
								isVerified: doc && doc.isVerified,
								accountType: doc && doc.accountType,
								email: doc && doc.email,
								uniqueId: doc && doc.uniqueId,
								countryCode: doc.countryCode,
								status: doc && doc.status,
								isActive: doc && doc.isActive,
								createdAt: doc && doc.createdAt,
								updatedAt: doc && doc.updatedAt,
							};
						}),
					});
				})
				.catch((err) => {
					res.json({
						status: 500,
						success: false,
						message: err,
					});
				});
			};
			
			//done
			const updateUserServiceFunc = async (req, res) => {
				const filter = {
					_id: req.body.userId,
				};
				let profileFields = {};
				
				if (req.body.firstName) {
					profileFields.firstName = req.body.firstName;
				}
				if (req.body.lastName) {
					profileFields.lastName = req.body.lastName;
				}
				if (req.body.about) {
					profileFields.about = req.body.about;
				}
				if (req.body.profession) {
					profileFields.profession = req.body.profession;
				}
				if (req.body.location) {
					profileFields.location = req.body.location;
				}
				if (req.body.organisation) {
					profileFields.organisation = req.body.organisation;
				}
				if (req.body.memberof) {
					profileFields.memberof = req.body.memberof;
				}
				if (req.body.visited) {
					profileFields.visited = req.body.visited;
				}
				if (req.body.workedAt) {
					profileFields.workedAt = req.body.workedAt;
				}
				if (req.body.workingFor) {
					profileFields.workingFor = req.body.workingFor;
				}
				if (req.body.campaign) {
					profileFields.campaign = req.body.campaign;
				}
				if (req.body.visited) {
					profileFields.visited = req.body.visited;
				}
				if (req.body.from) {
					profileFields.from = req.body.from;
				}
				if (req.body.alternateContactNo) {
					profileFields.alternateContactNo = req.body.alternateContactNo;
				}
				if (req.body.link) {
					profileFields.link = req.body.link;
				}
				if (req.body.alternateEmail) {
					profileFields.alternateEmail = req.body.alternateEmail;
				}
				if (req.body.site) {
					profileFields.site = req.body.site;
				}
				if (req.files.coverPic) {
					profileFields.coverPic = req.files.coverPic[0].location;
				}
				if (req.files.profilePic) {
					profileFields.profilePic = req.files.profilePic[0].location;
				}
				if (req.body.countryCode) {
					profileFields.countryCode = req.body.countryCode;
				}
				if (req.body.gender) {
					profileFields.gender = req.body.gender;
				}
				if (req.body.company) {
					profileFields.company = req.body.company;
				}
				if (req.body.status) {
					profileFields.status = req.body.status;
				}
				
				User.findOneAndUpdate(
					filter,
					{ $set: profileFields },
					{
						Original: false,
						useFindAndModify: false,
					}
					)
					.then((result) => {
						if (result) {
							res.json({
								success: true,
								message: messages.SUCCESS.USER.UPDATED,
								data: {
									_id: result._id,
									firstName: result.firstName,
									lastName: result.lastName,
									profession: result.profession,
									location: result.location,
									workedAt: result.workedAt,
									dob: result.dob,
									mobileNo: result.mobileNo,
									email: result.email,
									userName: result.userName,
									accountType: result.accountType,
									uniqueId: result.uniqueId,
									createdAt: result.createdAt,
									updatedAt: result.updatedAt,
									countryCode: result.countryCode,
									status: result.status,
									coverPic: result.coverPic,
									profilePic: result.profilePic,
									isActive: result.isActive,
									createdAt: result.createdAt,
									updatedAt: result.updatedAt,
								},
							});
						} else {
							res.json({
								status: 401,
								success: false,
								message: messages.FAILURE.USER_NOT_FOUND,
							});
						}
					})
					.catch((err) => {
						res.json({
							status: 500,
							success: false,
							message: "err",
						});
					});
				};
				
				//done
				const getUserViaIdServiceFunc = async (req, res) => {
					const { errors, isValid } = myAccountValidator(req.body);
					if (!isValid) {
						res.json({
							status: 400,
							success: false,
							message: errors,
						});
					}
					const filter = {
						_id: req.body.userId,
					};
					User.findOne(filter)
					.select("-deletedAt")
					.exec()
					.then((user) => {
						res.json({
							success: true,
							message: messages.SUCCESS.USER.FETCHED,
							data: {
								_id: user._id,
								firstName: user.firstName,
								lastName: user.lastName,
								profession: user.profession,
								location: user.location,
								workedAt: user.workedAt,
								dob: user.dob,
								mobileNo: user.mobileNo,
								email: user.email,
								userName: user.userName,
								accountType: user.accountType,
								uniqueId: user.uniqueId,
								createdAt: user.createdAt,
								updatedAt: user.updatedAt,
								countryCode: user.countryCode,
								status: user.status,
								coverPic: user.coverPic,
								profilePic: user.profilePic,
								isActive: user.isActive,
								createdAt: user.createdAt,
								updatedAt: user.updatedAt,
							},
						});
					})
					.catch((err) => {
						res.json({
							status: 500,
							success: false,
							message: "err",
						});
					});
				};
				
				//to check
				const signUpResendOtpServiceFunc = async (req, res) => {
					User.findOne({ mobileNo: req.body.mobileNo })
					.then((user) => {
						if (!user) {
							res.json({
								status: 404,
								success: false,
								message: messages.FAILURE.AUTH_FAILED,
							});
						} else {
							const otp = generateOtp();
							let url =
							`http://mobicomm.dove-sms.com//submitsms.jsp?user=AdearnS&key=cc7f853017XX&mobile=` +
							req.body.mobileNo +
							`&message=` +
							otp +
							` is your Skybook sign-up code and is valid for 10 minutes. Please do not share the OTP with anyone.
							Regards
							Skybook Team
							Adearn Services P Ltd &senderid=SMSKYB&accusage=1&entityid=1201160083792850070&tempid=1207161942439108230`;
							axios({
								method: "get",
								url,
							}).then(function (response) {
								var split = response.data.split(",");
								
								// fail,InvalidMobileNumber,0,0,99193598303
								//sent,success,369684585,877626265,+919919359830
								if (response && split[0] == "\r\nsent") {
									const filter = { mobileNo: req.body.mobileNo };
									const update = { otp: otp };
									User.findOneAndUpdate(
										filter,
										{ $set: update },
										{ new: false },
										(err, doc) => {
											if (err) {
												res.json({
													status: 501,
													success: false,
													message: messages.FAILURE.SWW,
												});
											}
										}
										).then((result) => {
											res.json({
												status: 200,
												success: true,
												message: "OTP sent to mobile no. : +91" + user.mobileNo,
											});
										});
									} else {
										if (split[1] == "InvalidMobileNumber") {
											res.json({
												status: 501,
												success: false,
												message: "Invalid Mobile No.",
											});
										}
										res.json({
											status: 501,
											success: false,
											message: "Something went wrong! Resend OTP",
										});
									}
								});
							}
						})
						.catch((err) => {
							res.json({
								status: 500,
								success: false,
								message: err,
							});
						});
					};
					
					//done-===sign up starts here
					const sendSignUpOtpServiceFunc = async (req, res) => {
						// Check Validation
						const { errors, isValid } = signUpValidator(req.body);
						if (!isValid) {
							// Return any errors with 400 status
							
							res.json({
								status: 400,
								success: false,
								message: errors,
							});
						}
						User.find({
							email: req.body.email,
						})
						.exec()
						.then((user) => {
							if (user.length >= 1) {
								return res.json({
									status: 409,
									success: false,
									message: messages.FAILURE.EMAIL_ALREADY_TAKEN,
								});
							} else {
								User.find({
									userName: req.body.userName,
								})
								.exec()
								.then((checkUserName) => {
									if (checkUserName.length >= 1) {
										return res.json({
											status: 409,
											success: false,
											message: messages.FAILURE.USERNAME_ALREADY_TAKEN,
										});
									} else {
										User.find({
											mobileNo: req.body.mobileNo,
										})
										.exec()
										.then((checkMobileNo) => {
											if (checkMobileNo.length >= 1) {
												return res.json({
													status: 409,
													message: messages.FAILURE.MOBILE_ALREADY_TAKEN,
													success: false,
												});
											} else {
												bcrypt.hash(req.body.password, 10, (err, hash) => {
													if (err) {
														res.json({
															status: 500,
															success: false,
															message: err,
														});
													} else {
														// code here, do not change the alignment as it creates trouble sending the sms.
														const otp = generateOtp();
														let url =
														`http://mobicomm.dove-sms.com//submitsms.jsp?user=AdearnS&key=cc7f853017XX&mobile=+91` +
														req.body.mobileNo +
														`&message=` +
														otp +
														` is your Skybook OTP. Valid for 10 minutes. Please do not share it with anyone.
														Regards,
														Skybook Team&senderid=SMSKYB&accusage=1&entityid=1201160083792850070&tempid=1207163108578509343`;
														axios({
															method: "get",
															url,
														})
														.then(function (response) {
															var split = response.data.split(",");
															console.log("response", response);
															// fail,InvalidMobileNumber,0,0,99193598303
															//sent,success,369684585,877626265,+919919359830
															if (response && split[0] == "\r\nsent") {
																const uniqueId = Math.random();
																const user = new User({
																	_id: new mongoose.Types.ObjectId(),
																	firstName: req.body.firstName,
																	lastName: req.body.lastName,
																	dob: req.body.dob,
																	userName: req.body.userName,
																	mobileNo: req.body.mobileNo,
																	accountType: req.body.accountType,
																	email: req.body.email,
																	role: req.body.role,
																	uniqueId: uniqueId,
																	provider: "mobileSignUp",
																	password: hash,
																	otp: otp,
																});
																user.save();
																// user.save().then((result) => {
																//   if (result) {
																//     res.json({
																//       status: 200,
																//       success: true,
																//       message: messages.SUCCESS.USER.CREATED,
																//     });
																//   }
																// });
																return res.json({
																	status: 200,
																	success: true,
																	mobileNo: user.mobileNo,
																	message:
																	"OTP sent to mobile no. : +91" +
																	user.mobileNo,
																});
															} else {
																if (
																	split[1] &&
																	split[1] == "InvalidMobileNumber"
																	) {
																		res.json({
																			status: 501,
																			success: false,
																			message: "Invalid Mobile No.",
																		});
																	}
																	res.json({
																		status: 501,
																		success: false,
																		message: "Something went wrong! Resend OTP",
																	});
																}
															})
															.catch((err) => {
																console.log("err", err);
																res.json({
																	status: 500,
																	success: false,
																	message: err,
																});
															});
														}
													});
												}
											});
										}
									});
								}
							});
						};
						
						// private function to generate Random OTP
						function generateOtp() {
							var string = "123456789";
							let OTP = "";
							var len = string.length;
							for (let i = 0; i < 6; i++) {
								OTP += string[Math.floor(Math.random() * len)];
							}
							return OTP;
						}
						
						//done
						const loginUserServiceFunc = async (req, res) => {
							let regexp = /^[1-9]\d*$/; // if it is all numberic then login via mobile
							if (new RegExp(regexp, "g").test(req.body.email)) {
								User.findOne({
									mobileNo: req.body.email,
									isDeleted: false,
								})
								.exec()
								.then((user) => {
									if (!user) {
										res.json({
											status: 401,
											success: false,
											message: messages.FAILURE.AUTH_FAILED,
										});
									} else if (user.isVerified === false) {
										const otp = generateOtp();
										let url =
										`http://mobicomm.dove-sms.com//submitsms.jsp?user=AdearnS&key=cc7f853017XX&mobile=` +
										req.body.email +
										`&message=` +
										otp +
										` is your Skybook sign-up code and is valid for 10 minutes. Please do not share the OTP with anyone.
										Regards
										Skybook Team
										Adearn Services P Ltd &senderid=SMSKYB&accusage=1&entityid=1201160083792850070&tempid=1207161942439108230`;
										axios({
											method: "get",
											url,
										}).then(function (response) {
											var split = response.data.split(",");
											
											// fail,InvalidMobileNumber,0,0,99193598303
											//sent,success,369684585,877626265,+919919359830
											if (response && split[0] == "\r\nsent") {
												const filter = { mobileNo: req.body.email };
												const update = { otp: otp };
												User.findOneAndUpdate(
													filter,
													{ $set: update },
													{ new: false },
													(err, doc) => {
														if (err) {
															res.json({
																status: 501,
																success: false,
																message: messages.FAILURE.SWW,
															});
														}
													}
													).then((result) => {
														res.json({
															status: 200,
															success: true,
															message: "OTP sent to mobile no. : +91" + user.mobileNo,
														});
													});
												} else {
													// console.log('split/////////////', split);
													if (split[1] == "InvalidMobileNumber") {
														res.json({
															status: 501,
															success: false,
															message: "Invalid Mobile No.",
														});
													}
													res.json({
														status: 501,
														success: false,
														message: "Something went wrong! Resend OTP",
													});
												}
											});
											res.json({
												status: 401,
												message: messages.FAILURE.ACCOUNT_NOT_VERIFIED,
												success: false,
												verified: false,
											});
										} else if (user.isVerified === true) {
											bcrypt.compare(req.body.password, user.password, (err, result) => {
												console.log("result", result);
												if (err) {
													res.json({
														status: 401,
														success: false,
														message: messages.FAILURE.AUTH_FAILED,
													});
												}
												if (result) {
													const token = jwt.sign(
														{
															mobileNo: user.mobileNo,
															userId: user._id,
														},
														process.env.JWT_KEY,
														{
															expiresIn: "11h",
														}
														);
														res.json({
															status: 200,
															success: true,
															verified: user.isVerified,
															message: messages.SUCCESS.AUTH.LOGGEDIN,
															token: token,
															data: {
																id: user._id,
																firstName: user.firstName,
																lastName: user.lastName,
																email: user.email,
																mobileNo: user.mobileNo,
																userName: user.userName,
																dob: user.dob,
																role: user.role,
																accountType: user.accountType,
															},
														});
													} else {
														res.json({
															status: 401,
															success: false,
															message: messages.FAILURE.AUTH_FAILED,
														});
													}
												});
											}
										})
										.catch((err) => {
											res.json({
												status: 500,
												success: false,
												message: err,
											});
										});
									} else {
										// console.log('email | body', req.body);
										User.findOne({
											email: req.body.email,
										})
										.exec()
										.then((user) => {
											if (!user) {
												res.json({
													status: 401,
													success: false,
													message: messages.FAILURE.AUTH_FAILED,
												});
											}
											// console.log('user password', user.password);
											// console.log('body password', req.body.password);
											bcrypt.compare(req.body.password, user.password, (err, result) => {
												// console.log('result', result);
												if (err) {
													res.json({
														status: 401,
														success: false,
														message: messages.FAILURE.AUTH_FAILED,
													});
												}
												if (result) {
													const token = jwt.sign(
														{
															email: user.email,
															userId: user._id,
														},
														process.env.JWT_KEY,
														{
															expiresIn: "11h",
														}
														);
														res.json({
															status: 200,
															success: true,
															verified: user.isVerified,
															message: messages.SUCCESS.AUTH.LOGGEDIN,
															token: token,
															data: {
																id: user._id,
																firstName: user.firstName,
																lastName: user.lastName,
																email: user.email,
																mobileNo: user.mobileNo,
																userName: user.userName,
																dob: user.dob,
																accountType: user.accountType,
																role: user.role,
															},
														});
													} else {
														res.json({
															status: 401,
															success: false,
															message: messages.FAILURE.AUTH_FAILED,
														});
													}
												});
											})
											.catch((err) => {
												res.json({
													status: 500,
													success: false,
													message: err,
												});
											});
										}
									};
									
									//not using
									const deleteUserServiceFunc = async (req, res) => {
										User.remove({
											_id: req.params.userId,
										})
										.exec()
										.then((result) => {
											res.json({
												status: 200,
												success: true,
												message: messages.SUCCESS.USER.DELETED,
											});
										})
										.catch((err) => {
											res.json({
												status: 500,
												success: false,
												message: err,
											});
										});
									};
									
									//update Account Settings
									const updateAccountSettingServiceFunc = async (req, res) => {
										const { errors, isValid } = updateAccountSettingValidator(req.body);
										if (!isValid) {
											res.json({
												status: 400,
												success: false,
												message: errors,
											});
										}
										let user = await User.findOne({ _id: req.body.userId }).lean().exec();
										if (user == null) {
											res.json({
												status: 404,
												success: false,
												message: messages.FAILURE.USER_NOT_FOUND,
											});
										}
										const filter = {
											_id: req.body.userId,
										};
										const update = {
											visibleTo: req.body.visibleTo,
											hideFriendList: req.body.hideFriendList,
											lockChatBox: req.body.lockChatBox,
										};
										User.findOneAndUpdate(
											filter,
											{ $set: update },
											{ new: false },
											(err, user) => {
												if (err) {
													res.json({
														status: 501,
														success: false,
														message: messages.FAILURE.SWW,
													});
												} else {
													res.json({
														status: 200,
														success: true,
														message: messages.SUCCESS.ACCOUNTSETTING.UPDATED,
														data: {
															id: user._id,
															firstName: user.firstName,
															lastName: user.lastName,
															email: user.email,
															isActive: user.isActive,
															visibleTo: user.visibleTo,
															hideFriendList: user.hideFriendList,
															lockChatBox: user.lockChatBox,
															isDeleted: user.isDeleted,
															deletedAt: user.deletedAt,
															mobileNo: user.mobileNo,
															userName: user.userName,
															dob: user.dob,
															role: user.role,
															accountType: user.accountType,
														},
													});
												}
											}
											).catch((err) => {
												res.json({
													status: 500,
													success: false,
													message: err,
												});
											});
										};
										
										//update Account Settings
										const updateTimelineSettingServiceFunc = async (req, res) => {
											const { errors, isValid } = updateTimelineSettingValidator(req.body);
											if (!isValid) {
												res.json({
													status: 400,
													success: false,
													message: errors,
												});
											}
											
											let type = req.body.type;
											let value = req.body.value;
											
											let fields = {};
											
											if (type == "friends_on_timeline") {
												fields.showFriendsOnTimeline = value;
											} else if (type == "profession_on_timeline") {
												fields.showProfessionOnTimeline = value;
											} else if (type == "city_name_on_timeline") {
												fields.showCityNameOnTimeline = value;
											}
											await User.findOneAndUpdate(
												{ _id: req.body.userId },
												{ $set: fields },
												{ new: true },
												(err, user) => {
													if (err) {
														res.json({
															status: 501,
															success: false,
															message: messages.FAILURE.SWW,
														});
													} else {
														res.json({
															status: 200,
															success: true,
															message: messages.SUCCESS.FRIENDREQUESTSETTING.UPDATED,
															data: {
																id: user._id,
																firstName: user.firstName,
																lastName: user.lastName,
																email: user.email,
																isActive: user.isActive,
																visibleTo: user.visibleTo,
																hideFriendList: user.hideFriendList,
																lockChatBox: user.lockChatBox,
																isDeleted: user.isDeleted,
																deletedAt: user.deletedAt,
																mobileNo: user.mobileNo,
																userName: user.userName,
																dob: user.dob,
																role: user.role,
																accountType: user.accountType,
															},
														});
													}
												}
												).catch((err) => {
													res.json({
														status: 500,
														success: false,
														message: err,
													});
												});
											};
											
											// deactivate account
											const deactivateAccountServiceFunc = async (req, res) => {
												const { errors, isValid } = deactivateAccountValidator(req.body);
												if (!isValid) {
													res.json({
														status: 400,
														success: false,
														message: errors,
													});
												}
												let filter = {
													_id: req.body.userId,
												};
												let update = {
													isActive: false,
												};
												let user = await User.findOne({ _id: req.body.userId }).lean().exec();
												if (user == null) {
													res.json({
														status: 404,
														success: false,
														message: messages.FAILURE.USER_NOT_FOUND,
													});
												}
												bcrypt.compare(req.body.password, user.password, (err, result) => {
													console.log("result", result);
													if (err) {
														res.json({
															status: 401,
															success: false,
															message: messages.FAILURE.AUTH_FAILED,
														});
													} else {
														User.findOneAndUpdate(
															filter,
															{ $set: update },
															{ new: false },
															(err, doc) => {
																if (err) {
																	res.json({
																		status: 501,
																		success: false,
																		message: messages.FAILURE.SWW,
																	});
																}
															}
															)
															.then((user) => {
																res.json({
																	status: 200,
																	success: true,
																	message: messages.SUCCESS.ACCOUNT.DEACTIVATED,
																	data: {
																		id: user._id,
																		firstName: user.firstName,
																		lastName: user.lastName,
																		email: user.email,
																		isActive: user.isActive,
																		isDeleted: user.isDeleted,
																		deletedAt: user.deletedAt,
																		mobileNo: user.mobileNo,
																		userName: user.userName,
																		dob: user.dob,
																		role: user.role,
																		accountType: user.accountType,
																	},
																});
															})
															.catch((err) => {
																res.json({
																	status: 500,
																	success: false,
																	message: err,
																});
															});
														}
													});
												};
												
												const blockUserServiceFunc = async (req, res) => {
													let user = await User.findOne({ _id: req.body.userId }).lean().exec();
													if (user == null) {
														res.json({
															status: 404,
															success: false,
															message: messages.FAILURE.USER_NOT_FOUND,
														});
													}
													let blockUser = await User.findOne({ _id: req.body.userId }).lean().exec();
													if (blockUser == null) {
														res.json({
															status: 404,
															success: false,
															message: messages.FAILURE.BLOCK_USER_NOT_FOUND,
														});
													}
													let filter = {
														_id: req.body.userId,
													};
													
													let update = { $addToSet: { blockedUserIds: req.body.blockUserId } };
													
													await User.findOneAndUpdate(filter, update, (err, user) => {
														if (err) {
															res.json({
																status: 501,
																success: false,
																message: messages.FAILURE.SWW,
															});
														} else {
															res.json({
																status: 200,
																success: true,
																message: messages.SUCCESS.USER.BLOCKED,
																data: {
																	id: user._id,
																	firstName: user.firstName,
																	lastName: user.lastName,
																	email: user.email,
																	isActive: user.isActive,
																	isDeleted: user.isDeleted,
																	deletedAt: user.deletedAt,
																	mobileNo: user.mobileNo,
																	userName: user.userName,
																	dob: user.dob,
																	role: user.role,
																	reasonForDeleting: user.reasonForDeleting,
																	blockedUserIds: user.blockedUserIds,
																	accountType: user.accountType,
																},
															});
														}
													}).catch((err) => {
														res.json({
															status: 500,
															success: false,
															message: err,
														});
													});
												};
												
												// delete account
												const deleteAccountServiceFunc = async (req, res) => {
													const { errors, isValid } = deleteAccountValidator(req.body);
													if (!isValid) {
														res.json({
															status: 400,
															success: false,
															message: errors,
														});
													}
													
													let user = await User.findOne({ _id: req.body.userId }).lean().exec();
													if (user == null) {
														res.json({
															status: 404,
															success: false,
															message: messages.FAILURE.USER_NOT_FOUND,
														});
													}
													console.log("user", user);
													if (user.isDeleted == true || user.deletedAt !== "") {
														res.json({
															status: 404,
															success: false,
															message: messages.FAILURE.ACCOUNT_ALREADY_DELETED,
														});
													}
													bcrypt.compare(
														req.body.password.toString(),
														user.password.toString(),
														(err, result) => {
															console.log("result123s", result);
															console.log("err", err);
															if (err || result == false) {
																res.json({
																	status: 401,
																	success: false,
																	message: messages.FAILURE.AUTH_FAILED,
																});
															} else {
																let filter = {
																	_id: req.body.userId,
																};
																let update = {
																	isDeleted: true,
																	deletedAt: new Date(),
																	reasonForDeleting: req.body.reasonForDeleting,
																};
																User.findOneAndUpdate(
																	filter,
																	{ $set: update },
																	{ new: false },
																	(err, doc) => {
																		if (err) {
																			res.json({
																				status: 501,
																				success: false,
																				message: messages.FAILURE.SWW,
																			});
																		}
																	}
																	)
																	.then((user) => {
																		res.json({
																			status: 200,
																			success: true,
																			message: messages.SUCCESS.ACCOUNT.DELETED,
																			data: {
																				id: user._id,
																				firstName: user.firstName,
																				lastName: user.lastName,
																				email: user.email,
																				isActive: user.isActive,
																				isDeleted: user.isDeleted,
																				deletedAt: user.deletedAt,
																				mobileNo: user.mobileNo,
																				userName: user.userName,
																				dob: user.dob,
																				role: user.role,
																				reasonForDeleting: user.reasonForDeleting,
																				accountType: user.accountType,
																			},
																		});
																	})
																	.catch((err) => {
																		res.json({
																			status: 500,
																			success: false,
																			message: err,
																		});
																	});
																}
															}
															);
														};
														
														const saveOrUpdateServiceFunc = (module.exports = {
															googleSignInServiceFunc,
															verifySignUpOtpServiceFunc,
															getAllUsersServiceFunc,
															updateUserServiceFunc,
															getUserViaIdServiceFunc,
															signUpResendOtpServiceFunc,
															sendSignUpOtpServiceFunc,
															loginUserServiceFunc,
															deleteUserServiceFunc,
															updateAccountSettingServiceFunc,
															updateTimelineSettingServiceFunc,
															deactivateAccountServiceFunc,
															blockUserServiceFunc,
															deleteAccountServiceFunc,
														});
