const express = require('express');
const { fetchAllBooks, approveBook, unApproveBook } = require('../controller/BookController');
const router = express.Router();

router.get('/books/all-books', fetchAllBooks);
router.get('/books/approve-book/:bookId', approveBook);
router.get('/books/unapprove-book/:bookId', unApproveBook);

module.exports = router;
