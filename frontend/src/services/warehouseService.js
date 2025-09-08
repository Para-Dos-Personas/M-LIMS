// src/services/warehouseService.js
import axios from 'axios';

// Configure axios base URL - adjust this to match your backend
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with base URL and auth header
const api = axios.create({
  baseURL: API_BASE,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// fetch all warehouses (admin only)
export async function fetchWarehouses() {
  const response = await api.get('/api/warehouses');
  return response;
}

// fetch warehouses accessible to current user
export async function getMyWarehouses() {
  const response = await api.get('/api/users/warehouses');
  return response;
}

// fetch one warehouse by id
export async function fetchWarehouseById(id) {
  const response = await api.get(`/api/warehouses/${id}`);
  return response;
}

// create a new warehouse
export async function createWarehouse(payload) {
  const response = await api.post('/api/warehouses', payload);
  return response;
}

// update an existing warehouse
export async function updateWarehouse(id, payload) {
  const response = await api.put(`/api/warehouses/${id}`, payload);
  return response;
}

// delete a warehouse
export async function deleteWarehouse(id) {
  const response = await api.delete(`/api/warehouses/${id}`);
  return response;
}

// default export
export default {
  fetchWarehouses,
  getMyWarehouses,
  fetchWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse
};