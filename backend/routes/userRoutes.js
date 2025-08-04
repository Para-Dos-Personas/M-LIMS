const express = require('express');
const router = express.Router();
const { User } = require('../models'); 
// … other imports (e.g. bcrypt, JWT, etc.)

// Register
router.post('/register', async (req, res) => {
  console.log('▶ [POST /register] body:', req.body);

  try {
    const { username, password, role } = req.body;
    // … your existing registration logic
    const newUser = await User.create({ username, password, role });
    return res.status(201).json(newUser);
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
    // … your existing authentication logic
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    // … password check, token generation, etc.
    return res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error('✖ [POST /login] error:', err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;