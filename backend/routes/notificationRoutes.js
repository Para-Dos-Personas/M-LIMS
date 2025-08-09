// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Apply authentication to all notification routes
router.use(authenticateToken);

// Get notifications for current user
router.get('/', notificationController.getNotifications);

// Get unread notification count
router.get('/unread-count', notificationController.getUnreadCount);

// Mark specific notification as read
router.put('/:id/read', notificationController.markAsRead);

// Mark all notifications as read
router.put('/mark-all-read', notificationController.markAllAsRead);

// Trigger notification checks (Admin only)
router.post('/trigger-checks', requireRole(['Admin']), notificationController.triggerChecks);

module.exports = router;
