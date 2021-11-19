const { register, login, verify, generateForgetPasswordCode, checkForgetPasswordCode, resetUserPassword, getAllUsers, buildAuthorProfile, buildReaderProfile, buildPublisherProfile } = require('../Controllers/User');

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


module.exports = router;