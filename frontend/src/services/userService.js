import api from './api';

const userService = {
  // Get current user profile
  getProfile: async () => {
    const res = await api.get('/auth/profile');
    return res.data;
  },

  // Get all users (admin only)
  getAll: async () => {
    const res = await api.get('/auth');
    return res.data;
  },

  // Update user role (admin only)
  updateRole: async (userId, role) => {
    const res = await api.put(`/auth/${userId}/role`, { role });
    return res.data;
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    const res = await api.delete(`/auth/${userId}`);
    return res.data;
  },

  // Create new user (admin only)
  createUser: async (userData) => {
    const res = await api.post('/auth/create', userData);
    return res.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const res = await api.put('/auth/profile', userData);
    return res.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const res = await api.put('/auth/password', passwordData);
    return res.data;
  }
};

export default userService;
