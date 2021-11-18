const mongoose = require('mongoose');


const verificationSchema = new mongoose.Schema({
    accountId: {
        type: String,
        required: true
    }
},{
    timestamps: true
})


module.exports = new mongoose.model('VerificationCodes' , verificationSchema)