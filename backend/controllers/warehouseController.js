// controllers/warehouseController.js - DEBUG VERSION
// Temporarily simplify to isolate the issue

const { Warehouse, User } = require('../models');

// @desc    Get all warehouses (simplified for debugging)
// @route   GET /api/warehouses
exports.getAllWarehouses = async (req, res) => {
  try {
    console.log('DEBUG: Starting getAllWarehouses');
    
    // First, try without include to see if basic query works
    const warehouses = await Warehouse.findAll();
    console.log('DEBUG: Basic query successful, found:', warehouses.length, 'warehouses');
    
    return res.status(200).json(warehouses);
    
    // If basic query works, uncomment this to test with include:
    /*
    const warehousesWithUsers = await Warehouse.findAll({
      include: [{ 
        model: User, 
        through: { attributes: [] } 
      }],
    });
    console.log('DEBUG: Query with users successful');
    return res.status(200).json(warehousesWithUsers);
    */
    
  } catch (error) {
    console.error('DEBUG: Error in getAllWarehouses:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch warehouses', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Keep other methods as they were...
exports.createWarehouse = async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Warehouse name is required.' });
    }
    const warehouse = await Warehouse.create({ name, location });
    return res.status(201).json(warehouse);
  } catch (error) {
    console.error('DEBUG: Error in createWarehouse:', error);
    return res.status(500).json({ error: 'Failed to create warehouse', details: error.message });
  }
};