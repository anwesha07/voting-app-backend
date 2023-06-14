/* eslint-disable no-underscore-dangle */
const { asyncWrap } = require('../utils');
const {
  registerUserService,
  loginUserService,
  logoutUserService,
} = require('./auth.service');

const registerUserController = asyncWrap(async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { userName, password, email, aadhaar } = req.body;
  const user = await registerUserService(userName, password, email, aadhaar);
  res.status(201).json(user);
});

const loginUserController = asyncWrap(async (req, res) => {
  const { email, password } = req.body;
  const loggedInUser = await loginUserService(email, password);
  res.json(loggedInUser);
});

const logoutUserController = asyncWrap(async (req, res) => {
  const userId = req.user._id;
  const loggedOutUser = await logoutUserService(userId);
  res.status(200).json(loggedOutUser);
});

const verifyLoggedInUserController = (req, res) => {
  res.status(200).json({
    userId: req.user._id,
    userName: req.user.userName,
    email: req.user.email,
    isLoggedIn: true,
  });
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  verifyLoggedInUserController,
};
