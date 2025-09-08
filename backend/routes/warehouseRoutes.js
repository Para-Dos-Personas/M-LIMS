// routes/warehouseRoutes.js

const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// === Admin Only Routes ===

// Create a new warehouse
// POST /api/warehouses
router.post(
  '/',
  authenticateToken,
  requireRole(['Admin']),
  warehouseController.createWarehouse
);

// Get all warehouses (w/ users)
// GET /api/warehouses
router.get(
  '/',
  authenticateToken,
  requireRole(['Admin']),
  warehouseController.getAllWarehouses
);

// Get all users assigned to a warehouse
// GET /api/warehouses/:id/users
router.get(
  '/:id/users',
  authenticateToken,
  requireRole(['Admin']),
  warehouseController.getWarehouseUsers
);

// Get a single warehouse by ID (w/ users)
// GET /api/warehouses/:id
router.get(
  '/:id',
  authenticateToken,
  requireRole(['Admin']),
  warehouseController.getWarehouseById
);

// Update a warehouse
// PUT /api/warehouses/:id
router.put(
  '/:id',
  authenticateToken,
  requireRole(['Admin']),
  warehouseController.updateWarehouse
);

// Delete a warehouse
// DELETE /api/warehouses/:id
router.delete(
  '/:id',
  authenticateToken,
  requireRole(['Admin']),
  warehouseController.deleteWarehouse
);

// Assign a user to a warehouse
// POST /api/warehouses/:id/users
router.post(
  '/:id/users',
  authenticateToken,
  requireRole(['Admin']),
  warehouseController.assignUserToWarehouse
);

module.exports = router;