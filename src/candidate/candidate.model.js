const mongoose = require('mongoose');

const { Schema } = mongoose;

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 30,
  },
  email: {
    type: String,
    min: 5,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 60,
    required: true,
  },
});

const Candidate = mongoose.model('Candidate', candidateSchema);

const saveCandidate = async (candidateDetails) => {
  const newCandidate = new Candidate(candidateDetails);
  console.log(newCandidate);
  return newCandidate.save();
};

const getCandidateByEmail = async (email) => Candidate.findOne({ email });

const getCandidateByCandidateId = async (candidateId) =>
  Candidate.findById(candidateId);

const getCandidateIdsInArray = async (candidateArray) =>
  Candidate.find({ _id: { $in: candidateArray } }, '_id');

module.exports = {
  saveCandidate,
  getCandidateByEmail,
  getCandidateByCandidateId,
  getCandidateIdsInArray,
};
