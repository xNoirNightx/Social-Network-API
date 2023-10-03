const { Thought } = require("../models/Thought");
const { User } = require("../models/User");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    console.log("Entering getAllThoughts controller"); // Added console.log
    Thought.find({})
      .then((thoughtData) => {
        console.log("Thoughts found:", thoughtData); // Added console.log
        res.json(thoughtData);
      })
      .catch((err) => {
        console.error("Error in getAllThoughts:", err); // Added console.error
        res.status(500).json(err);
      });
  },

  // single thought by id
  getThoughtById(req, res) {
    console.log("Entering getThoughtById controller"); // Added console.log
    const { thoughtId } = req.params;
    Thought.findById(thoughtId)
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.error("Error in getThoughtById:", err); // Added console.error
        res.status(500).json(err);
      });
  },

  // make a new thought
  createThought(req, res) {
    console.log("Entering createThought controller"); // Added console.log
    const { thoughtText, username, userId } = req.body;

    // Check if the user exists
    User.findById(userId)
      .then((user) => {
        if (!user) {
          console.log("User not found"); // Added console.log
          return res.status(404).json({ message: 'User not found' });
        }

        // Create a new thought
        return Thought.create({ thoughtText, username })
          .then((thoughtData) => {
            // created thought id to the users thoughts array
            user.thoughts.push(thoughtData._id);
            return user.save();
          })
          .then(() => {
            console.log("Thought created successfully"); // Added console.log
            res.json({ message: 'Thought created successfully', thoughtData });
          })
          .catch((err) => {
            console.error("Error in createThought:", err); // Added console.error
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.error("Error in createThought:", err); // Added console.error
        res.status(500).json(err);
      });
  },

  // update thought by id
  updateThought(req, res) {
    console.log("Entering updateThought controller"); // Added console.log
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
      .catch((err) => {
        console.error("Error in updateThought:", err); // Added console.error
        res.status(400).json(err);
      });
  },

  // delete a thought by id
  deleteThought(req, res) {
    console.log("Entering deleteThought controller"); // Added console.log
    const { thoughtId } = req.params;
    Thought.findByIdAndDelete(thoughtId)
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: "Thought not found" });
        }
        res.json({ message: "Thought deleted successfully" });
      })
      .catch((err) => {
        console.error("Error in deleteThought:", err); // Added console.error
        res.status(500).json(err);
      });
  },

  // adding reactions to thoughts js rather than separate them
  createReaction(req, res) {
    console.log("Entering createReaction controller"); // Added console.log
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
      .catch((err) => {
        console.error("Error in createReaction:", err); // Added console.error
        res.status(400).json(err);
      });
  },

  // remove a reaction on a thought
  deleteReaction(req, res) {
    console.log("Entering deleteReaction controller"); // Added console.log
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
      .catch((err) => {
        console.error("Error in deleteReaction:", err); // Added console.error
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
