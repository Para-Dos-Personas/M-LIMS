const { Component, ComponentLog } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/db');

// Helper function to create a where clause for filtering by warehouse
const getWarehouseFilter = (warehouseId) => {
  let whereClause = {};
  if (warehouseId && warehouseId !== 'all') {
    whereClause.warehouseId = warehouseId;
  }
  return whereClause;
};

// Get inward statistics
exports.getInwardStats = async (req, res) => {
  try {
    const { month, warehouseId } = req.query;
    if (!month) {
      return res.status(400).json({ error: 'Month query parameter is required.' });
    }
    const componentWhereClause = getWarehouseFilter(warehouseId);

    const startDate = new Date(`${month}-01T00:00:00Z`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59);

    const inwardLogs = await ComponentLog.findAll({
      where: { changeType: 'inward', createdAt: { [Op.between]: [startDate, endDate] } },
      include: [{ model: Component, as: 'Component', attributes: ['name'], where: componentWhereClause, required: true }]
    });

    const totalInward = inwardLogs.reduce((sum, log) => sum + log.quantity, 0);
    const uniqueComponents = [...new Set(inwardLogs.map(log => log.componentId))].length;
    res.json({ totalInward, uniqueComponents, logs: inwardLogs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inward stats', details: error.message });
  }
};

// Get outward statistics
exports.getOutwardStats = async (req, res) => {
  try {
    const { month, warehouseId } = req.query;
    if (!month) {
      return res.status(400).json({ error: 'Month query parameter is required.' });
    }
    const componentWhereClause = getWarehouseFilter(warehouseId);
    
    const startDate = new Date(`${month}-01T00:00:00Z`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59);

    const outwardLogs = await ComponentLog.findAll({
      where: { changeType: 'outward', createdAt: { [Op.between]: [startDate, endDate] } },
      include: [{ model: Component, as: 'Component', attributes: ['name'], where: componentWhereClause, required: true }]
    });

    const totalOutward = outwardLogs.reduce((sum, log) => sum + log.quantity, 0);
    const uniqueComponents = [...new Set(outwardLogs.map(log => log.componentId))].length;
    res.json({ totalOutward, uniqueComponents, logs: outwardLogs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch outward stats', details: error.message });
  }
};


// Get low stock components
exports.getLowStock = async (req, res) => {
  try {
    const { warehouseId } = req.query;
    const whereClause = getWarehouseFilter(warehouseId);
    whereClause.quantity = { [Op.lte]: sequelize.col('criticalThreshold') };

    const components = await Component.findAll({ where: whereClause, order: [['quantity', 'ASC']] });
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch low stock', details: error.message });
  }
};

// Get old stock components
exports.getOldStock = async (req, res) => {
  try {
    const { warehouseId } = req.query;
    const whereClause = getWarehouseFilter(warehouseId);
    
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    whereClause.manufactureDate = { [Op.lt]: oneYearAgo };

    const components = await Component.findAll({ where: whereClause, order: [['manufactureDate', 'ASC']] });
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch old stock', details: error.message });
  }
};

// Get expired stock components
exports.getExpiredStock = async (req, res) => {
  try {
    const { warehouseId } = req.query;
    const whereClause = getWarehouseFilter(warehouseId);
    whereClause.expiryDate = { [Op.lt]: new Date() };

    const components = await Component.findAll({ where: whereClause, order: [['expiryDate', 'ASC']] });
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expired stock', details: error.message });
  }
};
