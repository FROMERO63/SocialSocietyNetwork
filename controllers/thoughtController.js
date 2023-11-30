const {User,Thought,Reaction} = require('../models');

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find()
        .populate('reactions');
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    //get a thought user by id
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .populate('reactions');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a new user
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
              { username: req.body.username },
              { $addToSet: { thoughts: thought._id } },
              { new: true }
            );
      
            if (!user) {
              return res.status(404).json({
                message: 'Application created, but found no user with that ID',
              })
            }
      
            res.json(`Created the ${thought}`);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    //update thought by finding by id and updating with the set to the req.body, returning new
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $set: req.body },
              { runValidators: true, new: true }
            );
      
            if (!thought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
      
            res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      //deletes user by id
      async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
            if (!thought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            const user = await User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            );
            if (!user) {
              return res.status(404).json({
                message: 'Thought deleted but no user with this id!',
              });
            }
            res.json({ message: `${thought} successfully deleted!` });
        } catch (err) {
          res.status(500).json(err);
        }
      },
      //adds a friend by searching user id and friend id and using those as params
      async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
              {_id:req.params.thoughtId},
              //add to set adds the reaction to the list with the req.body input
              {$addToset: {reactions: req.body}},
              {runValidators: true, new: true}
            );
            res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      //deletes a reaction by first looking up the thought
      async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $pull: { reactions: { reactionId: req.params.reactionId } } },
              { runValidators: true, new: true }
            );
      
            if (!thought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
  };
  