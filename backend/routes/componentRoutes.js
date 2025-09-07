const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');
const authenticateToken = require('../middleware/auth');
const { checkWarehousePermission } = require('../middleware/auth');

// Apply authentication to all component routes
router.use(authenticateToken);

// CRUD
router.post(
  '/',
  checkWarehousePermission,
  componentController.createComponent
);
router.get('/', componentController.getAllComponents);
router.get('/:id', componentController.getComponentById);
router.put('/:id', componentController.updateComponent);
router.delete('/:id', componentController.deleteComponent);

// Logs
router.post(
  '/:id/logs',
  checkWarehousePermission,
  componentController.addLog
);
router.get('/:id/logs', componentController.getLogs);

module.exports = router;