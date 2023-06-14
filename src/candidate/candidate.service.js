const {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} = require('../utils/exceptions');
const {
  getCandidateByEmail,
  saveCandidate,
  getCandidateByCandidateId,
} = require('./candidate.model');

const createNewCandidate = async (user, name, email, age, gender) => {
  // check whether creator is admin
  if (!user.isAdmin) {
    throw ForbiddenException('Not allowed to register candidates');
  }
  // verify candidate doesnot exist already
  const candidate = await getCandidateByEmail(email);
  console.log(candidate);
  if (candidate) throw new ConflictException('Candidate already exists!');

  // create new candidate entry
  const newCandidate = await saveCandidate({
    user,
    name,
    email,
    age,
    gender,
  });
  return newCandidate;
};

const getCandidate = async (candidateId) => {
  const candidate = await getCandidateByCandidateId(candidateId);
  if (!candidate) {
    console.log(candidate);
    throw new NotFoundException('Candidate credentials doesnot match!');
  }
  return candidate;
};

module.exports = {
  createNewCandidate,
  getCandidate,
};
