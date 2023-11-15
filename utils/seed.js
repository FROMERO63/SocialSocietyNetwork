const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { users, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
  try{
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);
  }
  catch (err){
    res.status(500).json(err)
  }
});
