import api from './api';

const notificationService = {
  // Get all notifications for current user
  getNotifications: async (options = {}) => {
    const params = new URLSearchParams({
      page: (options.page || 1).toString(),
      limit: (options.limit || 20).toString(),
      ...(options.unreadOnly && { unreadOnly: 'true' }),
      ...(options.type && { type: options.type })
    });
    
    const res = await api.get(`/api/notifications?${params}`);
    return res.data;
  },

  // Get unread notification count
  getUnreadCount: async () => {
    const res = await api.get('/api/notifications/unread-count');
    return res.data.unreadCount;
  },

  // Mark specific notification as read
  markAsRead: async (notificationId) => {
    const res = await api.put(`/api/notifications/${notificationId}/read`);
    return res.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const res = await api.put('/api/notifications/mark-all-read');
    return res.data;
  },

  // Trigger notification checks (Admin only)
  triggerChecks: async () => {
    const res = await api.post('/api/notifications/trigger-checks');
    return res.data;
  }
};

export default notificationService;