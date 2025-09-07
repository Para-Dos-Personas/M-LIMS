// routes/warehouseRoutes.js
const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const authenticateToken = require('../middleware/auth');
const { requireRole } = require('../middleware/auth'); // Import the role checker

// === Admin Only Routes ===

// @desc    Create a new warehouse
// @route   POST /api/warehouses
router.post('/', authenticateToken, requireRole(['Admin']), warehouseController.createWarehouse);

// @desc    Get all warehouses
// @route   GET /api/warehouses
router.get('/', authenticateToken, requireRole(['Admin']), warehouseController.getAllWarehouses);

// @desc    Get a single warehouse by ID
// @route   GET /api/warehouses/:id
router.get('/:id', authenticateToken, requireRole(['Admin']), warehouseController.getWarehouseById);

// @desc    Update a warehouse
// @route   PUT /api/warehouses/:id
router.put('/:id', authenticateToken, requireRole(['Admin']), warehouseController.updateWarehouse);

// @desc    Delete a warehouse
// @route   DELETE /api/warehouses/:id
router.delete('/:id', authenticateToken, requireRole(['Admin']), warehouseController.deleteWarehouse);

// @desc    Assign a user to a warehouse
// @route   POST /api/warehouses/:id/users
router.post('/:id/users', authenticateToken, requireRole(['Admin']), warehouseController.assignUserToWarehouse);


module.exports = router;