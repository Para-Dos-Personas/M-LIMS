// src/services/warehouseService.js
import axios from 'axios';

// fetch all warehouses
export async function fetchWarehouses() {
  const response = await axios.get('/api/warehouses');
  return response.data;
}

// fetch one warehouse by id
export async function fetchWarehouseById(id) {
  const response = await axios.get(`/api/warehouses/${id}`);
  return response.data;
}

// create a new warehouse
export async function createWarehouse(payload) {
  const response = await axios.post('/api/warehouses', payload);
  return response.data;
}

// update an existing warehouse
export async function updateWarehouse(id, payload) {
  const response = await axios.put(`/api/warehouses/${id}`, payload);
  return response.data;
}

// delete a warehouse
export async function deleteWarehouse(id) {
  const response = await axios.delete(`/api/warehouses/${id}`);
  return response.data;
}

// default export (optional)
export default {
  fetchWarehouses,
  fetchWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse
};