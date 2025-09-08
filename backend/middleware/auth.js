// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Verifies JWT and loads user into req.user
 */
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expects "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Load user by PK. Make sure your User model includes
    // a `warehouses` array or association if you plan to use it later.
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found, invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token is not valid' });
  }
};

/**
 * Restricts route to users whose role is in `roles`
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
 * Blocks non-admins from POSTing to warehouses they don't own
 * Assumes `req.body.warehouseId` or `req.params.warehouseId` is set
 */
const checkWarehousePermission = (req, res, next) => {
  const user = req.user;
  const targetWarehouseId = req.body.warehouseId || req.params.warehouseId;

  // Admin bypass
  if (user.role === 'admin') {
    return next();
  }

  // Ensure user.warehouses is an array of IDs you populated at login
  const allowed = user.warehouses || [];
  if (!allowed.includes(targetWarehouseId)) {
    return res
      .status(403)
      .json({ error: 'Forbidden: no access to this warehouse' });
  }
  next();
};

// Export all functions using object syntax for destructuring
module.exports = {
  authenticateToken,
  requireRole,
  checkWarehousePermission
};