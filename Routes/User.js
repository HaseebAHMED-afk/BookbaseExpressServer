const { register, login, verify, generateForgetPasswordCode, checkForgetPasswordCode, resetUserPassword, getAllUsers } = require('../Controllers/User');

const router = require('express').Router()


router.post('/register' , register)

router.post('/login' , login)

router.post('/verify' , verify)

router.post('/generateForgetPasswordCode', generateForgetPasswordCode)

router.post('/checkForgetPasswordCode' , checkForgetPasswordCode)

router.post('/resetUserPassword' , resetUserPassword)


module.exports = router;