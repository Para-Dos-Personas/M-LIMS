// controllers/componentController.js
const db = require('../models');
const { Component, ComponentLog, User } = db;

// Create a component in a specific warehouse
exports.createComponent = async (req, res) => {
  try {
    const { warehouseId } = req.body;
    if (!warehouseId) {
      return res.status(400).json({ error: 'warehouseId is required.' });
    }

    // SECURITY CHECK: User must have access to the warehouse
    const hasAccess = await req.user.hasWarehouse(warehouseId);
    if (req.user.role !== 'Admin' && !hasAccess) {
      return res.status(403).json({ error: 'Forbidden: You do not have access to this warehouse.' });
    }

    const component = await Component.create(req.body);
    res.status(201).json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create component', details: error.message });
  }
};

// Get all components for a specific warehouse
exports.getAllComponents = async (req, res) => {
  try {
    const { warehouseId } = req.query;
    if (!warehouseId) {
      return res.status(400).json({ error: 'A warehouseId query parameter is required.' });
    }

    // SECURITY CHECK: User must have access to the warehouse
    const hasAccess = await req.user.hasWarehouse(warehouseId);
    if (req.user.role !== 'Admin' && !hasAccess) {
      return res.status(403).json({ error: 'Forbidden: You do not have access to this warehouse.' });
    }

    const components = await Component.findAll({ where: { warehouseId } });
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch components' });
  }
};

// Get a single component by ID
exports.getComponentById = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });

    // SECURITY CHECK: User must have access to the component's warehouse
    const hasAccess = await req.user.hasWarehouse(component.warehouseId);
    if (req.user.role !== 'Admin' && !hasAccess) {
      return res.status(403).json({ error: 'Forbidden: You do not have access to this component.' });
    }

    res.json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch component' });
  }
};

// Update a component
exports.updateComponent = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });

    // SECURITY CHECK: User must have access to the component's warehouse
    const hasAccess = await req.user.hasWarehouse(component.warehouseId);
    if (req.user.role !== 'Admin' && !hasAccess) {
      return res.status(403).json({ error: 'Forbidden: You do not have access to this component.' });
    }

    await component.update(req.body);
    res.json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update component', details: error.message });
  }
};

// Delete a component
exports.deleteComponent = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });

    // SECURITY CHECK: User must have access to the component's warehouse
    const hasAccess = await req.user.hasWarehouse(component.warehouseId);
    if (req.user.role !== 'Admin' && !hasAccess) {
      return res.status(403).json({ error: 'Forbidden: You do not have access to this component.' });
    }

    await component.destroy();
    res.json({ message: 'Component deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete component' });
  }
};

// Add a component log (inward/outward)
exports.addLog = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });

    // SECURITY CHECK: User must have access to the component's warehouse
    const hasAccess = await req.user.hasWarehouse(component.warehouseId);
    if (req.user.role !== 'Admin' && !hasAccess) {
      return res.status(403).json({ error: 'Forbidden: You do not have access to this component.' });
    }

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

// Get logs for a component
exports.getLogs = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });
    
    // SECURITY CHECK: User must have access to the component's warehouse
    const hasAccess = await req.user.hasWarehouse(component.warehouseId);
    if (req.user.role !== 'Admin' && !hasAccess) {
      return res.status(403).json({ error: 'Forbidden: You do not have access to this component\'s logs.' });
    }

    const logs = await ComponentLog.findAll({
      where: { componentId: req.params.id },
      include: [{ model: User, as: 'User', attributes: ['username'] }]
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};