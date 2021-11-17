const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    languageOfWriting: {
        type: String,
        required: true
    },
    verified:{
        type:Boolean,
        default: false
    }
},{
    timestamps: true
})

module.exports = new mongoose.model('User' , userSchema)