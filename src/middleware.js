const jwt = require('jsonwebtoken');
const { validateToken } = require('./auth/auth.utils');
const { UnauthorisedException } = require('./utils/exceptions');

const authenticateUser = async (req, _res, next) => {
  const token = req.headers['x-token'];
  try {
    const { userId } = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(userId);
    const user = await validateToken(token, userId);
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorisedException(error.message));
  }
};

module.exports = {
  authenticateUser,
};
