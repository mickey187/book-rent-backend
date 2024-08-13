const express = require('express');
const router = express.Router();
const multer = require("multer");
const { createBook, fetchBooksByOwnerId } = require('../controller/BookController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/book/create', upload.single("bookCover"), createBook);
router.get('/book/fetch/:ownerId', fetchBooksByOwnerId);

module.exports = router;