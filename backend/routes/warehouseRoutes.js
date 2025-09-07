// routes/warehouseRoutes.js
const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const authMiddleware = require('../middleware/auth'); // Assuming you have auth middleware

// Define the routes
router.post('/', authMiddleware, warehouseController.createWarehouse);
router.get('/', authMiddleware, warehouseController.getAllWarehouses);

module.exports = router;