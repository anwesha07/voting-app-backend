const mongoose = require('mongoose');

const { Schema } = mongoose;

const voteEventSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 30,
    unique: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  candidates: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
      },
    ],
    required: true,
  },
  votedBy: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  votes: {
    type: Map,
    of: Number,
    default: 0,
    max: 1,
  },
});

const VoteEvents = mongoose.model('VoteEvents', voteEventSchema);

const saveNewVoteEvent = async (eventDetails) => {
  const newEvent = new VoteEvents(eventDetails);
  return newEvent.save();
};

const getActiveVoteEvents = async (currentDate) => {
  const currentEvents = VoteEvents.find(
    {
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    },
    '_id name startDate endDate',
  );
  return currentEvents;
};

const getVoteEventByName = async (name) => VoteEvents.findOne({ name });
const getVoteEventById = async (eventId) =>
  VoteEvents.findById(eventId, { votes: 0, __v: 0 });

const voteCandidate = (userId, candidateId, voteEventId) =>
  VoteEvents.findOneAndUpdate(
    { _id: voteEventId },
    { $inc: { [`votes.${candidateId}`]: 1 }, $push: { votedBy: userId } },
    { new: true },
  );

module.exports = {
  saveNewVoteEvent,
  getActiveVoteEvents,
  getVoteEventByName,
  getVoteEventById,
  voteCandidate,
};
