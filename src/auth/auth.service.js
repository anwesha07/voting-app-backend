/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  UnauthorisedException,
  ConflictException,
} = require('../utils/exceptions');

const {
  saveNewUser,
  getUserByEmail,
  getUserByAadhaar,
  updateToken,
  resetTokenByUserId,
} = require('./auth.model');

const saltRounds = 10;

const registerUserService = async (userName, password, email, aadhaar) => {
  // check whether email is unique or not
  const userByEmail = await getUserByEmail(email);
  console.log(userByEmail);
  if (userByEmail) throw new ConflictException('User already exists!');

  // check whether aadhaar is unique or not
  const userByAadhaar = await getUserByAadhaar(aadhaar);
  console.log(userByAadhaar);

  if (userByAadhaar) throw new ConflictException('User already exists!');

  // hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await saveNewUser({
    userName,
    password: hashedPassword,
    email,
    aadhaar,
  });

  const token = jwt.sign(
    {
      userId: newUser._id,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: '6h',
    },
  );
  const loggedInUser = await updateToken(newUser._id, token);
  return loggedInUser;
};

const loginUserService = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) throw new UnauthorisedException('Incorrect credentials');

  // compare passwords using bcrypt
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    // create token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '24h',
      },
    );

    const loggedInUser = await updateToken(user._id, token);
    return loggedInUser;
  }
  throw new UnauthorisedException('incorrect credentials');
};

const logoutUserService = async (userId) => resetTokenByUserId(userId);

module.exports = {
  registerUserService,
  loginUserService,
  logoutUserService,
};
