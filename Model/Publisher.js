const mongoose = requrie('mongoose')


const publisherSchema = new mongoose.Schema({
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
    }
},{
    timestamps: true
})

module.exports = new mongoose.model('Publisher' , publisherSchema)