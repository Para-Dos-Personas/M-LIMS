// controllers/userController.js
const { User, Warehouse } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user (Public)
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      role: role && req.user?.role === 'Admin' ? role : 'User',
    });

    const { password: _, ...userWithoutPassword } = user.get({ plain: true });
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration', details: error.message });
  }
};

// @desc    Authenticate user & get token (Login - Public)
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = { id: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token: `Bearer ${token}`,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
};

// @desc    Get current user's profile (Authenticated Users)
exports.getUserProfile = async (req, res) => {
  const { password, ...userWithoutPassword } = req.user.get({ plain: true });
  res.json(userWithoutPassword);
};

// @desc    Get all users (Admin Only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'role', 'createdAt', 'updatedAt'],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// @desc    Update a user's role (Admin Only)
exports.updateUserRole = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { role } = req.body;
    if (!['Admin', 'User'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role specified' });
    }

    user.role = role;
    await user.save();

    const { password, ...userWithoutPassword } = user.get({ plain: true });
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role' });
  }
};

// @desc    Delete a user (Admin Only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.id === req.user.id) {
      return res.status(400).json({ error: "Admins cannot delete their own account." });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// @desc    Get warehouses accessible by the logged-in user
// @route   GET /api/users/warehouses
exports.getAccessibleWarehouses = async (req, res) => {
  try {
    const user = req.user;
    let warehouses;

    if (user.role === 'Admin') {
      warehouses = await Warehouse.findAll({ order: [['name', 'ASC']] });
    } else {
      warehouses = await user.getWarehouses({ order: [['name', 'ASC']] });
    }

    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user warehouses', details: error.message });
  }
};