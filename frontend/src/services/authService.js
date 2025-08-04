import api from './api';

const authService = {
  login: async ({ username, password }) => {
    const res = await api.post('/auth/login', { username, password });
    return res.data; // { token, user }
  },

  register: async ({ username, password, role }) => {
    const res = await api.post('/auth/register', { username, password, role });
    return res.data;
  },
};

export default authService;
