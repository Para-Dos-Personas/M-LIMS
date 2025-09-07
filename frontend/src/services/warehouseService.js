import api from './api';

// This function now correctly calls the endpoint that gets the warehouses for the logged-in user.
const getMyWarehouses = () => {
  return api.get('/api/users/warehouses'); // <-- This URL is now correct.
};

const getAllWarehouses = () => {
  return api.get('/api/warehouses');
}

// Admin functions for managing user assignments
const getUserWarehouses = (userId) => {
    return api.get(`/api/users/${userId}/warehouses`);
};

const updateUserWarehouses = (userId, warehouseIds) => {
    return api.put(`/api/users/${userId}/warehouses`, { warehouseIds });
};

export default {
  getMyWarehouses,
  getAllWarehouses,
  getUserWarehouses,
  updateUserWarehouses,
};

