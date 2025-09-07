// backend/middleware/auth.js

const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Verifies JWT, loads user into req.user,
 * and attaches the list of warehouse IDs the user may access.
 */
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expects "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by primary key
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found, invalid token' });
    }

    // For non-admins, fetch their permitted warehouses
    if (user.role !== 'Admin') {
      // Sequelize mixin from User.belongsToMany(Warehouse)
      const userWarehouses = await user.getWarehouses({ attributes: ['id'] });
      // Flatten to an array of numeric IDs
      user.warehouses = userWarehouses.map(w => w.id);
    } else {
      // Admins can access all; optional to attach empty array or omit
      user.warehouses = [];
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token is not valid' });
  }
};

/**
 * Restricts route to users whose role is included in the given array.
 * Example: requireRole(['Admin', 'Manager'])
 */
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

/**
 * Blocks non-admins from creating/logging in warehouses they don't own.
 * Expects req.body.warehouseId or req.params.warehouseId to be set.
 */
const checkWarehousePermission = (req, res, next) => {
  const user = req.user;
  const targetWarehouseId = parseInt(req.body.warehouseId || req.params.warehouseId, 10);

  // Admin bypass
  if (user.role === 'Admin') {
    return next();
  }

  const allowed = user.warehouses || [];
  if (!allowed.includes(targetWarehouseId)) {
    return res
      .status(403)
      .json({ error: 'Forbidden: no access to this warehouse' });
  }

  next();
};

// Default export: authentication middleware
module.exports = authenticateToken;

// Named exports for role and warehouse checks
module.exports.requireRole = requireRole;
module.exports.checkWarehousePermission = checkWarehousePermission;