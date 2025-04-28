import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Register new admin
router.post('/register', async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    const newUser = new User({ email, password, isAdmin });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error creating user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: 'Login successful', isAdmin: user.isAdmin });
    } else {
      res.status(400).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;