// controllers/notificationController.js
const notificationService = require('../services/notificationService');

// Get notifications for the authenticated user
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, limit, unreadOnly, type } = req.query;
    
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      unreadOnly: unreadOnly === 'true',
      type: type || null
    };

    const result = await notificationService.getNotifications(userId, options);
    
    res.json(result);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications', details: error.message });
  }
};

// Get unread notification count
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await notificationService.getUnreadCount(userId);
    
    res.json({ unreadCount: count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ error: 'Failed to fetch unread count', details: error.message });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const success = await notificationService.markAsRead(id, userId);
    
    if (success) {
      res.json({ message: 'Notification marked as read' });
    } else {
      res.status(404).json({ error: 'Notification not found' });
    }
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ error: 'Failed to mark notification as read', details: error.message });
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedCount = await notificationService.markAllAsRead(userId);
    
    res.json({ 
      message: 'All notifications marked as read',
      updatedCount: updatedCount
    });
  } catch (error) {
    console.error('Mark all as read error:', error);
    res.status(500).json({ error: 'Failed to mark all notifications as read', details: error.message });
  }
};

// Trigger notification checks manually (Admin only)
exports.triggerChecks = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    await notificationService.runAllChecks();
    
    res.json({ message: 'Notification checks completed successfully' });
  } catch (error) {
    console.error('Trigger checks error:', error);
    res.status(500).json({ error: 'Failed to run notification checks', details: error.message });
  }
};
