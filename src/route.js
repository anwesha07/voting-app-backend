// the main router which will route the requests to each module
const router = require('express').Router();
const authRouter = require('./auth/auth.route');

router.get('/', (_req, res) => {
  res.json({ route: 'ok' });
});

router.use('/auth', authRouter);

module.exports = router;
