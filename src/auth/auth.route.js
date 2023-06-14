const authRouter = require('express').Router();

const {
  validateRegisterDataBody,
  validateLoginDataBody,
} = require('./auth.middleware');
const {
  registerUserController,
  loginUserController,
  logoutUserController,
  verifyLoggedInUserController,
} = require('./auth.controller');
const { authenticateUser } = require('../middleware');

authRouter.get('/', (_req, res) => {
  res.json({ authroute: 'ok' });
});

authRouter.post('/register', validateRegisterDataBody, registerUserController);
authRouter.post('/login', validateLoginDataBody, loginUserController);
authRouter.post('/logout', authenticateUser, logoutUserController);
authRouter.post('/verify', authenticateUser, verifyLoggedInUserController);

module.exports = authRouter;
