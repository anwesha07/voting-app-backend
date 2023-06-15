const { asyncWrap } = require('../utils');
const { ForbiddenException } = require('../utils/exceptions');
const {
  getVoteEventsService,
  createVoteEventService,
  voteCandidateService,
  getVoteEventByIdService,
} = require('./voteEvents.service');

const getVoteEventsController = asyncWrap(async (_req, res) => {
  const voteEvents = await getVoteEventsService();
  res.json(voteEvents);
});

const createVoteEventController = asyncWrap(async (req, res) => {
  if (!req.user.isAdmin) throw new ForbiddenException('Not allowed!');
  // eslint-disable-next-line object-curly-newline
  const { name, startDate, endDate, candidates } = req.body;
  const newVoteEvent = await createVoteEventService(
    name,
    startDate,
    endDate,
    candidates,
  );
  res.status(201).json(newVoteEvent);
});

const getVoteEventByIdController = asyncWrap(async (req, res) => {
  const eventId = req.params.id;
  // eslint-disable-next-line no-underscore-dangle
  const userId = req.user._id;
  const voteEvent = await getVoteEventByIdService(eventId, userId);
  res.json(voteEvent);
});

const voteCandidateController = asyncWrap(async (req, res) => {
  const candidateId = req.body.candidate;
  // eslint-disable-next-line no-underscore-dangle
  const userId = req.user._id;
  const eventId = req.params.id;
  await voteCandidateService(candidateId, userId, eventId);
  res.status(201).json({ message: 'Vote casted successfully' });
});

module.exports = {
  getVoteEventsController,
  createVoteEventController,
  getVoteEventByIdController,
  voteCandidateController,
};
