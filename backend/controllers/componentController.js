const db = require('../models');
const { Component, ComponentLog, User } = db;

// Helper function to check if a user has write permission for a warehouse
const canEditWarehouse = async (user, warehouseId) => {
  if (user.role === 'Admin') {
    return true; // Admins can edit anything
  }
  // Regular users must be explicitly assigned to the warehouse
  return await user.hasWarehouse(warehouseId);
};

// Create a component (requires edit permission)
exports.createComponent = async (req, res) => {
  try {
    const { warehouseId } = req.body;
    if (!warehouseId) {
      return res.status(400).json({ error: 'warehouseId is required.' });
    }

    const hasPermission = await canEditWarehouse(req.user, warehouseId);
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to add components to this warehouse.' });
    }

    const component = await Component.create(req.body);
    res.status(201).json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create component', details: error.message });
  }
};

// Get all components (publicly viewable by warehouse)
exports.getAllComponents = async (req, res) => {
  try {
    const { warehouseId } = req.query;
    let whereClause = {};
    
    if (warehouseId) {
      whereClause.warehouseId = warehouseId;
    }
    // If no warehouseId is provided, it returns all components for all warehouses (for an "All" view)

    const components = await Component.findAll({ where: whereClause });
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch components' });
  }
};

// Get component by ID (publicly viewable)
exports.getComponentById = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });
    res.json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch component' });
  }
};

// Update component (requires edit permission)
exports.updateComponent = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });

    const hasPermission = await canEditWarehouse(req.user, component.warehouseId);
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to edit components in this warehouse.' });
    }

    await component.update(req.body);
    res.json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update component', details: error.message });
  }
};

// Delete component (requires edit permission)
exports.deleteComponent = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });

    const hasPermission = await canEditWarehouse(req.user, component.warehouseId);
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to delete components in this warehouse.' });
    }

    await component.destroy();
    res.json({ message: 'Component deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete component' });
  }
};

// Add a component log (requires edit permission)
exports.addLog = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });
    
    const hasPermission = await canEditWarehouse(req.user, component.warehouseId);
    if (!hasPermission) {
        return res.status(403).json({ error: 'Forbidden: You do not have permission to log changes for this component.' });
    }

    // (The rest of your addLog logic remains the same)
    const { changeType, quantity, reason, project } = req.body;
    const parsedQuantity = parseInt(quantity, 10);
    
    if (isNaN(parsedQuantity) || !['inward', 'outward'].includes(changeType)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    const newQty = changeType === 'inward'
      ? component.quantity + parsedQuantity
      : component.quantity - parsedQuantity;

    if (newQty < 0) return res.status(400).json({ error: 'Not enough stock' });

    component.quantity = newQty;
    await component.save();

    const log = await ComponentLog.create({
      changeType,
      quantity: parsedQuantity,
      reason,
      project,
      userId: req.user.id,
      componentId: component.id
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add log', details: error.message });
  }
};

// Get logs for a component (publicly viewable)
exports.getLogs = async (req, res) => {
  try {
    const logs = await ComponentLog.findAll({
      where: { componentId: req.params.id },
      include: [{ model: User, as: 'User', attributes: ['username'] }]
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};
