const express = require('express');
const router = express.Router();

const AuthController = require('../app/controllers/AuthController');

// AUTH /auth/signin
router.post('/signup', AuthController.signUp);

// AUTH /auth/signup
router.post('/signin', AuthController.signIn);

// Export
module.exports = router;
