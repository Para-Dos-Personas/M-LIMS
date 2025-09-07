const express = require('express');
const router = express.Router();
const { ComponentLog, Component, User } = require('../models');
const  authenticateToken  = require('../middleware/auth');

// Apply authentication to all log routes
router.use(authenticateToken);

// Get all logs with component and user details
router.get('/', async (req, res) => {
  try {
    const logs = await ComponentLog.findAll({
      include: [
        {
          model: Component,
          as: 'Component',
          attributes: ['id', 'name', 'partNumber']
        },
        {
          model: User,
          as: 'User',
          attributes: ['id', 'username']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 100 // Limit to last 100 logs for performance
    });

    res.json(logs);
  } catch (error) {
    console.error('Get all logs error:', error);
    res.status(500).json({ error: 'Failed to fetch logs', details: error.message });
  }
});

// Get logs with pagination
router.get('/paginated', async (req, res) => {
  try {
    const { page = 1, limit = 20, componentId, changeType } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (componentId) whereClause.componentId = componentId;
    if (changeType) whereClause.changeType = changeType;

    const { count, rows: logs } = await ComponentLog.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Component,
          as: 'Component',
          attributes: ['id', 'name', 'partNumber']
        },
        {
          model: User,
          as: 'User',
          attributes: ['id', 'username']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      logs,
      total: count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    console.error('Get paginated logs error:', error);
    res.status(500).json({ error: 'Failed to fetch logs', details: error.message });
  }
});

module.exports = router;
