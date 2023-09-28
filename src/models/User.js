const mongoose = require('mongoose');
const Thought = require('./Thought');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// calculate the friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


// bonus trigger 
userSchema.pre('remove', function (next) {
  // all thoughts by this user to remove them 
  Thought.deleteMany({ userId: this._id })
    .then(() => next())
    .catch(next);
});

const User = mongoose.model('User', userSchema);

module.exports = { User };