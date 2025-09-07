// src/services/componentService.js

import api from './api';

const endpoint = '/api/components';

const componentService = {
  getAll: async (warehouseId = null) => {
    // Use axios params so query string is built reliably
    const params = {};
    if (warehouseId != null && warehouseId !== 'all') {
      params.warehouseId = warehouseId;
    }
    const { data } = await api.get(endpoint, { params });
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`${endpoint}/${id}`);
    return data;
  },

  create: async (component) => {
    const { data } = await api.post(endpoint, component);
    return data;
  },

  update: async (id, component) => {
    const { data } = await api.put(`${endpoint}/${id}`, component);
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`${endpoint}/${id}`);
    return data;
  },

  // Log movement for a component
  logMovement: async (componentId, logData) => {
    const { data } = await api.post(`${endpoint}/${componentId}/logs`, logData);
    return data;
  },

  getLogs: async (componentId) => {
    const { data } = await api.get(`${endpoint}/${componentId}/logs`);
    return data;
  },
};

export default componentService;