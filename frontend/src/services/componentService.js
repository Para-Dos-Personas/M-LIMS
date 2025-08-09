import api from './api';

const endpoint = '/api/components';

const componentService = {
  getAll: async () => {
    const res = await api.get(endpoint);
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`${endpoint}/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post(endpoint, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`${endpoint}/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await api.delete(`${endpoint}/${id}`);
    return res.data;
  },

  // Log operations
  addLog: async (componentId, logData) => {
    const res = await api.post(`${endpoint}/${componentId}/logs`, logData);
    return res.data;
  },

  getLogs: async (componentId) => {
    const res = await api.get(`${endpoint}/${componentId}/logs`);
    return res.data;
  }
};

export default componentService;