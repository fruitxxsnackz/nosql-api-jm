const { Schema, model } = require('mongoose');
const dateformats = require('../dateformats');

const thoughtschema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      validate: {
        validator: function(text) {
          return text.length > 0 && text.length <= 280; },
        message: 'Thoughts must be 1 to 280 characters long',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateformats(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true, 
    },
    id: false,
  }
);

thoughtschema.virtual('reactions').get(function() {
  return this.reactions.length; });

const Thought = model('Thought', thoughtschema);
module.exports = Thought;