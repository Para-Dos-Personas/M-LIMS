import api from './api';

const authService = {
  login: async ({ username, password }) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      return res.data; // { token, user }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  },

  register: async ({ username, password, role = 'user' }) => {
    try {
      const res = await api.post('/auth/register', { username, password, role });
      return res.data; // e.g., { message: 'Registered successfully' }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  },
};

export default authService;
