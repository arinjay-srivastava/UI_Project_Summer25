//1. import mongoose
const mongoose = require('mongoose');

//2. create a schema for the user

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deleted: { type: Boolean, default: false },
});

// 3. create model of schema
const User = mongoose.model("User", userSchema);

// 4. create CRUD functions on model
//CREATE a user
async function register(username, password) {
  const user = await getUser(username);
  if(user) throw Error('Username already in use');

  const newUser = await User.create({
    username: username,
    password: password
  });

  return newUser;
}

// READ a user
async function login(username, password) {
  const user = await getUser(username);
  if(!user) throw Error('User not found');
  if(user.password != password) throw Error('Wrong Password');

  return user;
}

// UPDATE
async function updatePassword(id, password) {
  const user = await User.updateOne({"_id": id}, {$set: { password: password}});
  return user;
}

//DELETE
async function deleteUser(id) {
  await User.deleteOne({"_id": id});
};

// utility functions
async function getUser(username) {
  return await User.findOne({ "username": username});
}

// 5. export all functions we want to access in route files
module.exports = { 
  register, login, updatePassword, deleteUser 
};