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
    publishDate: {
        type: String,
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
    rating: {
        type: String,
        default:'0.0'
    }
},{
    timestamps: true
})

module.exports = new mongoose.model('Book' , bookSchema)