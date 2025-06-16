require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');

// Parse JSON bodies first
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});


app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public', 'index.html')));

const userRoutes = require('./server/routes/user');
const noteRoutes = require('./server/routes/note');
app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);


app.use((req, res) => {
  res.status(404).send({ message: `Route ${req.method} ${req.url} not found` });
});

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("DB Connected!!"))
  .catch(error => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));