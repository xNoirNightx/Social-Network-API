const { Thought } = require("../models/Thought");
const { User } = require("../models/User");

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
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // make a new thought
  createThought(req, res) {
    const { thoughtText, username, userId } = req.body;

    // Check if the user exists
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Create a new thought
        return Thought.create({ thoughtText, username })
          .then((thoughtData) => {
            // created thought id to the users thoughts array
            user.thoughts.push(thoughtData._id);
            return user.save();
          })
          .then(() => res.json({ message: 'Thought created successfully', thoughtData }))
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(500).json(err));
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
          return res.status(404).json({ message: "Thought not found" });
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
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json({ message: "Thought deleted successfully" });
      })
      .catch((err) => res.status(500).json(err));
  },

  // adding reactions to thoughts js rather than separate them
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
          return res.status(404).json({ message: "Thought not found" });
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
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
