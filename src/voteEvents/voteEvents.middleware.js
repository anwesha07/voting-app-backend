const Joi = require('joi');
const { BadRequestException } = require('../utils/exceptions');

const validateVoteEventBody = async (req, _res, next) => {
  const voteEventSchema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    name: Joi.string().alphanum().min(3).max(30).required(),
    startDate: Joi.date().greater('now').required(),
    endDate: Joi.date().greater('now').greater(Joi.ref('startDate')).required(),
    candidates: Joi.array().items(Joi.string()).min(2),
  });

  try {
    await voteEventSchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error.message);
    next(new BadRequestException(error.message));
  }
};
const validateVoteCandidateBody = async (req, _res, next) => {
  const validateVoteCandidateSchema = Joi.object({
    candidate: Joi.string().required(),
  });

  try {
    await validateVoteCandidateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error.message);
    next(new BadRequestException(error.message));
  }
};

module.exports = {
  validateVoteEventBody,
  validateVoteCandidateBody,
};
