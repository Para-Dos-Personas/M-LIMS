const db = require('../models');
const { Component, ComponentLog, User } = db;

// Create a component
exports.createComponent = async (req, res) => {
  try {
    const component = await Component.create(req.body);
    res.status(201).json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create component', details: error.message });
  }
};

// Get all components
exports.getAllComponents = async (req, res) => {
  try {
    const components = await Component.findAll();
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch components' });
  }
};

// Get component by ID
exports.getComponentById = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });
    res.json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch component' });
  }
};

// Update component
exports.updateComponent = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });

    await component.update(req.body);
    res.json(component);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update component' });
  }
};

// Delete component
exports.deleteComponent = async (req, res) => {
  try {
    const component = await Component.findByPk(req.params.id);
    if (!component) return res.status(404).json({ error: 'Component not found' });

    await component.destroy();
    res.json({ message: 'Component deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete component' });
  }
};

// Add a component log (inward/outward)
exports.addLog = async (req, res) => {
  try {
    const { changeType, quantity, reason, project, userId } = req.body;
    const componentId = parseInt(req.params.id, 10);
    const parsedQuantity = parseInt(quantity, 10);
    const parsedUserId = parseInt(userId, 10);

    // Basic validation
    if (
      Number.isNaN(componentId) ||
      Number.isNaN(parsedQuantity) ||
      Number.isNaN(parsedUserId) ||
      !['inward', 'outward'].includes(changeType)
    ) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const component = await Component.findByPk(componentId);
    if (!component) return res.status(404).json({ error: 'Component not found' });

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
      userId: parsedUserId,
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
    const logs = await ComponentLog.findAll({
      where: { componentId: req.params.id },
      include: [{ model: User, as: 'user', attributes: ['username'] }]
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};