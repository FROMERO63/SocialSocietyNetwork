const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
  } = require('../../controllers/userController');

  router.route('/').get(getThoughts).post(createThought);

  router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

  router.route('/:thoughtId/reaction').post(addReaction);

  router.route('/:userId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;