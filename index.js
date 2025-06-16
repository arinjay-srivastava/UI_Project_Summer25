require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./server/routes/user'); // Import user routes

mongoose.connect(process.env.dBUrl).then(console.log("Connected to MongoDB!!")).catch(err => console.log(err));

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
    });

    app.use(express.static(path.join(__dirname, 'public')));
    app.get('/', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'index.html'));});

    app.use('/api/user', userRoutes); // Use user routes under /api/user

    const PORT = process.env.PORT || 3000; 
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    