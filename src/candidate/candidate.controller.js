const { asyncWrap } = require('../utils');
const { createNewCandidate, getCandidate } = require('./candidate.service');

const createCandidateController = asyncWrap(async (req, res) => {
  const { user } = req;
  // eslint-disable-next-line object-curly-newline
  const { name, email, age, gender } = req.body;
  const newCandidate = await createNewCandidate(user, name, email, age, gender);
  res.status(201).json(newCandidate);
});

const fetchCandidateController = asyncWrap(async (req, res) => {
  const candidateId = req.params.id;
  const candidate = await getCandidate(candidateId);
  res.status(200).json(candidate);
});

module.exports = {
  createCandidateController,
  fetchCandidateController,
};
