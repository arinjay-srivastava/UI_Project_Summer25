const express = require("express");
const mongoose = require("mongoose");
const { register, login, updateUser, deleteUser } = require('../models/user');
const router = express.Router();

router
  .post('/login', async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).send({ message: 'Request body is missing' });
      }
      const { userName, password } = req.body;
      if (!userName || !password) {
        return res.status(400).send({ message: 'Username and password are required' });
      }
      const user = await login(userName, password);
      res.send({ message: 'Login successful', ...user, password: undefined });
    } catch (error) {
      console.log('Login error:', error);
      res.status(error.message.includes('not found') ? 401 : 400).send({ message: error.message });
    }
  })

  .post('/register', async (req, res) => {
    try {
      console.log('Register request body:', req.body);
      if (!req.body) {
        return res.status(400).send({ message: 'Request body is missing' });
      }
      const { firstName, lastName, userName, email, password } = req.body;
      if (!firstName || !lastName || !userName || !email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
      }
      const user = await register(firstName, lastName, userName, email, password);
      res.send({ message: 'Account registered', ...user, password: undefined });
    } catch (error) {
      console.log('Register error:', error);
      res.status(error.message.includes('already in use') ? 401 : 400).send({ message: error.message });
    }
  })

  .put('/update', async (req, res) => {
    try {
      console.log('Update request body:', req.body);
      if (!req.body) {
        return res.status(400).send({ message: 'Request body is missing' });
      }
      const { userId, password } = req.body;
      if (!userId || !password) {
        return res.status(400).send({ message: 'User ID and password are required' });
      }
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).send({ message: 'Invalid user ID format' });
      }
      const user = await updateUser(userId, password);
      res.send({ message: 'Password updated', ...user, password: undefined });
    } catch (error) {
      console.log('Update error:', error);
      res.status(error.message.includes('not found') ? 401 : 400).send({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      console.log('Delete request body:', req.body);
      if (!req.body) {
        return res.status(400).send({ message: 'Request body is missing' });
      }
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).send({ message: 'User ID is required' });
      }
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).send({ message: 'Invalid user ID format' });
      }
      const user = await deleteUser(userId);
      res.send({ message: 'Account deleted', ...user, password: undefined });
    } catch (error) {
      console.log('Delete error:', error);
      res.status(error.message.includes('not found') ? 401 : 400).send({ message: error.message });
    }
  });

module.exports = router;