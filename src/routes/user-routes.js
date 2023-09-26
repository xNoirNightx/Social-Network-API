const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../controllers/user-controller');

// routes for users
router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// routes for users friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;