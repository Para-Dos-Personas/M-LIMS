import api from './api';

const dashboardService = {
  getInwardStats: async (month = null) => {
    if (!month) {
      const now = new Date();
      month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    }
    const res = await api.get(`/api/dashboard/inward?month=${month}`);
    return res.data;
  },
  getAllComponents: async () => {
    const res = await api.get('/api/components');
    return res.data;
  },

  getOutwardStats: async (month = null) => {
    if (!month) {
      const now = new Date();
      month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    }
    const res = await api.get(`/api/dashboard/outward?month=${month}`);
    return res.data;
  },

  getLowStock: async () => {
    const res = await api.get('/api/dashboard/low-stock');
    return res.data;
  },

  getOldStock: async () => {
    const res = await api.get('/api/dashboard/old-stock');
    return res.data;
  },
};

export default dashboardService;
