const voteEventRouter = require('express').Router();
const { authenticateUser } = require('../middleware');
const {
  getVoteEventsController,
  createVoteEventController,
  getVoteEventByIdController,
  voteCandidateController,
} = require('./voteEvents.controller');
const {
  validateVoteEventBody,
  validateVoteCandidateBody,
} = require('./voteEvents.middleware');

voteEventRouter.get('/', (_req, res) => {
  res.json({ voteEventroute: 'ok' });
});

// create a voting event
voteEventRouter.post(
  '/',
  authenticateUser,
  validateVoteEventBody,
  createVoteEventController,
);

// get all active voting events
voteEventRouter.get('/active', authenticateUser, getVoteEventsController);

// get a voting event by id
voteEventRouter.get('/:id', authenticateUser, getVoteEventByIdController);

// vote a candidate
voteEventRouter.post(
  '/:id/vote',
  authenticateUser,
  validateVoteCandidateBody,
  voteCandidateController,
);

module.exports = voteEventRouter;
