const express = require('express');
const router = express.Router();
const { Component, ComponentLog } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { Op } = require('sequelize');
const sequelize = require('../config/db');

// Apply authentication to all dashboard routes
router.use(authenticateToken);

// Debug route to check all components and their quantities
router.get('/debug/components', async (req, res) => {
  try {
    console.log('Debug: Fetching all components...');
    
    const allComponents = await Component.findAll({
      order: [['quantity', 'ASC']]
    });

    const lowStockComponents = allComponents.filter(c => c.quantity <= c.criticalThreshold);
    
    const debugInfo = {
      totalComponents: allComponents.length,
      lowStockComponents: lowStockComponents.length,
      allComponents: allComponents.map(c => ({
        id: c.id,
        name: c.name,
        quantity: c.quantity,
        criticalThreshold: c.criticalThreshold,
        location: c.location
      })),
      lowStockItems: lowStockComponents.map(c => ({
        id: c.id,
        name: c.name,
        quantity: c.quantity,
        criticalThreshold: c.criticalThreshold,
        location: c.location
      }))
    };

    console.log('Debug info:', debugInfo);
    res.json(debugInfo);
  } catch (error) {
    console.error('Debug components error:', error);
    res.status(500).json({ error: 'Failed to fetch debug info', details: error.message });
  }
});

// Get inward statistics for a specific month
router.get('/inward', async (req, res) => {
  try {
    const { month } = req.query;
    console.log('Dashboard inward request for month:', month);
    
    const startDate = new Date(month + '-01');
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    console.log('Date range:', startDate, 'to', endDate);

    const inwardLogs = await ComponentLog.findAll({
      where: {
        changeType: 'inward',
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [{
        model: Component,
        as: 'Component',
        attributes: ['name', 'partNumber']
      }]
    });

    console.log('Found inward logs:', inwardLogs.length);

    const totalInward = inwardLogs.reduce((sum, log) => sum + log.quantity, 0);
    const uniqueComponents = [...new Set(inwardLogs.map(log => log.componentId))].length;

    const response = {
      totalInward,
      uniqueComponents,
      logs: inwardLogs
    };

    console.log('Inward response:', response);
    res.json(response);
  } catch (error) {
    console.error('Dashboard inward error:', error);
    res.status(500).json({ error: 'Failed to fetch inward statistics', details: error.message });
  }
});

// Get outward statistics for a specific month
router.get('/outward', async (req, res) => {
  try {
    const { month } = req.query;
    console.log('Dashboard outward request for month:', month);
    
    const startDate = new Date(month + '-01');
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    console.log('Date range:', startDate, 'to', endDate);

    const outwardLogs = await ComponentLog.findAll({
      where: {
        changeType: 'outward',
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      },
      include: [{
        model: Component,
        as: 'Component',
        attributes: ['name', 'partNumber']
      }]
    });

    console.log('Found outward logs:', outwardLogs.length);

    const totalOutward = outwardLogs.reduce((sum, log) => sum + log.quantity, 0);
    const uniqueComponents = [...new Set(outwardLogs.map(log => log.componentId))].length;

    const response = {
      totalOutward,
      uniqueComponents,
      logs: outwardLogs
    };

    console.log('Outward response:', response);
    res.json(response);
  } catch (error) {
    console.error('Dashboard outward error:', error);
    res.status(500).json({ error: 'Failed to fetch outward statistics', details: error.message });
  }
});

// Get low stock components (quantity <= criticalThreshold)
router.get('/low-stock', async (req, res) => {
  try {
    console.log('Dashboard low stock request');
    
    // Use Sequelize literal to compare quantity with criticalThreshold
    const lowStockComponents = await Component.findAll({
      where: {
        quantity: {
          [Op.lte]: sequelize.col('criticalThreshold')
        }
      },
      order: [['quantity', 'ASC']]
    });

    console.log('Found low stock components:', lowStockComponents.length);
    console.log('Low stock items:', lowStockComponents.map(c => `${c.name}: ${c.quantity}/${c.criticalThreshold}`));
    res.json(lowStockComponents);
  } catch (error) {
    console.error('Dashboard low stock error:', error);
    res.status(500).json({ error: 'Failed to fetch low stock components', details: error.message });
  }
});

// Get old stock components (created more than 6 months ago)
router.get('/old-stock', async (req, res) => {
  try {
    console.log('Dashboard old stock request');
    
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const oldStockComponents = await Component.findAll({
      where: {
        createdAt: {
          [Op.lt]: sixMonthsAgo
        }
      },
      order: [['createdAt', 'ASC']]
    });

    console.log('Found old stock components:', oldStockComponents.length);
    res.json(oldStockComponents);
  } catch (error) {
    console.error('Dashboard old stock error:', error);
    res.status(500).json({ error: 'Failed to fetch old stock components', details: error.message });
  }
});

module.exports = router;
