const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  console.log("REGISTERING:", firstName, lastName, userName, email);

  const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
  if (existingUser) {
    console.log("User already exists");
    if (existingUser.userName === userName) throw Error('Username already in use');
    if (existingUser.email === email) throw Error('Email already in use');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      deleted: false
    });
    console.log("USER CREATED:", newUser);
    return newUser;
  } catch (error) {
    console.error("ERROR DURING REGISTRATION:", error);
    throw Error('Failed to create user: ' + error.message);
  }
}

// READ a user
async function login(userName, password) {
  const user = await getUser(userName);
  if (!user) throw Error('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw Error('Wrong Password');
  return user;
}

// UPDATE a user
async function updateUser(userId, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { password: hashedPassword } },
    { new: true }
  );
  if (!user) throw Error('User not found');
  return user;
}

// DELETE a user
async function deleteUser(userId) {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { deleted: true } },
    { new: true }
  );
  if (!user) throw Error('User not found');
  return user;
}

// Utility to get a user
async function getUser(userName) {
  return await User.findOne({ userName });
}

module.exports = { register, login, updateUser, deleteUser };
