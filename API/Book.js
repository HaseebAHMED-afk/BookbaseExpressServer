const Author = require("../Model/Author");
const Book = require("../Model/Book");
const BookRequest = require("../Model/BookRequest");
const Publisher = require("../Model/Publisher");

exports.addBook = async (req,res) =>{

    const {name , authorId, publisherId, genre , length  , isbn , edition } = req.body;

    try {
        const author = await Author.findOne({_id: authorId})

        try {
            const publisher = await Publisher.findOne({_id: publisherId})

            try {
                const book = await Book.findOne({name:name})

                if(book){
                    res.json({
                        status:400,
                        message:"There is a book already present with this name"
                    })
                }else{
                    try {
                        const newBook = new Book({name , authorId:author._id, publisherId:publisher._id, genre , length , isbn , edition})

                        const responseBook = await newBook.save()

                        try {
                            const newBookRequest = new BookRequest({bookId: responseBook._id , authorId:author._id , publisherId:publisher._id})

                            const responseBookRequest = await newBookRequest.save()


                            res.json({
                                status:200,
                                message: responseBookRequest
                            })

                        } catch (error) {
                            res.json({
                                status:500,
                                message:error.message
                            })
                        }
                    } catch (error) {
                        res.json({
                            status:500,
                            message:error.message
                        })
                    }
                }


            } catch (error) {
                res.json({
                    status:500,
                    message:error.message
                })
            }
        } catch (error) {
            res.json({
                status:500,
                message:error.message
            })
        }
    } catch (error) {
        res.json({
            status:500,
            message:error.message
        })
    }

}


exports.approveBookRequest = async (req,res) =>{
    const { bookRequestId } = req.body;

    

}