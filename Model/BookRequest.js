const mongoose = require('mongoose')


const bookRequestSchema = new mongoose.Schema({
    bookId:{
        type: String,
        required: true
    },
    authorId:{
        type: String,
        required: true
    },
    publisherId:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = new mongoose.model('BookRequest' , bookRequestSchema)