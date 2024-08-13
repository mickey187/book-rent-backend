const express = require('express');
const { rentBook, fetchRentedBooks } = require('../controller/RenterController');
const router = express.Router();


router.post('/rent', rentBook);
router.get('/rented-books', fetchRentedBooks);

module.exports = router;