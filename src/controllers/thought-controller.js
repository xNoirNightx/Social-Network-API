const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // single thought by id
  getThoughtById(req, res) {
    const { thoughtId } = req.params;
    Thought.findById(thoughtId)
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // make a new thought
  createThought(req, res) {
    const { thoughtText, username, userId } = req.body;
    Thought.create({ thoughtText, username })
      .then((thoughtData) => {
        // Push the created thought's _id to the associated user's thoughts array
        return User.findByIdAndUpdate(userId, { $push: { thoughts: thoughtData._id } }, { new: true });
      })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Thought created successfully', thoughtData });
      })
      .catch((err) => res.status(400).json(err));
  },

  // update thought by id
  updateThought(req, res) {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;
    Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

    // delete a thought by id
    deleteThought(req, res) {
        const { thoughtId } = req.params;
        Thought.findByIdAndDelete(thoughtId)
          .then((thoughtData) => {
            if (!thoughtData) {
              return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({ message: 'Thought deleted successfully' });
          })
          .catch((err) => res.status(500).json(err));
      },
    
      // adding reactions to thoughts js rather than seperate them
      createReaction(req, res) {
        const { thoughtId } = req.params;
        const { reactionBody, username } = req.body;
    
        Thought.findByIdAndUpdate(
          thoughtId,
          { $push: { reactions: { reactionBody, username } } },
          { new: true, runValidators: true }
        )
          .then((thoughtData) => {
            if (!thoughtData) {
              return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thoughtData);
          })
          .catch((err) => res.status(400).json(err));
      },
    
      // remove a reaction on a thought
      deleteReaction(req, res) {
        const { thoughtId, reactionId } = req.params;
    
        Thought.findByIdAndUpdate(
          thoughtId,
          { $pull: { reactions: { _id: reactionId } } },
          { new: true }
        )
          .then((thoughtData) => {
            if (!thoughtData) {
              return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thoughtData);
          })
          .catch((err) => res.status(500).json(err));
      },
    };
    
    module.exports = thoughtController;