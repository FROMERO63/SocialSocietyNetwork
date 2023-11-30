const User = require('../models/User');

module.exports = {
    //get all users
    async getUsers(req, res) {
      try {
        const users = await User.find()
        .select('-__v')
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    //get a single user by id
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('thoughts')
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a new user
    async createUser(req, res) {
      try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    //update user by finding by id and updating with the set to the req.body, returning new
    async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            {_id:req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
          );
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      //deletes user by id
      async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
      
            if (!user) {
              return res.status(404).json({ message: 'No user with that ID' });
            }
      //deletes assocaited thoughts
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: `${user} and associated thoughts are deleted!` })
        } catch (err) {
          res.status(500).json(err);
        }
      },
      //adds a friend by searching user id and friend id and using those as params
      async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
              {_id:req.params.userId},
              //add to set adds the friend to the list by id
              {$addToset: {friends: {_id: req.params.friendId}}},
              {runValidators: true, new: true}
            );
            res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      //deletes a friend by first looking up the user
      async deleteFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            //uses the $pull to remove friend by friendId from the search params
            { $pull: { friends: { _Id: req.params.friendId } } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }

          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
  };
  