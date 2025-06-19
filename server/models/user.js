const mongoose = require('mongoose');

// User schema and model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: { type: String, required: true },
  deleted: { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);

// CREATE a user
async function register(firstName, lastName, userName, email, password) {
// to check if userName and email provided are unique
  const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
  if (existingUser) {
    if (existingUser.userName === userName) throw Error('Username already in use');
    if (existingUser.email === email) throw Error('Email already in use');
  }
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password,
      deleted: false
    });
    return newUser;
  } catch (error) {
    throw Error('Failed to create user: ' + error.message);
  }
}

// READ a user
async function login(userName, password) {
// to check if userName and password provided are correct
  const user = await getUser(userName);
  if (!user) throw Error('User not found');
  if (user.password !== password) throw Error('Wrong Password');
  return user;
}

// UPDATE a user
async function updateUser(userId, password) {
// to find the user by userId and update his password
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { password } },
    { new: true }
  );
  if (!user) throw Error('User not found');
  return user;
}

// DELETE a user (soft delete)
async function deleteUser(userId) {
// to find the user by userId and set deleted to true for performing a soft delete
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { deleted: true } },
    { new: true }
  );
  if (!user) throw Error('User not found');
  return user;
}

// Utility function to find a user by userName
async function getUser(userName) {
  return await User.findOne({ userName });
}

module.exports = { register, login, updateUser, deleteUser };