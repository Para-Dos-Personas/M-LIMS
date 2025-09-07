// controllers/warehouseController.js
const { Warehouse } = require('../models');

// @desc    Create a new warehouse
// @route   POST /api/warehouses
exports.createWarehouse = async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Warehouse name is required.' });
    }
    const warehouse = await Warehouse.create({ name, location });
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all warehouses
// @route   GET /api/warehouses
exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};