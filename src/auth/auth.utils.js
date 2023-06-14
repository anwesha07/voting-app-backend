const { getUserByUserId } = require('./auth.model');

const validateToken = async (token, userId) => {
  const user = await getUserByUserId(userId);
  if (user.token === token) return user;
  throw new Error('token expired!');
};

module.exports = {
  validateToken,
};
