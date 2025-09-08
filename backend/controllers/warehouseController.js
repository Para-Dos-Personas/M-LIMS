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
    return res.status(201).json(warehouse);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create warehouse', details: error.message });
  }
};

// @desc    Get all warehouses (with assigned users)
// @route   GET /api/warehouses
exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll({
      include: [{ model: User, through: { attributes: [] } }],
    });
    return res.status(200).json(warehouses);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch warehouses', details: error.message });
  }
};

// @desc    Get a single warehouse by ID (with assigned users)
// @route   GET /api/warehouses/:id
exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByPk(req.params.id, {
      include: [{ model: User, through: { attributes: [] } }],
    });
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    return res.json(warehouse);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch warehouse', details: error.message });
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
    const updated = await warehouse.update(req.body);
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update warehouse', details: error.message });
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
    return res.json({ message: 'Warehouse deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete warehouse', details: error.message });
  }
};

// @desc    Assign a user to a warehouse
// @route   POST /api/warehouses/:id/users
exports.assignUserToWarehouse = async (req, res) => {
  try {
    const warehouseId = req.params.id;
    const { userId } = req.body;

    const warehouse = await Warehouse.findByPk(warehouseId);
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent duplicate assignment
    const alreadyAssigned = await warehouse.hasUser(user);
    if (alreadyAssigned) {
      return res.status(400).json({ error: 'User already assigned to this warehouse' });
    }

    await warehouse.addUser(user);
    const updated = await Warehouse.findByPk(warehouseId, {
      include: [{ model: User, through: { attributes: [] } }],
    });

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to assign user', details: error.message });
  }
};

// @desc    Get all users assigned to a warehouse
// @route   GET /api/warehouses/:id/users
exports.getWarehouseUsers = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByPk(req.params.id, {
      include: [{ model: User, through: { attributes: [] } }],
    });
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    return res.json(warehouse.Users);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
};