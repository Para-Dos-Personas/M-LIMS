import api from './api';

const userService = {
  // Get current user profile
  getProfile: async () => {
    const res = await api.get('/api/users/profile');
    return res.data;
  },

  // Get all users (admin only)
  getAllUsers: async () => {
    const res = await api.get('/api/users');
    return res.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const res = await api.put('/api/users/profile', userData);
    return res.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const res = await api.put('/api/users/password', passwordData);
    return res.data;
  }
};

export default userService;
