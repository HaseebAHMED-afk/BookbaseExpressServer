const { addBook } = require('../API/Book')

const router = require('express').Router()


router.post('/addBook' , addBook)


module.exports = router;