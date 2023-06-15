const { getCandidateIdsInArray } = require('../candidate/candidate.model');
const {
  ConflictException,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} = require('../utils/exceptions');
const {
  getActiveVoteEvents,
  getVoteEventByName,
  saveNewVoteEvent,
  getVoteEventById,
  voteCandidate,
} = require('./voteEvents.model');

const getVoteEventsService = async () => {
  const currentDate = new Date().getTime();
  return getActiveVoteEvents(currentDate);
};

const createVoteEventService = async (name, startDate, endDate, candidates) => {
  // check whether a voting event with same name already exists
  const votingEvent = await getVoteEventByName(name);
  if (votingEvent) throw new ConflictException('Voting event already exists!');

  // create a new voting event
  const candidateIds = await getCandidateIdsInArray(candidates);
  if (candidateIds.length !== candidates.length) {
    throw new BadRequestException('Candidate array has invalid candidates');
  }
  const votes = {};
  candidateIds.forEach((candidate) => {
    // eslint-disable-next-line no-underscore-dangle
    votes[candidate._id] = 0;
  });
  return saveNewVoteEvent({
    name,
    startDate,
    endDate,
    candidates: candidateIds,
    votes,
  });
};

const getVoteEventByIdService = async (eventId) => {
  const voteEvent = await getVoteEventById(eventId);
  if (!voteEvent) throw new NotFoundException('Vote event doesnot exist!');
  return voteEvent;
};

const voteCandidateService = async (candidateId, userId, eventId) => {
  // check whether eventId is valid
  const voteEvent = await getVoteEventById(eventId);
  if (!voteEvent) throw new NotFoundException('Vote Event Id is invalid');

  // check whether voting event is active
  const today = new Date().getTime();
  if (voteEvent.startDate > today || voteEvent.endDate < today) {
    throw new ForbiddenException('Voting for this event is not active');
  }

  // check whether user has casted vote
  if (voteEvent.votedBy.includes(userId)) {
    throw new ForbiddenException('Vote has already been cast by the user');
  }

  // check whether candidate id is valid
  const candidateExists = voteEvent.candidates.find(
    (candidate) => candidate.toString() === candidateId,
  );
  if (!candidateExists) {
    throw new BadRequestException('Invalid candidate');
  }

  // add the vote
  await voteCandidate(userId, candidateId, eventId);
};

module.exports = {
  getVoteEventsService,
  createVoteEventService,
  getVoteEventByIdService,
  voteCandidateService,
};
