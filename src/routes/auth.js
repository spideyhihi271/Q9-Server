const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// AUTH /auth/signin
router.post('/signin', (req, res) => {
    res.status(200).send({ message: 'Signing in please wait...' });
});

// AUTH /auth/signup
router.post('/signup', (req, res) => {
    res.status(200).send({ message: 'Signing in please wait...' });
});


// Export
module.exports = router;
