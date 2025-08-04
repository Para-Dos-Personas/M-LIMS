// This file has been updated to use named exports for login and register,
// and the API endpoints have been changed to match the new backend routes.

import api from './api';

/**
 * Handles user authentication.
 */
const authService = {
  /**
   * Logs in a user.
   * @param {object} credentials - The user's login credentials.
   * @param {string} credentials.username - The user's username.
   * @param {string} credentials.password - The user's password.
   * @returns {Promise<object>} - A promise that resolves with the API response data.
   * @throws {Error} - Throws an error if login fails.
   */
  login: async ({ username, password }) => {
    try {
      // API call to the new login endpoint
      const res = await api.post('/auth/login', { username, password });
      return res.data; // { token, user }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  },

  /**
   * Registers a new user.
   * @param {object} userData - The user's registration data.
   * @param {string} userData.username - The new user's username.
   * @param {string} userData.password - The new user's password.
   * @param {string} [userData.role='User'] - The new user's role.
   * @returns {Promise<object>} - A promise that resolves with the API response data.
   * @throws {Error} - Throws an error if registration fails.
   */
  register: async ({ username, password, role = 'User' }) => {
    try {
      // API call to the new register endpoint
      const res = await api.post('/auth/register', { username, password, role });
      return res.data; // e.g., { message: 'Registered successfully' }
    } catch (err) {
      throw new Error(
        err.response?.data?.details ||
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Login failed'
      );

    }
  },
};

export default authService;
