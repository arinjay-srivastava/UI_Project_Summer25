// 1. import needed libraries
const express = require('express');
const User = require('../models/user'); //Import all the functions from the user model
const router = express.Router();

// 2. define the routes

router
    .post('/login', async (req, res) => {
        try{
            const user = await User.login(req.body.userName, req.body.password);
            res.send({ message: 'Login successful', ...user, password: undefined}); 
        }
        catch (error) {
            console.error(error);
            res.status(401).send({ message: error.message });
        }
    })

    .post('/register', async (req, res) => {
        try {
            const user = await User.register(req.body.userName, req.body.password);
            res.send({ message: 'Account registered', ...user, password: undefined });
        } catch (error) {
            console.error(error);
            res.status(400).send({ message: error.message });
        }
    })
    .put('/update', async (req, res) => {
        try {
            const user = await User.updateUser(req.body.userId, req.body.password);
            res.send({ message: 'Password updated', ...user, password: undefined });
        } catch (error) {
            console.error(error);
            res.status(401).send({ message: error.message });
        }
    })

    .delete('/delete', async (req, res) => {
        try {
            const user = await User.deleteUser(req.body.userId);
            res.send({ message: 'Account deleted' });
        } catch (error) {
            console.error(error);
            res.status(401).send({ message: error.message });
        }
    })

// 3. export the router
module.exports = router;