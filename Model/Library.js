const mongoose = requrie('mongoose')


const librarySchema = new mongoose.Schema({
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
    addressLongitude:{
        type: String,
        required: true
    },
    addressLattitude:{
        type: String,
        required: true
    },
    ownership:{
        public:{
            type: Boolean,
            default: true
        },
        private:{
            type: Boolean,
            default: false
        }
    }
},{
    timestamps: true
})

module.exports = new mongoose.model('Libraryr' , librarySchema)