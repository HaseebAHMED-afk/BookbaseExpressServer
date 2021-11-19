const mongoose = require('mongoose')


const authorSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    authorLicense:{
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
    profileImageUrl:{
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

module.exports = new mongoose.model('Author' , authorSchema)