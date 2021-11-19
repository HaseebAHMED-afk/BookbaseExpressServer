const mongoose = require('mongoose')


const publisherSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    federalTaxIdentificationNumber: {
        type: String,
        required: true
    },
    stateTaxRegistrationCertificateNumber:{
        type: String,
        required: true
    },
    profileImageUrl:{
        type: String,
        required: true
    },
    verified:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

module.exports = new mongoose.model('Publisher' , publisherSchema)