import api from './api';

const endpoint = '/api/components';
const userServiceEndpoint = '/api/users';

const componentService = {
  getAll: async (warehouseId = null) => {
    let url = endpoint;
    // If a specific warehouse is selected (and it's not 'all'), add it as a query parameter.
    if (warehouseId && warehouseId !== 'all') {
      url += `?warehouseId=${warehouseId}`;
    }
    const res = await api.get(url);
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
  },
  
  // NEW FUNCTION: Get the warehouses a user is assigned to
  getUserPermissions: async () => {
    const res = await api.get(`${userServiceEndpoint}/warehouses`);
    return res.data;
  },
};

export default componentService;
