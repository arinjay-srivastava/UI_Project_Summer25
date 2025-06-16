//1. import mongoose
const mongoose = require('mongoose');

//2. create a schema for the user
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deleted: { type: Boolean, default: false },
});

//3. create a model from the schema
const User = mongoose.model('User', userSchema);

//4.CRUD functions for model
// CREATE a new user
async function register(username, password) {
    const user = await getUser(username);
    if (user) { throw new Error('Username already exists'); }

    const newUser = await User.create({
        userId: new mongoose.Types.ObjectId().toString(),
        userName: username,
        password: password,
        deleted: false
    });
}

//READ a user
async function login(userName, password) {
    const user = await getUser(userName); 
    if (!user) { throw new Error('User not found'); }
    if (user.password !== password) { throw new Error('Invalid password'); }    
    return user;
}

//UPDATE a user
async function updateUser(userId, password) {
    const user = await User.findOneAndUpdate({"_id": userId }, { $set: { password: password } }, { new: true });
    return user;
}

//DELETE a user
async function deleteUser(userId) {
    const user = await User.deleteOne({"_id": userId }, { $set: { deleted: true } }, { new: true });
   if (!user) { throw new Error('User not found'); }
   return user;
}

//Utility function to get a user by username
async function getUser(username){
    return await User.findOne({ userName: username })
}


//Export the model and functions
module.exports = {User, login, register, getUser, updateUser, deleteUser};