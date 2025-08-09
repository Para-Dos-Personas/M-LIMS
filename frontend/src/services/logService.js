import api from './api';

const logService = {
  create: async (componentId, data) => {
    const res = await api.post(`/api/components/${componentId}/logs`, data);
    return res.data;
  },

  getByComponent: async (componentId) => {
    const res = await api.get(`/api/components/${componentId}/logs`);
    return res.data;
  },

  getAllLogs: async () => {
    const res = await api.get('/api/logs');
    return res.data;
  },

  getPaginatedLogs: async (page = 1, limit = 20, filters = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    const res = await api.get(`/api/logs/paginated?${params}`);
    return res.data;
  },
};

export default logService;