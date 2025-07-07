require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.sendStatus(200);
});

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')));

const userRoutes = require('./server/routes/user');
app.use('/api/user', userRoutes);
const noteRoutes = require('./server/routes/note');
app.use('/api/note', noteRoutes);
const followerRoutes = require('./server/routes/follower');
app.use('/api/follower', followerRoutes);

app.use((req, res) => {
  res.status(404).send({ message: `Route ${req.method} ${req.url} not found` });
});

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("DB Connected!!"))
  .catch(error => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));