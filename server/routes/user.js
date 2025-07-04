const express = require('express');
const mongoose = require('mongoose');
const { register, login, updateUser, deleteUser } = require('../models/user');
const router = express.Router();

// CREATE a user
router.post('/register', async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  try {
    const user = await register(firstName, lastName, userName, email, password);
    res.send({ message: 'Account registered', user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// READ a user (login)
router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await login(userName, password); // Use model’s login function
    res.send({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// UPDATE a user
router.put('/update', async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await updateUser(userId, password);
    res.send({ message: 'Password updated', user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// DELETE a user
router.delete('/delete', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await deleteUser(userId);
    res.send({ message: 'Account deleted', user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;