// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');
const { requireRole } = require('../middleware/auth');

// == PUBLIC ROUTES ==
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// == AUTHENTICATED USER ROUTES ==
router.get('/profile', authenticateToken, userController.getUserProfile);

// == ADMIN ONLY ROUTES ==
router.get('/', authenticateToken, requireRole(['Admin']), userController.getAllUsers);
router.put('/:id/role', authenticateToken, requireRole(['Admin']), userController.updateUserRole);
router.delete('/:id', authenticateToken, requireRole(['Admin']), userController.deleteUser);


module.exports = router;