const express = require('express');
const { fetchAllBooks, approveBook, unApproveBook, fetchBookOwners } = require('../controller/BookController');
const router = express.Router();

router.get('/books/all-books', fetchAllBooks);
router.get('/books/approve-book/:bookId', approveBook);
router.get('/books/unapprove-book/:bookId', unApproveBook);
router.get('/books/owners', fetchBookOwners);

module.exports = router;
