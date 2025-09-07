// controllers/dashboardController.js
const { Component, ComponentLog, User } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/db');

// @desc    Get inward statistics for a specific month
exports.getInwardStats = async (req, res) => {
  try {
    const { month } = req.query; // e.g., "2025-08"
    if (!month) {
        return res.status(400).json({ error: 'Month query parameter is required in YYYY-MM format.' });
    }
    const startDate = new Date(`${month}-01T00:00:00Z`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59);

    const inwardLogs = await ComponentLog.findAll({
      where: {
        changeType: 'inward',
        createdAt: { [Op.between]: [startDate, endDate] },
      },
      include: [{ model: Component, as: 'Component', attributes: ['name'] }]
    });

    const totalInward = inwardLogs.reduce((sum, log) => sum + log.quantity, 0);
    const uniqueComponents = [...new Set(inwardLogs.map(log => log.componentId))].length;

    res.json({ totalInward, uniqueComponents, logs: inwardLogs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inward statistics', details: error.message });
  }
};

// @desc    Get outward statistics for a specific month
exports.getOutwardStats = async (req, res) => {
    try {
        const { month } = req.query; // e.g., "2025-08"
        if (!month) {
            return res.status(400).json({ error: 'Month query parameter is required in YYYY-MM format.' });
        }
        const startDate = new Date(`${month}-01T00:00:00Z`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59);
    
        const outwardLogs = await ComponentLog.findAll({
          where: {
            changeType: 'outward',
            createdAt: { [Op.between]: [startDate, endDate] },
          },
          include: [{ model: Component, as: 'Component', attributes: ['name'] }]
        });
    
        const totalOutward = outwardLogs.reduce((sum, log) => sum + log.quantity, 0);
        const uniqueComponents = [...new Set(outwardLogs.map(log => log.componentId))].length;
    
        res.json({ totalOutward, uniqueComponents, logs: outwardLogs });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch outward statistics', details: error.message });
      }
};

// @desc    Get all components that are low in stock
exports.getLowStock = async (req, res) => {
  try {
    const lowStockComponents = await Component.findAll({
      where: {
        quantity: {
          [Op.lte]: sequelize.col('criticalThreshold')
        }
      },
      order: [['quantity', 'ASC']],
    });
    res.json(lowStockComponents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch low stock components', details: error.message });
  }
};

// @desc    Get old stock components (based on manufactureDate, not createdAt)
exports.getOldStock = async (req, res) => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const oldStockComponents = await Component.findAll({
      where: {
        manufactureDate: {
          [Op.lt]: oneYearAgo
        }
      },
      order: [['manufactureDate', 'ASC']],
    });
    res.json(oldStockComponents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch old stock components', details: error.message });
  }
};

// @desc    Get expired stock components
exports.getExpiredStock = async (req, res) => {
    try {
        const today = new Date();

        const expiredComponents = await Component.findAll({
          where: {
            expiryDate: {
              [Op.lt]: today
            }
          },
          order: [['expiryDate', 'ASC']],
        });
        res.json(expiredComponents);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expired stock components', details: error.message });
      }
};