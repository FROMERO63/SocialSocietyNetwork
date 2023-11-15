const { Schema, model } = require('mongoose');

//created the userSchema with required fields
const userSchema = new Schema(
    {
      username: {
        type: String, 
        trim: true, 
        required: true},
      email: {
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: function (value) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
          },
        },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
  //virtual getter for friend count
  userSchema
    .virtual('friendCount')
    .get(function () {
      return this.friends.length;
    });
  
  const User = model('user', userSchema);
  
  module.exports = User;