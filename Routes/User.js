const { register, login, verify, generateForgetPasswordCode, checkForgetPasswordCode, resetUserPassword, getAllUsers, buildAuthorProfile, buildReaderProfile, buildPublisherProfile, editPublisherProfile, editAuthorProfile, editReaderProfile } = require('../API/User');

const router = require('express').Router()


router.post('/register' , register)

router.post('/buildAuthorProfile' , buildAuthorProfile)

router.post('/buildReaderProfile' , buildReaderProfile)

router.post('/buildPublisherProfile' , buildPublisherProfile)

router.post('/verify' , verify)

router.post('/login' , login)

router.post('/generateForgetPasswordCode', generateForgetPasswordCode)

router.post('/checkForgetPasswordCode' , checkForgetPasswordCode)

router.post('/resetUserPassword' , resetUserPassword)

router.post('/editPublisherProfile' , editPublisherProfile)

router.post('/editAuthorProfile' , editAuthorProfile)

router.post('/editReaderProfile' , editReaderProfile)


module.exports = router;