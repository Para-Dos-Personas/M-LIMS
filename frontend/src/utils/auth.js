// src/utils/auth.js

const auth = {
  // Checks if a token exists in local storage
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Saves the token and user data after login
  login: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('User', JSON.stringify(user));
  },

  // Removes the token and user data on logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('User');
  },

  // Retrieves the parsed user object from local storage
  getUser: () => {
    const user = localStorage.getItem('User');
    return user ? JSON.parse(user) : null;
  },

  // Retrieves the token string
  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default auth;