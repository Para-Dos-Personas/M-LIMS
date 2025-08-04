import api from './api';

const dashboardService = {
  getInwardStats: async () => {
    const res = await api.get('/dashboard/inward?month=2025-08'); // Optional: dynamically use new Date()
    return res.data;
  },

  getOutwardStats: async () => {
    const res = await api.get('/dashboard/outward?month=2025-08');
    return res.data;
  },

  getLowStock: async () => {
    const res = await api.get('/dashboard/low-stock');
    return res.data;
  },

  getOldStock: async () => {
    const res = await api.get('/dashboard/old-stock');
    return res.data;
  },
};

export default dashboardService;
