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

// organizing this better for routes it was ugly before 
router.route('/')
  .get(getAllUsers) 
  .post(createUser); 

router.route('/:userId')
  .get(getUserById) 
  .put(updateUser) 
  .delete(deleteUser); 

router.route('/:userId/friends/:friendId')
  .post(addFriend) 
  .delete(removeFriend); 

module.exports = router;