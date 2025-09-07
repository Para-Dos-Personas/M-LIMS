// controllers/userController.js
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/users/register
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
      role: role || 'User', // Defaults to 'User' if no role is provided
    });

    const { password: _, ...userWithoutPassword } = user.get({ plain: true });
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration', details: error.message });
  }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/users/login
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

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token: `Bearer ${token}`,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
};

// You can add more functions here later, like getUserProfile