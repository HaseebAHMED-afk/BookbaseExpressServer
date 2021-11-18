const mongoose = require('mongoose')


const accountSchema = new mongoose.Schema({
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
    authorlicense:{
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

module.exports = new mongoose.model('Account' , accountSchema)