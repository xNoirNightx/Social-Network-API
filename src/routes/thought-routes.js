const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../controllers/thought-controller');

// routes for thoughts ** organizing **
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

  router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// routes for reactions on thoughts
router.route('/:thoughtId/reactions')
  .post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);


// Test route
router.get('/', (req, res) => {
  console.log('Received a GET request for thoughts');
  res.send('Hello, world!');
});

  
module.exports = router;