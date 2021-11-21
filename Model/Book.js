const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },   
    publisherId: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    isbn:{
        type: String,
        required: true
    },
    edition:{
        type: String,
        required: true
    },
    reviews:[{
        userId:String,
        dateAndTime: String,
        review:String,
        stars: String
    }]
},{
    timestamps: true
})

module.exports = new mongoose.model('Book' , bookSchema)