// src/services/warehouseService.js
import api from './api';

// fetch all warehouses (admin only)
export async function getAllWarehouses() {
  return api.get('/api/warehouses');
}

// fetch warehouses accessible to current user
export async function getMyWarehouses() {
  return api.get('/api/users/warehouses');
}

// fetch one warehouse by id
export async function fetchWarehouseById(id) {
  return api.get(`/api/warehouses/${id}`);
}

// create a new warehouse
export async function createWarehouse(payload) {
  return api.post('/api/warehouses', payload);
}

// update an existing warehouse
export async function updateWarehouse(id, payload) {
  return api.put(`/api/warehouses/${id}`, payload);
}

// delete a warehouse
export async function deleteWarehouse(id) {
  return api.delete(`/api/warehouses/${id}`);
}

export default {
  getAllWarehouses,
  getMyWarehouses,
  fetchWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse
};