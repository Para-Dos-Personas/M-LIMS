// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authenticateToken = require('../middleware/auth');

// Apply authentication to all dashboard routes
router.use(authenticateToken);

// Define the routes
router.get('/inward', dashboardController.getInwardStats);
router.get('/outward', dashboardController.getOutwardStats);
router.get('/low-stock', dashboardController.getLowStock);
router.get('/old-stock', dashboardController.getOldStock);
router.get('/expired-stock', dashboardController.getExpiredStock);

module.exports = router;