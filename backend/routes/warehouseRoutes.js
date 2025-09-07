// routes/warehouseRoutes.js
const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, warehouseController.createWarehouse);
router.get('/', authMiddleware, warehouseController.getAllWarehouses);

module.exports = router;