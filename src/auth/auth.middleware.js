/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const { BadRequestException } = require('../utils/exceptions');

const validateRegisterDataBody = async (req, _res, next) => {
  const registerBodySchema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(30).required(),
    aadhaar: Joi.string()
      .length(12)
      .pattern(/^[0-9]+$/),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  });

  try {
    await registerBodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error.message);
    next(new BadRequestException(error.message));
  }
};

const validateLoginDataBody = async (req, _res, next) => {
  const loginBodySchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  try {
    await loginBodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(new BadRequestException(error.message));
  }
};

module.exports = {
  validateRegisterDataBody,
  validateLoginDataBody,
};
