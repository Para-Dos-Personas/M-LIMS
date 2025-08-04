const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');

// CRUD
router.post('/', componentController.createComponent);
router.get('/', componentController.getAllComponents);
router.get('/:id', componentController.getComponentById);
router.put('/:id', componentController.updateComponent);
router.delete('/:id', componentController.deleteComponent);

// Logs
router.post('/:id/logs', componentController.addLog);
router.get('/:id/logs', componentController.getLogs);

module.exports = router;
