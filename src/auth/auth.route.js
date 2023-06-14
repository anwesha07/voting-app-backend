const authRouter = require('express').Router();

authRouter.get('/', (_req, res) => {
  res.json({ authroute: 'ok' });
});

module.exports = authRouter;
