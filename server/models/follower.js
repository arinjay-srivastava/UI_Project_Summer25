const mongoose = require('mongoose');

// Follower schema and model
const followerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User being followed
  followingId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who is following
  deleted: { type: Boolean, default: false }
});

const Follower = mongoose.model('Follower', followerSchema);

// CREATE a follow relationship
async function followUser(userId, followingId) {
// to check if user 1 is already following user 2
  const existingFollow = await Follower.findOne({ userId, followingId, deleted: false });
  if (existingFollow) throw Error('Already following this user');
// to check if user 1 exists
  const user = await mongoose.model('User').findById(userId);
  if (!user || user.deleted) throw Error('User not found');
// to check if user 2 exists  
  const follower = await mongoose.model('User').findById(followingId);
  if (!follower || follower.deleted) throw Error('Follower not found');
// to make user 1 follow user 2
  const follow = await Follower.create({ userId, followingId, deleted: false });
  return follow;
}

// DELETE a follow relationship (soft delete)
async function unfollowUser(userId, followingId) {
// to check if user 1 is following user 2 and then removing the follow by setting deleted to true
  const follow = await Follower.findOneAndUpdate(
    { userId, followingId, deleted: false },
    { $set: { deleted: true } },
    { new: true }
  );
  if (!follow) throw Error('Follow relationship not found');
  return follow;
}

// READ/GET follower count for a user
async function getFollowerCount(userId) {
// to check if user 1 exists
  const user = await mongoose.model('User').findById(userId);
  if (!user || user.deleted) throw Error('User not found');
// to count the number of followers for user 1
  const count = await Follower.countDocuments({ userId, deleted: false });
  return { userId, count };
}

module.exports = { followUser, unfollowUser, getFollowerCount };