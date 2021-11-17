const User = require("../Model/User");
const bcrypt = require('bcrypt');
const { generateAccessToken } = require("../Utils/jwt");
const VerificationCodes = require("../Model/VerificationCodes");
const ForgetPassword = require('../Model/ForgetPasswordCode')
const { sendMail } = require("../Utils/nodemailer");
const ForgetPasswordCode = require("../Model/ForgetPasswordCode");
const saltRounds = 10;
require('dotenv').config()

exports.register = async (req, res) => {
    const { firstName, lastName, email, password, country, gender, languageOfWriting } = req.body;

    try {
        const checkEmail = await User.findOne({ email: email });

        if (checkEmail) {
            res.json({
                status: 400,
                message: 'User already exists.'
            })
        } else {
            try {

                bcrypt.hash(password, saltRounds, async function (err, hash) {

                    if (err) {
                        res.json({
                            status: 500,
                            message: err
                        })
                    } else {
                        const newUser = await User({
                            firstName,
                            lastName,
                            email,
                            password: hash,
                            gender,
                            languageOfWriting,
                            country
                        })

                        try {
                            const response = await newUser.save();

                            try {
                                const newCode = new VerificationCodes({ userId: response._id })

                                const responseCode = await newCode.save()

                                let mail = {
                                    to: `${response.email}`,
                                    from: `${process.env.GMAIL_USER}`,
                                    text: `Hello and welcome to Bookbase. To verify your account please click on the following link: http://localhost:5000/user/verify/${responseCode._id}  `
                                }

                                await sendMail(mail)

                                res.json({
                                    status: 200,
                                    message: response
                                })

                            } catch (error) {
                                res.json({
                                    status: 500,
                                    message: error.message
                                })
                            }


                        } catch (error) {
                            res.json({
                                status: 500,
                                message: error.message
                            })
                        }

                    }
                });

            } catch (error) {
                res.json({
                    status: 500,
                    message: error.message
                })
            }
        }
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }

}


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await User.findOne({ email: email });

        if (response) {
            try {
                bcrypt.compare(password, response.password, async (err, result) => {
                    if (err) {
                        res.json({
                            status: 400,
                            message: err
                        })
                    } else {
                        if (result === true) {
                            const token = await generateAccessToken({ email });

                            res.json({
                                status: 200,
                                message: {
                                    _id: response._id,
                                    firstName: response.firstName,
                                    lastName: response.lastName,
                                    email: response.email,
                                    country: response.country,
                                    languageOfWriting: response.languageOfWriting,
                                    gender: response.gender,
                                    verified: response.verified,
                                    token: token
                                }
                            })
                        } else {
                            res.json({
                                status: 402,
                                message: "Incorrect password"
                            })
                        }
                    }
                })
            } catch (error) {
                res.json({
                    status: 500,
                    message: err.message
                })
            }
        } else {
            res.json({
                status: 404,
                message: 'User not found.'
            })
        }
    } catch (error) {
        res.json({
            status: 500,
            message: err.message
        })
    }

}



exports.verify = async (req, res) => {

    const { codeId } = req.body;

    try {
        const code = await VerificationCodes.findOne({ _id: codeId })

        if (code) {

            try {
                const updatedUser = await User.findOneAndUpdate({ _id: code.userId }, { $set: { verified: true } }, { new: true })

                const token = await generateAccessToken({ email: updatedUser.email });

                await VerificationCodes.findOneAndDelete({ _id: codeId })

                res.json({
                    status: 200,
                    message: {
                        _id: updatedUser._id,
                        firstName: updatedUser.firstName,
                        lastName: updatedUser.lastName,
                        email: updatedUser.email,
                        country: updatedUser.country,
                        languageOfWriting: updatedUser.languageOfWriting,
                        gender: updatedUser.gender,
                        verified: updatedUser.verified,
                        token: token
                    }
                })
            } catch (error) {
                res.json({
                    status: 500,
                    message: error.message
                })
            }

        } else {
            res.json({
                status: 404,
                message: 'Invalid user'
            })
        }
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }

}


exports.generateForgetPasswordCode = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            res.json({
                status: 404,
                message: 'User not found'
            })

        } else {

            try {
                const newCode = await ForgetPassword({ userId: user._id })

                const responseCode = await newCode.save()

                let mail = {
                    to: `${user.email}`,
                    from: `${process.env.GMAIL_USER}`,
                    text: `Hello from Bookbase. To reset your account password, please click on the following link: http://localhost:5000/user/reset-password/${responseCode._id}  `
                }

                await sendMail(mail)

                res.json({
                    status: 200,
                    message: newCode._id
                })
            } catch (error) {
                res.json({
                    status: 500,
                    message: error.message
                })
            }
        }
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}


exports.checkForgetPasswordCode = async (req, res) => {
    const { codeId } = req.body;

    try {
        const checkCode = await ForgetPasswordCode.findOne({ _id: codeId })

        if (checkCode) {
            res.json({
                status: 200
            })
        } else {
            res.json({
                status: 402
            })
        }
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}


exports.resetUserPassword = async (req, res) => {
    const { password, codeId } = req.body;

    try {
        const code = await ForgetPassword.findOne({ _id: codeId })

        try {
            const user = await User.findOne({ _id: code.userId })

            try {

                bcrypt.hash(password, saltRounds, async function (err, hash) {
                    if (err) {

                    } else {
                        const updatedUser = await User.findOneAndUpdate({ _id: code.userId }, { $set: { password: hash } }, { new: true })

                        res.json({
                            status: 200,
                            message: {
                                _id: updatedUser._id,
                                firstName: updatedUser.firstName,
                                lastName: updatedUser.lastName,
                                email: updatedUser.email,
                                country: updatedUser.country,
                                languageOfWriting: updatedUser.languageOfWriting,
                                gender: updatedUser.gender,
                                verified: updatedUser.verified,
                            }
                        })
                    }
                })

            } catch (error) {
                res.json({
                    status: 500,
                    message: error.message
                })
            }

        } catch (error) {
            res.json({
                status: 500,
                message: error.message
            })
        }
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }

}


exports.getAllUsers = async (req,res) =>{
    try {
        const response = await User.find({})

        res.json({
            status:200,
            message: response
        })
    } catch (error) {
        res.json({
            status:500,
            message: error.message
        })
    }
}