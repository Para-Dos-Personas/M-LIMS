import api from './api';

const logService = {
  create: async (componentId, data) => {
    const res = await api.post(`/components/${componentId}/logs`, data);
    return res.data;
  },

  getByComponent: async (componentId) => {
    const res = await api.get(`/components/${componentId}/logs`);
    return res.data;
  },

  getAllLogs: async () => {
    const res = await api.get('/logs'); // if your backend supports global log listing
    return res.data;
  },
};

export default logService;