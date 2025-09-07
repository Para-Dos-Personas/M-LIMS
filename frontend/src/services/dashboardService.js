import api from './api';

// Helper to build the correct URL for dashboard endpoints
const buildUrl = (endpoint, warehouseId, month = null) => {
    let url = `/api/dashboard/${endpoint}`;
    const params = new URLSearchParams();
    if (month) {
        params.append('month', month);
    }
    if (warehouseId && warehouseId !== 'all') {
        params.append('warehouseId', warehouseId);
    }
    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
};

const dashboardService = {
  getInwardStats: async (month = null, warehouseId = null) => {
    const now = new Date();
    const currentMonth = month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const res = await api.get(buildUrl('inward', warehouseId, currentMonth));
    return res.data;
  },

  getOutwardStats: async (month = null, warehouseId = null) => {
    const now = new Date();
    const currentMonth = month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const res = await api.get(buildUrl('outward', warehouseId, currentMonth));
    return res.data;
  },

  getLowStock: async (warehouseId = null) => {
    const res = await api.get(buildUrl('low-stock', warehouseId));
    return res.data;
  },

  getOldStock: async (warehouseId = null) => {
    const res = await api.get(buildUrl('old-stock', warehouseId));
    return res.data;
  },
  
  getExpiredStock: async (warehouseId = null) => {
    const res = await api.get(buildUrl('expired-stock', warehouseId));
    return res.data;
  }
};

export default dashboardService;
