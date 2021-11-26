const { addBook, approveBookRequest, declineBookRequest, reIssueBookRequest, cancelBookRequest, getAllBooks, getBookById } = require('../API/Book')

const router = require('express').Router()


router.post('/addBook' , addBook)

router.post('/approveBookRequest' , approveBookRequest)

router.post('/declineBookRequest' , declineBookRequest)

router.post('/reIssueBookRequest' , reIssueBookRequest)

router.post('/cancelBookRequest' , cancelBookRequest)

router.get('/getAllBooks' , getAllBooks)

router.post('/getBookById' , getBookById)

module.exports = router;