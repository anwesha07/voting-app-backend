const Joi = require('joi');
const { BadRequestException } = require('../utils/exceptions');

const validateCreateCandidateDataBody = async (req, _res, next) => {
  const createCandidateSchema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(18).max(60).required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
  });

  try {
    await createCandidateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error.message);
    next(new BadRequestException(error.message));
  }
};

module.exports = {
  validateCreateCandidateDataBody,
};
