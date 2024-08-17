const express = require('express');
const { rentBook, fetchRentedBooks, fetchBooksForRent } = require('../controller/RenterController');
const router = express.Router();


router.post('/rent', rentBook);
router.get('/rented-books', fetchRentedBooks);
router.get('/fetch-books', fetchBooksForRent);

module.exports = router;