const { User } = require('../models/User');

const userController = {


  // all users with their thoughts
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  // user by id with thoughts and friends
  getUserById(req, res) {
    const { userId } = req.params;
    User.findById(userId)
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // new user
  createUser(req, res) {
    const { username, email } = req.body;
    User.create({ username, email })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  // update user byid
  updateUser(req, res) {
    const { userId } = req.params;
    const { username, email } = req.body;
    User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // remove  user by id
  deleteUser(req, res) {
    const { userId } = req.params;
    User.findByIdAndDelete(userId)
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        // remove user's thoughts *****(bonus)*****
        return Thought.deleteMany({ username: userData.username });
      })
      .then(() => res.json({ message: 'User and associated thoughts deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  // add friend tofriend list
  addFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  }, 

  // remove friend from friend list
  removeFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
