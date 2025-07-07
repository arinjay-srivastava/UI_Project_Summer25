const express = require('express');
const { register, login, updateUser, deleteUser } = require('../models/user');
const router = express.Router();

// CREATE a user
router.post('/register', async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  try {
    const user = await register(firstName, lastName, userName, email, password);
    return res.json({ message: 'Account registered', user });
  } catch (error) {
    console.error("REGISTER ERROR:", error.message);
    return res.status(400).json({ message: error.message });
  }
});

// READ a user (login)
router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await login(userName, password);
    return res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    return res.status(400).json({ message: error.message });
  }
});

// UPDATE a user
router.put('/update', async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await updateUser(userId, password);
    return res.json({ message: 'Password updated', user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// DELETE a user
router.delete('/delete', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await deleteUser(userId);
    return res.json({ message: 'Account deleted', user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
