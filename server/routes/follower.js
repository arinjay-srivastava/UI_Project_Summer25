const express = require('express');
const { followUser, unfollowUser, getFollowerCount } = require('../models/follower');
const router = express.Router();

// FOLLOW a user
router.post('/follow', async (req, res) => {
  const { userId, followingId } = req.body;
  try {
    const follow = await followUser(userId, followingId);
    res.send({ message: 'User followed', follow });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// UNFOLLOW a user
router.delete('/unfollow', async (req, res) => {
  const { userId, followingId } = req.body;
  try {
    const follow = await unfollowUser(userId, followingId);
    res.send({ message: 'User unfollowed', follow });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// GET follower count
router.post('/count', async (req, res) => {
  const { userId } = req.body;
  try {
    const countData = await getFollowerCount(userId);
    res.send({ message: 'Follower count retrieved', count: countData.count });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// There's no UPDATE function for followers, as following/unfollowing can be done by CREATE and DELETE functions.
module.exports = router;