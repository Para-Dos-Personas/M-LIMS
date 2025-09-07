// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// @route   POST /register
// @desc    Register a new user
// @access  Public
router.post('/register', userController.registerUser);

// @route   POST /login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', userController.loginUser);


// Example of a future protected route for getting a user's profile
// router.get('/profile', authMiddleware, userController.getUserProfile);


module.exports = router;