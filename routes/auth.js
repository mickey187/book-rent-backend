const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controller/AuthController');



router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signin);

module.exports = router;