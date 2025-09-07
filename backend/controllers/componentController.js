// backend/controllers/componentController.js
const db = require('../models');
const { Component, ComponentLog, User } = db;

// Helper: admins or assigned users only
const canEditWarehouse = async (user, warehouseId) => {
  if (user.role === 'Admin') return true;
  return await user.hasWarehouse(warehouseId);
};

exports.createComponent = async (req, res) => {
  try {
    const { warehouseId } = req.body;
    if (!warehouseId) {
      return res.status(400).json({ error: 'warehouseId is required.' });
    }
    const hasPermission = await canEditWarehouse(req.user, warehouseId);
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: no permission for this warehouse.' });
    }
    const component = await Component.create(req.body);
    res.status(201).json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create component', details: error.message });
  }
};

exports.getAllComponents = async (req, res) => {
  try {
    const whereClause = {};
    const wid = parseInt(req.query.warehouseId, 10);
    if (!isNaN(wid)) {
      whereClause.warehouseId = wid;
    }
    const components = await Component.findAll({ where: whereClause });
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch components' });
  }
};

exports.getComponentById = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });
    res.json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch component' });
  }
};

exports.updateComponent = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });
    const hasPermission = await canEditWarehouse(req.user, component.warehouseId);
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: no permission for this warehouse.' });
    }
    await component.update(req.body);
    res.json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update component', details: error.message });
  }
};

exports.deleteComponent = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });
    const hasPermission = await canEditWarehouse(req.user, component.warehouseId);
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: no permission for this warehouse.' });
    }
    await component.destroy();
    res.json({ message: 'Component deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete component' });
  }
};

exports.addLog = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });
    const hasPermission = await canEditWarehouse(req.user, component.warehouseId);
    if (!hasPermission) {
      return res.status(403).json({ error: 'Forbidden: no permission for this warehouse.' });
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
      componentId: component.id,
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add log', details: error.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await ComponentLog.findAll({
      where: { componentId: req.params.id },
      include: [{ model: User, as: 'User', attributes: ['username'] }],
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};