// routes/componentRoutes.js
const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');

// --- THIS IS THE CORRECTED LINE ---
const authenticateToken = require('../middleware/auth'); 
// ---------------------------------

// Apply authentication to all component routes
router.use(authenticateToken);

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