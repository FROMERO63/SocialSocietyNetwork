const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        maxlength: 280,
        minlength: 1, 
        required: true
    },
    username: {
        type: String,
        required: true
    },
    reactions: 
        [Reaction],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

  //virtual getter for reaction count
  thoughtSchema
    .virtual('reactionCount')
    .get(function () {
      return this.reactions.length;
    });
  
  const Thought = model('thought', thoughtSchema);
  
  module.exports = Thought;