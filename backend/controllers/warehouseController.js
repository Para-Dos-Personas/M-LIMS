// controllers/warehouseController.js
const { Warehouse, User } = require('../models');

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
    res.status(500).json({ error: 'Failed to create warehouse', details: error.message });
  }
};

// @desc    Get all warehouses
// @route   GET /api/warehouses
exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch warehouses', details: error.message });
  }
};

// @desc    Get a single warehouse by ID
// @route   GET /api/warehouses/:id
exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByPk(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch warehouse', details: error.message });
  }
};

// @desc    Update a warehouse
// @route   PUT /api/warehouses/:id
exports.updateWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByPk(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    const updatedWarehouse = await warehouse.update(req.body);
    res.json(updatedWarehouse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update warehouse', details: error.message });
  }
};

// @desc    Delete a warehouse
// @route   DELETE /api/warehouses/:id
exports.deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByPk(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    await warehouse.destroy();
    res.json({ message: 'Warehouse deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete warehouse', details: error.message });
  }
};

// @desc    Assign a user to a warehouse
// @route   POST /api/warehouses/:id/users
exports.assignUserToWarehouse = async (req, res) => {
  try {
    const { userId } = req.body;
    const warehouseId = req.params.id;

    const warehouse = await Warehouse.findByPk(warehouseId);
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // This special method is created by Sequelize's belongsToMany association
    await warehouse.addUser(user);

    res.json({ message: `User '${user.username}' assigned to warehouse '${warehouse.name}'` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign user', details: error.message });
  }
};