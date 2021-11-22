const { addBook, approveBookRequest, declineBookRequest, reIssueBookRequest, cancelBookRequest } = require('../API/Book')

const router = require('express').Router()


router.post('/addBook' , addBook)

router.post('/approveBookRequest' , approveBookRequest)

router.post('/declineBookRequest' , declineBookRequest)

router.post('/reIssueBookRequest' , reIssueBookRequest)

router.post('/cancelBookRequest' , cancelBookRequest)

module.exports = router;