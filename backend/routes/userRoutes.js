const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  console.log('▶ [POST /register] body:', req.body);

  try {
    const { username, password, role = 'User' } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await User.create({ 
      username, 
      password: hashedPassword, 
      role 
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role
    };

    return res.status(201).json({ 
      message: 'User registered successfully',
      token,
      user: userResponse
    });
  } catch (err) {
    console.error('✖ [POST /register] error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log('▶ [POST /login] body:', req.body);

  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const userResponse = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    return res.json({ 
      message: 'Login successful',
      token,
      user: userResponse
    });
  } catch (err) {
    console.error('✖ [POST /login] error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Get current user profile (protected route)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userResponse = {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role
    };
    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Get all users (admin only)
router.get('/', authenticateToken, requireRole(['Admin']), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'role', 'createdAt', 'updatedAt']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user role (admin only)
router.put('/:id/role', authenticateToken, requireRole(['Admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate role
    if (!['User', 'Admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be User or Admin' });
    }

    // Find user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent admin from changing their own role to User if they're the last admin
    if (req.user.id === parseInt(id) && role === 'User') {
      const adminCount = await User.count({ where: { role: 'Admin' } });
      if (adminCount === 1) {
        return res.status(400).json({ error: 'Cannot demote the last admin user' });
      }
    }

    // Update role
    await user.update({ role });

    res.json({ 
      message: 'User role updated successfully',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, requireRole(['Admin']), async (req, res) => {
  try {
    const { id } = req.params;

    // Find user
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (req.user.id === parseInt(id)) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    // Prevent deleting the last admin
    if (user.role === 'Admin') {
      const adminCount = await User.count({ where: { role: 'Admin' } });
      if (adminCount === 1) {
        return res.status(400).json({ error: 'Cannot delete the last admin user' });
      }
    }

    // Delete user
    await user.destroy();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Create new user (admin only)
router.post('/create', authenticateToken, requireRole(['Admin']), async (req, res) => {
  try {
    const { username, password, role = 'User' } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    if (!['User', 'Admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be User or Admin' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await User.create({ 
      username, 
      password: hashedPassword, 
      role 
    });

    // Return user data without password
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
      createdAt: newUser.createdAt
    };

    res.status(201).json({ 
      message: 'User created successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

module.exports = router;