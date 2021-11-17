const mongoose = require('mongoose');


const forgetPasswordCodeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    }
},{
    timestamps: true
})


module.exports = new mongoose.model('ForgetPasswordCode' , forgetPasswordCodeSchema)