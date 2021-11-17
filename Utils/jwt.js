const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.generateAccessToken = ({email}) =>{

    return jwt.sign({email}, process.env.JWT_STRING , { expiresIn: "10h" });
    
}